import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, CheckCircle } from 'lucide-react';
import IconButton from '../common/IconButton';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const sampleQuestion = {
  text: 'The CNS is where the information is sorted.',
  correctAnswer: true,
};

const MaterialViewer: React.FC = () => {
  const { selectedMaterial, setSelectedMaterial } = useAppContext();
  const [showQuestion, setShowQuestion] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTestButton, setShowTestButton] = useState(false);
  const [showAnswerButtons, setShowAnswerButtons] = useState(true);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (selectedMaterial) {
      setShowQuestion(false);
      setUserAnswer(null);
      setIsCorrect(null);
      setShowTestButton(false);
      setShowAnswerButtons(true);

      // Show test button after 5 seconds
      const timer = setTimeout(() => {
        setShowTestButton(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [selectedMaterial]);

  if (!selectedMaterial || selectedMaterial.type !== 'textbook') return null;

  const handleClose = () => {
    setSelectedMaterial(null);
  };

  const handleAnswer = (answer: boolean) => {
    const correct = answer === sampleQuestion.correctAnswer;
    setIsCorrect(correct);
    setUserAnswer(answer);
    setShowFeedback(true);
    setShowAnswerButtons(false);

    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer(null);
      setIsCorrect(null);
      setShowQuestion(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900">
      {/* Close button */}
      <div className="absolute top-4 right-4 z-50">
        <IconButton
          icon={X}
          onClick={handleClose}
          label="Close viewer"
          className="bg-gray-800 hover:bg-red-600 text-white p-3 rounded-lg shadow-lg transition-colors duration-200"
        />
      </div>

      {/* PDF Viewer */}
      <div className="h-full w-full">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div style={{ height: '100%' }}>
            <Viewer fileUrl="/bookneuro.pdf" plugins={[defaultLayoutPluginInstance]} />
          </div>
        </Worker>
      </div>

      {/* Test it button */}
      {showTestButton && (
        <div className="absolute bottom-8 right-8 z-50 animate-fade-in">
          <button
            onClick={() => setShowQuestion(true)}
            className="px-8 py-4 bg-purple-600 text-white text-lg font-medium rounded-lg hover:bg-purple-700 transition shadow-lg"
          >
            Test it!
          </button>
        </div>
      )}

      {/* Question Modal */}
      {showQuestion && (
        <div className="fixed top-20 right-8 bg-gray-800 rounded-lg shadow-lg p-6 w-96 z-50">
          <h4 className="text-white font-medium mb-2">Test it !</h4>
          <p className="text-gray-300 mb-4">{sampleQuestion.text}</p>
          {showAnswerButtons && (
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                True
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                False
              </button>
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className="fixed top-20 right-8 z-50 flex flex-col items-end space-y-2">
          <div
            className={`px-4 py-2 rounded-lg text-white shadow ${
              isCorrect ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </div>
          <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Memory updated</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialViewer;
