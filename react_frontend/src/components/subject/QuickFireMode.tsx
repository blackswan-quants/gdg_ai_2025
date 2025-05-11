import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import CardContainer from '../common/CardContainer';
import { ArrowLeft, Check, X, Shuffle, Bot, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickFireModeProps {
  onBack: () => void;
}

const QuickFireMode: React.FC<QuickFireModeProps> = ({ onBack }) => {
  const { selectedSubject, flashcardDecks } = useAppContext();
  const [cardCount, setCardCount] = useState(10);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const questions = [
    {
      text: 'Come si chiama il muscolo cardine della riproduzione maschile?',
      answer: 'papa francesco',
      isAI: false,
    },
    {
      text: 'Il cervelletto è responsabile della coordinazione motoria?',
      answer: 'sì',
      isAI: true,
    },
  ];

  const availableNotes =
    selectedSubject?.chapters.flatMap(chapter =>
      chapter.materials.filter(material => material.type === 'textbook')
    ) || [];

  const toggleNote = (noteId: string) => {
    setSelectedNotes(prev =>
      prev.includes(noteId) ? prev.filter(id => id !== noteId) : [...prev, noteId]
    );
  };

  const selectAllNotes = () => {
    setSelectedNotes(availableNotes.map(note => note.id));
  };

  const startQuiz = async () => {
    setIsShuffling(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsShuffling(false);
    setIsQuizStarted(true);
  };

  const checkAnswer = () => {
    const current = questions[currentQuestionIndex];
    const isAnswerCorrect = currentAnswer.toLowerCase().trim() === current.answer.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    if (current.isAI) {
      setShowSaveButton(true);
    }
  };

  const saveToDeck = () => {
    // Here you would typically make an API call to save the question
    // For now, we'll just show a success message
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setShowSaveButton(false);
    }, 2000);
  };

  const goToNextQuestion = () => {
    setCurrentAnswer('');
    setIsCorrect(null);
    setShowSaveButton(false);
    setIsSaved(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizStarted(false);
      setCurrentQuestionIndex(0);
    }
  };

  return (
    <div className="relative min-h-[80vh]">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      />

      <div className="relative z-10">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Battle Modes
        </button>

        <CardContainer className="max-w-2xl mx-auto">
          {!isQuizStarted ? (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Fire Settings</h3>

              <div>
                <label className="block text-gray-300 mb-2">Number of Cards</label>
                <input
                  type="number"
                  value={cardCount}
                  onChange={e => setCardCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  min="1"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-300">Select Notes</label>
                  <button
                    onClick={selectAllNotes}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Select All
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableNotes.map(note => (
                    <label
                      key={note.id}
                      className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedNotes.includes(note.id)}
                        onChange={() => toggleNote(note.id)}
                        className="rounded border-gray-600"
                      />
                      <span className="text-gray-300">{note.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={startQuiz}
                disabled={selectedNotes.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                TEST
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -180 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {isShuffling ? (
                  <div className="flex items-center justify-center py-12">
                    <Shuffle className="w-12 h-12 text-blue-400 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-800 p-6 rounded-lg relative">
                      <h4 className="text-lg text-gray-300 mb-4">Question:</h4>
                      <p className="text-white text-xl">{questions[currentQuestionIndex].text}</p>
                      {questions[currentQuestionIndex].isAI && (
                        <div className="absolute top-4 right-4 bg-purple-600 text-white px-2 py-1 text-xs rounded-lg flex items-center gap-1">
                          <Bot size={14} /> AI
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Your Answer:</label>
                      <input
                        type="text"
                        value={currentAnswer}
                        onChange={e => setCurrentAnswer(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                        placeholder="Type your answer..."
                      />
                    </div>

                    <button
                      onClick={checkAnswer}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Submit Answer
                    </button>

                    {isCorrect !== null && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center justify-center p-4 rounded-lg ${
                            isCorrect
                              ? 'bg-green-600/20 text-green-400'
                              : 'bg-red-600/20 text-red-400'
                          }`}
                        >
                          {isCorrect ? <Check className="mr-2" /> : <X className="mr-2" />}
                          {isCorrect ? 'Correct!' : 'Wrong!'}
                        </motion.div>

                        {showSaveButton && !isSaved && (
                          <button
                            onClick={saveToDeck}
                            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <Save size={16} />
                            Save to Deck
                          </button>
                        )}

                        {isSaved && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center p-4 rounded-lg bg-green-600/20 text-green-400"
                          >
                            <Check className="mr-2" />
                            Saved to deck!
                          </motion.div>
                        )}

                        <button
                          onClick={goToNextQuestion}
                          className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                        >
                          Next Question
                        </button>
                      </>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </CardContainer>
      </div>
    </div>
  );
};

export default QuickFireMode;
