import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import CardContainer from "../common/CardContainer";
import { Trophy, Swords, Copy, ArrowLeft, Clock } from "lucide-react";
import card1 from "../../images/card1.png";
import card2 from "../../images/card2.png";
import card3 from "../../images/card3.png";
import card4 from "../../images/card4.png";
import card5 from "../../images/card5.png";

interface LeaderboardEntry {
  name: string;
  score: number;
  avatar: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    name: "Pietro Bottan",
    score: Math.floor(Math.random() * 81) + 20,
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Gloria Desideri",
    score: Math.floor(Math.random() * 81) + 20,
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Giulia Tala",
    score: Math.floor(Math.random() * 81) + 20,
    avatar:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
].sort((a, b) => b.score - a.score);

interface TournamentModeProps {
  onBack: () => void;
}

const TournamentMode: React.FC<TournamentModeProps> = ({ onBack }) => {
  const [isDuelMode, setIsDuelMode] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const [gamePhase, setGamePhase] = useState("setup");
  const [selectedDeck, setSelectedDeck] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [friendAnswer, setFriendAnswer] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [friendScore, setFriendScore] = useState(0);
  const [scores, setScores] = useState({ user: 0, friend: 0 });
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [confirmedCard, setConfirmedCard] = useState<number | null>(null);

  const { selectedSubject, flashcardDecks } = useAppContext();

  const duelLink = "https://example.com/duel/abc123";

  const copyLink = () => navigator.clipboard.writeText(duelLink);

  const startDuel = () => setGamePhase("selectQuestion");

  const handleQuestionSelect = () => {
    setGamePhase("waitingFriend");
    setTimeout(() => {
      setFriendAnswer("popipopi");
      setGamePhase("evaluateFriend");
    }, 3000);
  };

  const evaluateFriendAnswer = (isCorrect: boolean) => {
    const newFriendScore = isCorrect ? friendScore + 1 : friendScore;
    setFriendScore(newFriendScore);
    setScores((prev) => ({ ...prev, friend: newFriendScore }));
    setGamePhase("answerQuestion");
  };

  const submitAnswer = () => {
    setGamePhase("evaluating");
    setTimeout(() => {
      const newUserScore = userScore + 1;
      setUserScore(newUserScore);
      setScores((prev) => ({ ...prev, user: newUserScore }));
      setGamePhase("results");
    }, 2000);
  };

  const ScoreDisplay = () => (
    <div className="fixed top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex space-x-8">
        <div>
          <p className="text-gray-400">Your Score</p>
          <p className="text-2xl font-bold text-white">{scores.user}</p>
        </div>
        <div>
          <p className="text-gray-400">Friend's Score</p>
          <p className="text-2xl font-bold text-white">{scores.friend}</p>
        </div>
      </div>
    </div>
  );

  const cardData = [
    {
      image: card1,
      question:
        "What does a positive Babinski sign indicate in an adult patient?",
      answer: "4",
    },
    {
      image: card2,
      question:
        "What are the key differences between the corticospinal and extrapyramidal tracts?",
      answer: "Paris",
    },
    {
      image: card3,
      question:
        " What does an absent pupillary light reflex suggest about cranial nerve function?",
      answer: "Star",
    },
    {
      image: card4,
      question:
        "How do Broca's aphasia and Wernicke's aphasia differ in terms of speech and comprehension?",
      answer: "4",
    },
    {
      image: card5,
      question:
        "Name the 12 cranial nerves in order and state whether each is sensory, motor, or both.",
      answer: "Water",
    },
  ];

  const renderContent = () => {
    switch (gamePhase) {
      case "setup":
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
              <span className="text-gray-300 text-sm">{duelLink}</span>
              <button
                onClick={copyLink}
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                <Copy size={16} className="mr-1" />
                Copy
              </button>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-300">Select Flashcard Decks</label>
                <button
                  onClick={() => setSelectedDeck(["1", "2", "3"])}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Select All
                </button>
              </div>
              <div className="space-y-2">
                {["Deck 1", "Deck 2", "Deck 3"].map((deck, index) => {
                  const id = String(index + 1);
                  return (
                    <label
                      key={id}
                      className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDeck.includes(id)}
                        onChange={() =>
                          setSelectedDeck((prev) =>
                            prev.includes(id)
                              ? prev.filter((d) => d !== id)
                              : [...prev, id]
                          )
                        }
                        className="rounded border-gray-600"
                      />
                      <span className="text-gray-300">{deck}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <button
              onClick={startDuel}
              disabled={selectedDeck.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ready
            </button>
          </div>
        );

      case "selectQuestion":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white mb-4">
              Select a Question Card
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {cardData.map((card, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-lg transform transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl overflow-hidden"
                  onClick={() => setActiveCardIndex(i)}
                >
                  <img
                    src={card.image}
                    alt={`Card ${i + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Overlay Modal for Card */}
            {activeCardIndex !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg max-w-sm text-center space-y-4 relative">
                  <button
                    onClick={() => setActiveCardIndex(null)}
                    className="absolute top-2 right-3 text-white text-lg font-bold hover:text-red-400"
                  >
                    ×
                  </button>
                  <p className="text-white text-xl font-semibold">
                    {cardData[activeCardIndex].question}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setConfirmedCard(activeCardIndex);
                        setActiveCardIndex(null);
                        handleQuestionSelect();
                      }}
                      className="bg-purple-300 hover:bg-purple-400 text-black px-4 py-2 rounded font-medium"
                    >
                      Select
                    </button>
                    <button
                      onClick={() => setActiveCardIndex(null)}
                      className="bg-blue-300 hover:bg-blue-400 text-black px-4 py-2 rounded font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "waitingFriend":
        return (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Clock className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-medium text-white">
                Waiting for your friend's answer...
              </h3>
            </div>
          </div>
        );

      case "evaluateFriend":
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-lg text-gray-300 mb-4">Friend's Answer:</h4>
              <p className="text-white text-xl">{friendAnswer}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => evaluateFriendAnswer(true)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
              >
                Correct
              </button>
              <button
                onClick={() => evaluateFriendAnswer(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium"
              >
                Wrong
              </button>
            </div>
          </div>
        );

      case "answerQuestion":
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-lg text-gray-300 mb-4">Question:</h4>
              <p className="text-white text-xl">
                Come si chiama il muscolo cardine della riproduzione maschile?
              </p>
            </div>
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              placeholder="Type your answer..."
            />
            <button
              onClick={submitAnswer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              Submit Answer
            </button>
          </div>
        );

      case "evaluating":
        return (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Clock className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-medium text-white">Evaluating...</h3>
            </div>
          </div>
        );

      case "results":
        return (
          <div className="text-center space-y-6">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">
              Congrats! You won!
            </h3>
            <div className="flex justify-center space-x-8">
              <div>
                <p className="text-gray-400">Your Score</p>
                <p className="text-2xl font-bold text-white">{scores.user}</p>
              </div>
              <div>
                <p className="text-gray-400">Friend's Score</p>
                <p className="text-2xl font-bold text-white">{scores.friend}</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Back to Leaderboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {isDuelMode ? (
        <>
          <button
            onClick={() => setIsDuelMode(false)}
            className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Leaderboard
          </button>
          <CardContainer className="max-w-2xl mx-auto">
            {renderContent()}
          </CardContainer>
          {gamePhase !== "setup" && gamePhase !== "results" && <ScoreDisplay />}
        </>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-medium text-white flex items-center">
              <Trophy className="mr-2" />
              Tournament Leaderboard
            </h3>
          </div>
          <div className="grid gap-6">
            {mockLeaderboard.map((entry, index) => (
              <CardContainer key={entry.name} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 relative">
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Trophy size={14} className="text-white" />
                      </div>
                    )}
                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white font-medium">{entry.name}</h4>
                    <p className="text-gray-400 text-sm">
                      Score: {entry.score}
                    </p>
                  </div>
                </div>
              </CardContainer>
            ))}
            <button
              onClick={() => setIsDuelMode(true)}
              className="mt-4 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              <Swords size={20} />
              <span>Duel</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TournamentMode;
