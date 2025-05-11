import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, CheckCircle } from 'lucide-react';
import IconButton from '../common/IconButton';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const questions = [
  {
    text: `Think of the brain as being made up of five big areas. The biggest one is the telencephalon — that's where your thinking and decisions happen, and it includes the two halves of your brain. Then you've got the diencephalon, which is kind of like the brain's control center with parts like the thalamus and hypothalamus. The midbrain, or mesencephalon, is involved in reflexes like reacting to sounds or lights. Below that is the metencephalon, which includes the pons and the cerebellum — the cerebellum helps with movement and balance. Finally, the myelencephalon (also called the medulla oblongata) takes care of automatic stuff like breathing and heartbeat. Together, the midbrain, pons, and medulla are often just called the brainstem. Inside the brain and spinal cord is a fluid-filled space — it's like plumbing for your nervous system. Also, 12 pairs of cranial nerves come out of your brain to help control things like facial movements, hearing, and digestion.\n\n\nThe diencephalon includes the thalamus, hypothalamus, and subthalamus.`,
    correctAnswer: true,
  },
  {
    text: `The brain is anatomically subdivided into five principal regions. The largest is the telencephalon, composed of the cerebral hemispheres. Additional divisions include the diencephalon (comprising the epithalamus, thalamus, hypothalamus, and subthalamus), the mesencephalon (midbrain), which includes the cerebral peduncles (tegmentum and crus cerebri) and tectum (superior and inferior colliculi), the metencephalon (pons and cerebellum), and the myelencephalon (medulla oblongata). The mesencephalon, pons, and medulla oblongata collectively constitute the brainstem. The central nervous system's cavity forms the central canal in the spinal cord and expands into a ventricular system in the brain, filled with cerebrospinal fluid. Twelve pairs of cranial nerves arise from the brain to provide motor, sensory, and parasympathetic innervation to the head, neck, and visceral organs.\n\n\nThe diencephalon includes the thalamus, hypothalamus, and subthalamus.`,
    correctAnswer: true,
  },
];

const MaterialViewer: React.FC = () => {
  const { selectedMaterial, setSelectedMaterial, showGraph } = useAppContext();
  const [showQuestion, setShowQuestion] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTestButton, setShowTestButton] = useState(false);
  const [showAnswerButtons, setShowAnswerButtons] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (selectedMaterial) {
      setShowQuestion(false);
      setUserAnswer(null);
      setIsCorrect(null);
      setShowTestButton(false);
      setShowAnswerButtons(true);
      setCurrentQuestionIndex(0);
      setQuestionsCompleted(false);

      // Show test button after 5 seconds
      const timer = setTimeout(() => {
        setShowTestButton(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [selectedMaterial]);

  if (!selectedMaterial || selectedMaterial.type !== 'textbook' || !showGraph) return null;

  const handleClose = () => {
    setSelectedMaterial(null);
  };

  const handleAnswer = (answer: boolean) => {
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setUserAnswer(answer);
    setShowFeedback(true);
    setShowAnswerButtons(false);

    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer(null);
      setIsCorrect(null);
      setShowQuestion(false);
      setShowTestButton(true);
    }, 2000);
  };

  const handleReThink = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
      setQuestionsCompleted(true);
    }
    setShowQuestion(true);
    setShowAnswerButtons(true);
    setShowTestButton(false);
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
            onClick={handleReThink}
            className="px-8 py-4 bg-purple-600 text-white text-lg font-medium rounded-lg hover:bg-purple-700 transition shadow-lg"
          >
            {questionsCompleted ? 'ReThink' : 'ReThink'}
          </button>
        </div>
      )}

      {/* Question Modal */}
      {showQuestion && (
        <div className="fixed top-4 right-4 bottom-4 bg-gray-800 rounded-lg shadow-lg p-6 w-96 z-50 flex flex-col">
          <h4 className="text-white font-medium mb-4">ReThink</h4>
          <div className="flex-1 overflow-y-auto mb-4">
            <p className="text-gray-300 whitespace-pre-line">
              {questions[currentQuestionIndex].text}
            </p>
          </div>
          {showAnswerButtons && (
            <div className="flex space-x-4 mt-auto">
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
