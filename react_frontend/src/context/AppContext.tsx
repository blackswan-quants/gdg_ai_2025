import React, { createContext, useContext, useState } from 'react';
import { Subject, User, FlashcardDeck, Material } from '../types';
import { user, subjects, flashcardDecks } from '../data/mockData';

interface AppContextType {
  currentUser: User;
  subjects: Subject[];
  flashcardDecks: FlashcardDeck[];
  selectedSubject: Subject | null;
  activeTab: string;
  showGraphView: boolean;
  selectedMaterial: Material | null /* added */;
  setSelectedSubject: (subject: Subject | null) => void;
  setActiveTab: (tab: string) => void;
  setShowGraphView: (show: boolean) => void;
  setSelectedMaterial: (material: Material | null) => void /* added */;
}

const defaultContextValue: AppContextType = {
  currentUser: user,
  subjects: subjects,
  flashcardDecks: flashcardDecks,
  selectedSubject: null,
  activeTab: 'material',
  showGraphView: false,
  selectedMaterial: null /* added */,
  setSelectedSubject: () => {},
  setActiveTab: () => {},
  setShowGraphView: () => {},
  setSelectedMaterial: () => {} /* added */,
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTab, setActiveTab] = useState('material');
  const [showGraphView, setShowGraphView] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null); /* added */

  const value = {
    currentUser: user,
    subjects,
    flashcardDecks,
    selectedSubject,
    activeTab,
    showGraphView,
    setSelectedSubject,
    setActiveTab,
    setShowGraphView,
    selectedMaterial /* added */,
    setSelectedMaterial /* added */,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
