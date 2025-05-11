import streamlit as st
import re
#import openai
from bertopic import BERTopic
from sentence_transformers import SentenceTransformer
import networkx as nx
import matplotlib.pyplot as plt
from collections import defaultdict

documents = {
    "skeletal system":{
        "description": "The human skeletal system consists of bones, cartilage, ligaments, and tendons. The skeleton provides support, protection, and movement for the body. The bones in the body are classified into two categories: axial skeleton and appendicular skeleton. The axial skeleton consists of the skull, spine, ribs, and sternum, while the appendicular skeleton includes the limbs and pelvic girdle.",
        "related_topics": ["muscles", "circulatory system", "bones", "cartilage", "ligaments", "tendons"]
    },
    "muscles system":{
        "description": "Muscles play a vital role in the movement of the human body. They are classified into three types: skeletal, smooth, and cardiac muscles. Skeletal muscles are responsible for voluntary movement, while smooth muscles control involuntary movements like digestion and blood vessel constriction. Cardiac muscle is found in the heart and is responsible for pumping blood throughout the body.",
        "related_topics": ["muscles",  "nerves",]
    },
    "circulatory system":{
        "description": "The circulatory system is responsible for transporting blood, nutrients, gases, and waste products throughout the body. The heart is the central organ of this system, pumping blood through a network of arteries, veins, and capillaries. The system is divided into the systemic circulation, which delivers blood to the body, and pulmonary circulation, which carries blood to the lungs for oxygenation.",
        "related_topics": ["blood", "veins", "circulatory system", "heart", "oxygen"]
    },
    "respiratory system":{
        "description": "The respiratory system enables the exchange of gases, such as oxygen and carbon dioxide, between the body and the environment. It consists of the nose, trachea, lungs, and diaphragm. Air enters the body through the nose or mouth and passes through the trachea into the lungs, where oxygen is absorbed and carbon dioxide is expelled during exhalation.",
        "related_topics": ["oxygen", "lungs"]
    },
    "nervous system":{
        "description": "The nervous system is a complex network of neurons and supporting cells that coordinates the body's activities. It includes the central nervous system (CNS), which consists of the brain and spinal cord, and the peripheral nervous system (PNS), which connects the CNS to the limbs and organs. The brain processes information and sends signals to muscles and glands for responses, while the spinal cord relays signals to and from the brain.",
        "related_topics": ["brain", "spinal cord", "nerves"]
    },
    "digestive system":{
        "description": "The digestive system is responsible for breaking down food into nutrients that can be absorbed by the body. The process begins in the mouth with the mechanical breakdown of food and the chemical digestion by enzymes. The food moves through the esophagus into the stomach, where gastric juices further break it down. Nutrients are absorbed in the small intestine, while waste is excreted through the large intestine and rectum.",
        "related_topics": ["senses", "intestines", "stomach", "pancreas", "liver", "gallbladder", "pancreas", "intestines", "stomach", "pancreas", "liver", "gallbladder"]
    },
    "endocrine system":{
        "description": "The endocrine system regulates bodily functions through the secretion of hormones. It includes glands such as the pituitary, thyroid, and adrenal glands. Hormones control processes such as metabolism, growth, and reproduction. For example, insulin, produced by the pancreas, helps regulate blood sugar levels, while adrenaline from the adrenal glands prepares the body for 'fight or flight' responses.",
        "related_topics": ["hormones", "pituitary gland", "adrenal gland", "thyroid gland", "pancreas", "insulin", "adrenaline"]
    },
    "immune system":{
        "description": "The immune system defends the body against pathogens such as bacteria, viruses, and fungi. The system includes physical barriers like the skin, as well as white blood cells, antibodies, and organs such as the spleen and thymus. The immune system also includes specialized cells like T-cells and B-cells, which are involved in recognizing and destroying infected cells.",
        "related_topics": ["muscles", "skeletal system", "circulatory system", "nervous system", "digestive system", "endocrine system", "integumentary system", "reproductive system", "senses", "bones", "cartilage", "ligaments", "tendons"]
    },
    "integumentary system":{
        "description": "The integumentary system includes the skin, hair, nails, and glands. The skin serves as a protective barrier against environmental factors, such as bacteria, UV radiation, and temperature changes. It also helps in regulating body temperature through sweat glands. The hair and nails offer additional protection, while sebaceous glands produce oils to keep the skin and hair lubricated.",
        "related_topics": ["muscles", "skeletal system", "circulatory system", "nervous system", "digestive system", "endocrine system", "immune system", "reproductive system", "senses", "bones", "cartilage", "ligaments", "tendons"]
    },
    "reproductive system":{
        "description": "The human reproductive system is involved in producing offspring. In females, it includes the ovaries, fallopian tubes, uterus, and vagina. The ovaries produce eggs, which travel through the fallopian tubes to the uterus, where fertilization can occur. In males, the system includes the testes, vas deferens, prostate, and penis. The testes produce sperm, which is delivered through the vas deferens for fertilization.",
        "related_topics": ["muscles", "skeletal system", "circulatory system", "nervous system", "digestive system", "endocrine system", "immune system", "integumentary system", "senses", "bones", "cartilage", "ligaments", "tendons"]
    }
}
# Function to read and split Markdown by H1 headers
def read_markdown_and_split_by_chapters(md_file):
    content = md_file.read().decode("utf-8")
    
    # Regular expression to match H1 headers and split the content into chapters
    chapters = re.split(r'(?=# )', content)  # Split at each '# '
    chapters = [chapter.strip() for chapter in chapters if chapter.strip()]
    
    return chapters

# Streamlit app layout
def main():
    st.title("Markdown Topic Modeling, Prerequisites, and Knowledge Graph")
    
    st.subheader("Upload Markdown Files")
    md_files = st.file_uploader("Upload Markdown Files", type="md", accept_multiple_files=True)
    
    if md_files:
        all_chapters = []
        
        # Process each uploaded Markdown file
        for md_file in md_files:
            chapters = read_markdown_and_split_by_chapters(md_file)
            all_chapters.extend(chapters)  # Add chapters from this file to the total list
        
        st.write(f"Total number of chapters extracted: {len(all_chapters)}")
        
        # Create a knowledge graph
        G = nx.Graph()

        # connect documents that share a common topic
        for topic1 in documents:
            for topic2 in documents:
                if topic1 != topic2 and any(topic in documents[topic2]["related_topics"] for topic in documents[topic1]["related_topics"]):
                    G.add_edge(topic1, topic2)
        

        # print the graph
        print(G.nodes())
        print(G.edges())
        # plot the graph
        fig = nx.draw(G, with_labels=True)
        
        
        st.pyplot(fig)

if __name__ == "__main__":
    main()
