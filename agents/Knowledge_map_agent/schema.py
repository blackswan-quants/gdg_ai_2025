# knowledge_map_agent/schema.py
from pydantic import BaseModel, Field
from typing import List, Optional

class Topic(BaseModel):
    name: str = Field(..., description="The canonical name of the topic.")
    present_in: List[str] = Field(default_factory=list, description="List of chapter titles where the topic is mentioned.")
    explained_in: Optional[List[str]] = Field(default_factory=list, description="List of chapter titles where the topic is explained. Can be empty if only mentioned.")
