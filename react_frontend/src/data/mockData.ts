import { Subject, User, FlashcardDeck, NavItem } from '../types';
import { BookOpenCheck, Library, Home, FlaskConical, Atom, Cpu, Brain, BookMarked } from 'lucide-react';

export const user: User = {
  id: '1',
  name: 'Alex Johnson',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  level: 7,
  progress: 68
};

export const subjects: Subject[] = [
  {
    id: '1',
    title: 'Neurology',
    description: 'Neurology is the study of the nervous system, including the brain, spinal cord, and nerves.',
    icon: 'FlaskConical',
    progress: 75,
    color: '#8B5CF6',
    chapters: [
      {
        id: 'math-ch1',
        title: 'Neuroanatomy',
        progress: 100,
        materials: [
          { id: 'm1', title: 'Pillars of Neuroanatomy , R.Baudone', type: 'textbook', progress: 100, dateCreated: '2025-05-10' },
          { id: 'm2', title: 'Neuroanatomy Slides', type: 'slide', progress: 100, dateCreated: '2025-05-12' }
        ],
        prerequisites: []
      },
      {
        id: 'math-ch2',
        title: 'Neurophysiology',
        progress: 85,
        materials: [
          { id: 'm3', title: 'Neuroanatomy Student Notes', type: 'textbook', progress: 100, dateCreated: '2025-05-15' },
          { id: 'm4', title: 'Deck 1', type: 'flashcard', progress: 70, dateCreated: '2025-05-17' }
        ],
        prerequisites: ['math-ch1']
      },
      {
        id: 'math-ch3',
        title: 'Neuropharmacology',
        progress: 40,
        materials: [
          { id: 'm5', title: 'Neuropharmacology', type: 'summary', progress: 40, dateCreated: '2025-05-20' }
        ],
        prerequisites: ['math-ch2']
      }
    ]
  },
  {
    id: '2',
    title: 'Physics',
    description: 'Quantum mechanics and relativity',
    icon: 'Atom',
    progress: 45,
    color: '#14B8A6',
    chapters: [
      {
        id: 'phys-ch1',
        title: 'Classical Mechanics',
        progress: 90,
        materials: [
          { id: 'p1', title: 'Newton\'s Laws', type: 'textbook', progress: 100, dateCreated: '2025-05-05' },
          { id: 'p2', title: 'Conservation Laws', type: 'slide', progress: 80, dateCreated: '2025-05-07' }
        ],
        prerequisites: []
      },
      {
        id: 'phys-ch2',
        title: 'Electromagnetism',
        progress: 60,
        materials: [
          { id: 'p3', title: 'Maxwell\'s Equations', type: 'textbook', progress: 60, dateCreated: '2025-05-14' }
        ],
        prerequisites: ['phys-ch1']
      },
      {
        id: 'phys-ch3',
        title: 'Quantum Physics',
        progress: 10,
        materials: [
          { id: 'p4', title: 'Wave-Particle Duality', type: 'flashcard', progress: 10, dateCreated: '2025-05-22' }
        ],
        prerequisites: ['phys-ch2']
      }
    ]
  },
  {
    id: '3',
    title: 'Computer Science',
    description: 'Algorithms and data structures',
    icon: 'Cpu',
    progress: 62,
    color: '#EC4899',
    chapters: [
      {
        id: 'cs-ch1',
        title: 'Data Structures',
        progress: 95,
        materials: [
          { id: 'c1', title: 'Arrays and Linked Lists', type: 'textbook', progress: 100, dateCreated: '2025-05-03' },
          { id: 'c2', title: 'Trees and Graphs', type: 'slide', progress: 90, dateCreated: '2025-05-06' }
        ],
        prerequisites: []
      },
      {
        id: 'cs-ch2',
        title: 'Algorithms',
        progress: 70,
        materials: [
          { id: 'c3', title: 'Sorting Algorithms', type: 'textbook', progress: 80, dateCreated: '2025-05-11' },
          { id: 'c4', title: 'Search Algorithms', type: 'flashcard', progress: 60, dateCreated: '2025-05-16' }
        ],
        prerequisites: ['cs-ch1']
      },
      {
        id: 'cs-ch3',
        title: 'System Design',
        progress: 20,
        materials: [
          { id: 'c5', title: 'Scalability Principles', type: 'summary', progress: 20, dateCreated: '2025-05-25' }
        ],
        prerequisites: ['cs-ch2']
      }
    ]
  },
  {
    id: '4',
    title: 'Biology',
    description: 'Molecular biology and genetics',
    icon: 'Brain',
    progress: 30,
    color: '#10B981',
    chapters: [
      {
        id: 'bio-ch1',
        title: 'Cell Biology',
        progress: 80,
        materials: [
          { id: 'b1', title: 'Cell Structure', type: 'textbook', progress: 90, dateCreated: '2025-05-04' },
          { id: 'b2', title: 'Cell Functions', type: 'slide', progress: 70, dateCreated: '2025-05-09' }
        ],
        prerequisites: []
      },
      {
        id: 'bio-ch2',
        title: 'Genetics',
        progress: 40,
        materials: [
          { id: 'b3', title: 'DNA Replication', type: 'textbook', progress: 40, dateCreated: '2025-05-18' }
        ],
        prerequisites: ['bio-ch1']
      },
      {
        id: 'bio-ch3',
        title: 'Evolution',
        progress: 0,
        materials: [
          { id: 'b4', title: 'Natural Selection', type: 'flashcard', progress: 0, dateCreated: '2025-05-27' }
        ],
        prerequisites: ['bio-ch2']
      }
    ]
  }
];

export const flashcardDecks: FlashcardDeck[] = [
  {
    id: 'fd1',
    title: 'Deck 1',
    subjectId: '1',
    cards: {
      total: 50,
      toStart: 10,
      inReview: 25,
      onHold: 5,
      completed: 10
    }
  },
  {
    id: 'fd1.2',
    title: 'Deck 2',
    subjectId: '1',
    cards: {
      total: 50,
      toStart: 10,
      inReview: 25,
      onHold: 5,
      completed: 10
    }
  },
  {
    id: 'fd2',
    title: 'Quantum Physics Concepts',
    subjectId: '2',
    cards: {
      total: 40,
      toStart: 20,
      inReview: 15,
      onHold: 3,
      completed: 2
    }
  },
  {
    id: 'fd3',
    title: 'Algorithms & Data Structures',
    subjectId: '3',
    cards: {
      total: 60,
      toStart: 5,
      inReview: 30,
      onHold: 10,
      completed: 15
    }
  }
];

export const navItems: NavItem[] = [
  {
    id: 'nav1',
    title: 'Dashboard',
    icon: 'Home',
    path: '/'
  },
  {
    id: 'nav2',
    title: 'Library',
    icon: 'Library',
    path: '/library'
  },
  {
    id: 'nav3',
    title: 'Flashcards',
    icon: 'BookMarked',
    path: '/flashcards'
  },
  {
    id: 'nav4',
    title: 'Progress',
    icon: 'BookOpenCheck',
    path: '/progress'
  }
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Home':
      return Home;
    case 'Library':
      return Library;
    case 'BookMarked':
      return BookMarked;
    case 'BookOpenCheck':
      return BookOpenCheck;
    case 'FlaskConical':
      return FlaskConical;
    case 'Atom':
      return Atom;
    case 'Cpu':
      return Cpu;
    case 'Brain':
      return Brain;
    default:
      return BookMarked;
  }
};