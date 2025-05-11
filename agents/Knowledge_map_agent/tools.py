# knowledge_map_agent/tools.py
import json
import difflib
from typing import List, Optional
from datetime import datetime
from knowledge_map_agent.schema import Topic
from openai import ChatCompletion  # or use google.adk.llm if preferred

# Tool 1: Extract topics using LLM

def extract_topics_from_chapters(df) -> List[Topic]:
    topic_map = {}
    
    for _, row in df.iterrows():
        chapter = row["Chapter"]
        text = row["Text"][:4000]  # truncate if needed

        prompt = f"""
        Extract the 5 most important topics from the following chapter. 
        For each topic, specify whether it is explained (clearly discussed) or only mentioned.
        Format: {{"topic": ..., "explained": true/false}}
        Chapter:
        """
        {text}
        """
        """

        response = ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=800
        )

        topic_data = json.loads(response.choices[0].message.content.strip())

        for item in topic_data:
            name = item["topic"].strip()
            explained = item["explained"]

            # canonicalize topic name via fuzzy matching
            canonical = _get_canonical_topic(name, list(topic_map.keys()))

            if canonical not in topic_map:
                topic_map[canonical] = Topic(name=canonical)

            topic_map[canonical].present_in.append(chapter)
            if explained:
                topic_map[canonical].explained_in.append(chapter)

    return list(topic_map.values())


def _get_canonical_topic(name: str, known: List[str], threshold: float = 0.85) -> str:
    for k in known:
        if difflib.SequenceMatcher(None, name.lower(), k.lower()).ratio() > threshold:
            return k
    return name

# Tool 2: Build graph and save as JSON

def build_knowledge_graph_and_save_json(topics: List[Topic], output_path: Optional[str] = None) -> dict:
    chapter_graph = {}
    all_chapters = set(ch for topic in topics for ch in topic.present_in)

    for ch in all_chapters:
        chapter_graph[ch] = {"shared_with": {}}

    # Fill connections by shared topic
    for topic in topics:
        involved = topic.present_in
        for i, ch1 in enumerate(involved):
            for ch2 in involved[i+1:]:
                chapter_graph[ch1]["shared_with"].setdefault(ch2, []).append(topic.name)
                chapter_graph[ch2]["shared_with"].setdefault(ch1, []).append(topic.name)

    # Find unexplained topics
    unexplained = [t.name for t in topics if not t.explained_in]

    result = {
        "connections": chapter_graph,
        "unexplained_topics": sorted(unexplained)
    }

    if output_path is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = f"knowledge_graph_{timestamp}.json"

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    return {
        "message": "Knowledge graph saved.",
        "file_path": output_path,
        "topics_total": len(topics),
        "unexplained_count": len(unexplained)
    }
