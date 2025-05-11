export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  progress: number;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  color: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  progress: number;
  materials: Material[];
  prerequisites: string[];
}

export interface Material {
  id: string;
  title: string;
  type: 'textbook' | 'slide' | 'summary' | 'flashcard';
  progress: number;
  dateCreated: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subjectId: string;
  cards: {
    total: number;
    toStart: number;
    inReview: number;
    onHold: number;
    completed: number;
  };
}

export interface NavItem {
  id: string;
  title: string;
  icon: string;
  path: string;
}