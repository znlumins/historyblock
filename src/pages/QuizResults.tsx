import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { QuizResult, Quiz } from "@/data/quizData";
import { useAuth } from "@/contexts/AuthContext";

const QuizResults = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const location = useLocation();
  const { user } = useAuth();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [leaderboardUpdated, setLeaderboardUpdated] = useState(false);

  useEffect(() => {
    // Get result from location state first
    if (location.state?.result && location.state?.quiz) {
      setResult(location.state.result);
      setQuiz(location.state.quiz);
      updateLeaderboard(location.state.result);
    } else if (resultId) {
      // Fallback: get from localStorage
      const results = JSON.parse(localStorage.getItem("quizResults") || "[]");
      const foundResult = results.find((r: QuizResult) => r.id === resultId);
      if (foundResult) {
        setResult(foundResult);
        // You'd also need to fetch quiz data here in a real app
      }
    }
  }, [resultId, location.state]);

  const updateLeaderboard = (quizResult: QuizResult) => {
    if (!user) return;

    // Get current leaderboard
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    // Find user in leaderboard or create new entry
    let userEntry = leaderboard.find((entry: any) => entry.id === user.id);

    if (userEntry) {
      // Update existing user
      userEntry.score += quizResult.score;
      userEntry.quizzesCompleted += 1;
      userEntry.totalQuestions += quizResult.totalQuestions;
      userEntry.correctAnswers += quizResult.correctAnswers;
      userEntry.lastActive = new Date().toISOString();

      // Update accuracy
      userEntry.accuracy = Math.round(
        (userEntry.correctAnswers / userEntry.totalQuestions) * 100,
      );

      // Update level based on total score
      if (userEntry.score >= 5000) userEntry.level = 20;
      else if (userEntry.score >= 4000) userEntry.level = 18;
      else if (userEntry.score >= 3000) userEntry.level = 16;
      else if (userEntry.score >= 2000) userEntry.level = 14;
      else if (userEntry.score >= 1500) userEntry.level = 12;
      else if (userEntry.score >= 1000) userEntry.level = 10;
      else if (userEntry.score >= 750) userEntry.level = 8;
      else if (userEntry.score >= 500) userEntry.level = 6;
      else if (userEntry.score >= 250) userEntry.level = 4;
      else userEntry.level = Math.max(1, Math.floor(userEntry.score / 100));
    } else {
      // Create new leaderboard entry
      userEntry = {
        id: user.id,
        name: user.name,
        email: user.email,
        score: quizResult.score,
        quizzesCompleted: 1,
        totalQuestions: quizResult.totalQuestions,
        correctAnswers: quizResult.correctAnswers,
        accuracy: Math.round(
          (quizResult.correctAnswers / quizResult.totalQuestions) * 100,
        ),
        level: Math.max(1, Math.floor(quizResult.score / 100)),
        lastActive: new Date().toISOString(),
        joinDate: new Date().toISOString(),
      };
      leaderboard.push(userEntry);
    }

    // Sort leaderboard by score
    leaderboard.sort((a: any, b: any) => b.score - a.score);

    // Save updated leaderboard
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    setLeaderboardUpdated(true);
  };

  const getScoreCategory = (percentage: number) => {
    if (percentage >= 90)
      return { text: "Luar Biasa!", color: "text-green-600", emoji: "🏆" };
    if (percentage >= 80)
      return { text: "Sangat Baik", color: "text-blue-600", emoji: "⭐" };
    if (percentage >= 70)
      return { text: "Baik", color: "text-yellow-600", emoji: "👍" };
    if (percentage >= 60)
      return { text: "Cukup", color: "text-orange-600", emoji: "💪" };
    return { text: "Perlu Belajar Lagi", color: "text-red-600", emoji: "📚" };
  };

  const getLevelTitle = (score: number) => {
    if (score >= 5000) return "Master Sejarah";
    if (score >= 3000) return "Ahli Sejarah";
    if (score >= 1500) return "Pelajar Sejarah";
    if (score >= 500) return "Pemula Sejarah";
    return "Calon Sejarawan";
  };

  if (!result || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="font-quicksand text-lg">Memuat hasil quiz...</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round(
    (result.correctAnswers / result.totalQuestions) * 100,
  );
  const scoreCategory = getScoreCategory(percentage);
  const minutes = Math.floor(result.timeTaken / 60);
  const seconds = result.timeTaken % 60;

  return (
    <div className="min-h-screen flex flex-col bg-white border-2 border-[#ced4da] rounded-lg">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      <Navbar />

      <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Main Results Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg text-center mb-8">
            <div className="text-6xl mb-4">{scoreCategory.emoji}</div>
            <h1 className="font-georgia text-3xl text-historic-brown-dark mb-2">
              Quiz Selesai!
            </h1>
            <h2 className="font-quicksand text-xl text-gray-600 mb-6">
              {quiz.title}
            </h2>

            <div className={`text-2xl font-bold mb-4 ${scoreCategory.color}`}>
              {scoreCategory.text}
            </div>

            {/* Score Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-historic-cream rounded-lg p-4">
                <div className="font-quicksand text-3xl font-bold text-historic-brown">
                  {result.score}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Total Poin
                </div>
              </div>
              <div className="bg-historic-cream rounded-lg p-4">
                <div className="font-quicksand text-3xl font-bold text-historic-brown">
                  {percentage}%
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Akurasi
                </div>
              </div>
              <div className="bg-historic-cream rounded-lg p-4">
                <div className="font-quicksand text-3xl font-bold text-historic-brown">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Benar
                </div>
              </div>
              <div className="bg-historic-cream rounded-lg p-4">
                <div className="font-quicksand text-3xl font-bold text-historic-brown">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Waktu
                </div>
              </div>
            </div>

            {/* Level Progress */}
            {leaderboardUpdated && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="text-green-600 font-quicksand font-bold mb-2">
                  🎉 Leaderboard Diperbarui!
                </div>
                <div className="text-green-700 font-quicksand text-sm">
                  Skor Anda telah ditambahkan ke leaderboard. Cek peringkat baru
                  Anda!
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-6 py-3 border border-historic-brown text-historic-brown rounded-lg font-quicksand hover:bg-historic-cream transition-colors"
              >
                {showDetails ? "Sembunyikan" : "Lihat"} Detail Jawaban
              </button>
              <Link
                to="/leaderboard"
                className="px-6 py-3 bg-historic-yellow text-historic-brown-dark rounded-lg font-quicksand hover:bg-historic-yellow-light transition-colors"
              >
                Lihat Leaderboard
              </Link>
              <Link
                to="/kuis"
                className="px-6 py-3 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark transition-colors"
              >
                Quiz Lainnya
              </Link>
            </div>
          </div>

          {/* Detailed Results */}
          {showDetails && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark mb-6">
                📝 Detail Jawaban
              </h3>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => {
                  const userAnswer = result.answers.find(
                    (a) => a.questionId === question.id,
                  );
                  const isCorrect = userAnswer?.isCorrect ?? false;
                  const selectedIndex = userAnswer?.selectedAnswer ?? -1;

                  return (
                    <div
                      key={question.id}
                      className={`border-l-4 pl-4 ${
                        isCorrect ? "border-green-500" : "border-red-500"
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            isCorrect ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-merriweather text-gray-800 mb-2">
                            {question.question}
                          </h4>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded text-sm ${
                                  optionIndex === question.correctAnswer
                                    ? "bg-green-100 border border-green-300 text-green-800"
                                    : optionIndex === selectedIndex &&
                                        !isCorrect
                                      ? "bg-red-100 border border-red-300 text-red-800"
                                      : "bg-gray-50"
                                }`}
                              >
                                <span className="font-quicksand">
                                  {optionIndex === question.correctAnswer &&
                                    "✅ "}
                                  {optionIndex === selectedIndex &&
                                    !isCorrect &&
                                    "❌ "}
                                  {option}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="font-quicksand text-sm text-blue-800">
                              <strong>Penjelasan:</strong>{" "}
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-quicksand text-sm font-bold ${
                              isCorrect ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isCorrect ? `+${question.points}` : "0"} poin
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-historic-brown border-t-4 border-historic-brown-dark py-6 md:py-9 px-4 md:px-8 lg:px-36">
        <div className="max-w-6xl mx-auto text-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c339a674deb6423c5cd64cac74684504d5ed5944?placeholderIfAbsent=true"
            alt="HISTORIC BLOCK"
            className="w-[62px] h-[62px] mx-auto mb-4"
          />
          <p className="font-merriweather text-historic-cream-light">
            Belajar sejarah dengan cara yang menyenangkan
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QuizResults;
