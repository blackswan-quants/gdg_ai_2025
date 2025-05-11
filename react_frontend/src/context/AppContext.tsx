import React, { createContext, useContext, useState } from 'react';
import { Subject, User, FlashcardDeck, Material } from '../types';
import { user, subjects, flashcardDecks } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  subjects: Subject[];
  flashcardDecks: FlashcardDeck[];
  selectedSubject: Subject | null;
  activeTab: string;
  showGraph: boolean;
  selectedMaterial: Material | null;
  setSelectedSubject: (subject: Subject | null) => void;
  setActiveTab: (tab: string) => void;
  setShowGraph: (show: boolean) => void;
  setSelectedMaterial: (material: Material | null) => void;
}

const defaultContextValue: AppContextType = {
  currentUser: user,
  subjects: subjects,
  flashcardDecks: flashcardDecks,
  selectedSubject: null,
  activeTab: 'material',
  showGraph: false,
  selectedMaterial: null,
  setSelectedSubject: () => {},
  setActiveTab: () => {},
  setShowGraph: () => {},
  setSelectedMaterial: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [activeTab, setActiveTab] = useState('material');
  const [showGraph, setShowGraph] = useState(false);

  const value = {
    currentUser: user,
    subjects,
    flashcardDecks,
    selectedSubject,
    activeTab,
    showGraph,
    setSelectedSubject,
    setActiveTab,
    setShowGraph,
    selectedMaterial,
    setSelectedMaterial,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
