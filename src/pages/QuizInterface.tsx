import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Quiz, QuizQuestion, QuizResult } from "@/data/quizData";
import { getQuizById } from "@/data/quizData";
import { useAuth } from "@/contexts/AuthContext";

const QuizInterface = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (quizId) {
      const foundQuiz = getQuizById(quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        setTimeRemaining(foundQuiz.timeLimit);
      } else {
        navigate("/kuis");
      }
    }
  }, [quizId, navigate]);

  useEffect(() => {
    if (isQuizStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isQuizStarted, timeRemaining]);

  const startQuiz = () => {
    setIsQuizStarted(true);
    setStartTime(new Date());
    setQuestionStartTime(new Date());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(new Date());
    } else {
      setShowConfirmation(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionStartTime(new Date());
    }
  };

  const handleFinishQuiz = () => {
    if (!quiz || !user || !startTime) return;

    const endTime = new Date();
    const timeTaken = Math.floor(
      (endTime.getTime() - startTime.getTime()) / 1000,
    );

    let score = 0;
    let correctAnswers = 0;
    const answers = quiz.questions.map((question) => {
      const selectedAnswer = selectedAnswers[question.id];
      const isCorrect =
        selectedAnswer !== undefined &&
        selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        score += question.points;
        correctAnswers++;
      }

      return {
        questionId: question.id,
        selectedAnswer: selectedAnswer ?? -1,
        isCorrect,
        timeSpent: 30, // Simplified for demo
      };
    });

    const result: QuizResult = {
      id: `result-${Date.now()}`,
      userId: user.id,
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      timeTaken,
      completedAt: endTime,
      answers,
    };

    // Store result in localStorage (in real app, this would be an API call)
    const existingResults = JSON.parse(
      localStorage.getItem("quizResults") || "[]",
    );
    existingResults.push(result);
    localStorage.setItem("quizResults", JSON.stringify(existingResults));

    // Navigate to results page
    navigate(`/quiz-results/${result.id}`, {
      state: { result, quiz },
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="font-quicksand text-lg text-gray-800 dark:text-gray-200">
            Memuat quiz...
          </p>
        </div>
      </div>
    );
  }

  if (!isQuizStarted) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 border-2 border-[#ced4da] dark:border-gray-700 rounded-lg">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
        />

        <Navbar />

        <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream dark:from-gray-800 dark:to-gray-700 py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h1 className="font-georgia text-3xl text-historic-brown-dark dark:text-historic-yellow mb-4">
                {quiz.title}
              </h1>
              <p className="font-merriweather text-gray-600 dark:text-gray-300 mb-6">
                {quiz.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-historic-cream rounded-lg p-4">
                  <div className="font-quicksand text-2xl font-bold text-historic-brown">
                    {quiz.questions.length}
                  </div>
                  <div className="font-quicksand text-sm text-gray-600">
                    Pertanyaan
                  </div>
                </div>
                <div className="bg-historic-cream rounded-lg p-4">
                  <div className="font-quicksand text-2xl font-bold text-historic-brown">
                    {formatTime(quiz.timeLimit)}
                  </div>
                  <div className="font-quicksand text-sm text-gray-600">
                    Waktu Total
                  </div>
                </div>
                <div className="bg-historic-cream rounded-lg p-4">
                  <div className="font-quicksand text-2xl font-bold text-historic-brown">
                    {quiz.difficulty}
                  </div>
                  <div className="font-quicksand text-sm text-gray-600">
                    Tingkat
                  </div>
                </div>
                <div className="bg-historic-cream rounded-lg p-4">
                  <div className="font-quicksand text-2xl font-bold text-historic-brown">
                    {quiz.totalPoints}
                  </div>
                  <div className="font-quicksand text-sm text-gray-600">
                    Total Poin
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-quicksand font-bold text-yellow-800 mb-2">
                  ⚠️ Petunjuk Quiz
                </h3>
                <ul className="text-left font-quicksand text-yellow-700 text-sm space-y-1">
                  <li>• Bacalah setiap pertanyaan dengan teliti</li>
                  <li>
                    • Anda dapat mengubah jawaban sebelum menyelesaikan quiz
                  </li>
                  <li>• Quiz akan berakhir otomatis jika waktu habis</li>
                  <li>• Skor akan langsung masuk ke leaderboard</li>
                </ul>
              </div>

              <button
                onClick={startQuiz}
                className="bg-historic-brown text-white px-8 py-4 rounded-lg font-quicksand text-lg hover:bg-historic-brown-dark transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <span>🚀</span>
                Mulai Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-white border-2 border-[#ced4da] rounded-lg">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      <Navbar />

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4">
            <h3 className="font-quicksand text-xl font-bold text-gray-800 mb-4">
              🏁 Selesaikan Quiz?
            </h3>
            <p className="font-quicksand text-gray-600 mb-6">
              Anda telah menjawab semua pertanyaan. Apakah Anda yakin ingin
              menyelesaikan quiz ini?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-quicksand hover:bg-gray-50"
              >
                Review Jawaban
              </button>
              <button
                onClick={handleFinishQuiz}
                className="flex-1 px-4 py-2 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Header */}
      <div className="bg-historic-brown text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-quicksand font-bold text-lg">{quiz.title}</h1>
            <div className="bg-historic-brown-dark px-3 py-1 rounded-full text-sm">
              {currentQuestionIndex + 1} / {quiz.questions.length}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-quicksand font-bold text-lg">
              ⏱️ {formatTime(timeRemaining)}
            </div>
            <div className="font-quicksand text-sm">
              {currentQuestion.points} poin
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="w-full bg-historic-brown-dark rounded-full h-2">
            <div
              className="bg-historic-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream py-4 md:py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-historic-brown text-white px-2 py-1 rounded text-sm font-quicksand">
                  {currentQuestion.difficulty}
                </span>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm font-quicksand">
                  {currentQuestion.era}
                </span>
              </div>
              <h2 className="font-merriweather text-xl text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestion.id] === index
                      ? "border-historic-brown bg-historic-cream"
                      : "border-gray-200 hover:border-historic-yellow"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion.id] === index
                          ? "border-historic-brown bg-historic-brown text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswers[currentQuestion.id] === index && "✓"}
                    </div>
                    <span className="font-quicksand">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg font-quicksand hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Sebelumnya
              </button>

              <div className="font-quicksand text-sm text-gray-500">
                Pertanyaan {currentQuestionIndex + 1} dari{" "}
                {quiz.questions.length}
              </div>

              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={() => setShowConfirmation(true)}
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-quicksand hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selesai Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                  className="px-6 py-2 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selanjutnya ��
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
