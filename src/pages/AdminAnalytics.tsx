import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalQuizzes: 0,
    quizCompletions: 0,
    avgScore: 0,
    avgAccuracy: 0,
    topPerformers: [],
    quizPerformance: [],
    dailyActivity: [],
    userGrowth: [],
    popularQuizzes: [],
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    // Get data from localStorage (in real app, this would be API calls)
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
    const scannedQuizzes = JSON.parse(
      localStorage.getItem("scannedQuizzes") || "[]",
    );

    // Calculate analytics
    const totalUsers = leaderboard.length;
    const activeUsers = leaderboard.filter((user) => {
      const lastActive = new Date(user.lastActive);
      const daysDiff =
        (new Date().getTime() - lastActive.getTime()) / (1000 * 3600 * 24);
      return daysDiff <= 7; // Active in last 7 days
    }).length;

    const totalQuizzes = 3;
    const quizCompletions = quizResults.length;
    const avgScore = quizResults.length
      ? Math.round(
          quizResults.reduce((sum, result) => sum + result.score, 0) /
            quizResults.length,
        )
      : 0;
    const avgAccuracy = quizResults.length
      ? Math.round(
          quizResults.reduce(
            (sum, result) =>
              sum + (result.correctAnswers / result.totalQuestions) * 100,
            0,
          ) / quizResults.length,
        )
      : 0;

    // Top performers
    const topPerformers = leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((user) => ({
        name: user.name,
        score: user.score,
        accuracy: user.accuracy || 0,
        level: user.level,
      }));

    // Quiz performance
    const quizTypes = ["quiz-proklamasi", "quiz-majapahit", "quiz-diponegoro"];
    const quizPerformance = quizTypes.map((quizType) => {
      const quizAttempts = quizResults.filter(
        (result) => result.quizId === quizType,
      );
      const avgScore = quizAttempts.length
        ? Math.round(
            quizAttempts.reduce((sum, result) => sum + result.score, 0) /
              quizAttempts.length,
          )
        : 0;
      const avgAccuracy = quizAttempts.length
        ? Math.round(
            quizAttempts.reduce(
              (sum, result) =>
                sum + (result.correctAnswers / result.totalQuestions) * 100,
              0,
            ) / quizAttempts.length,
          )
        : 0;

      return {
        quizId: quizType,
        name: quizType.replace("quiz-", "").replace("-", " "),
        attempts: quizAttempts.length,
        avgScore,
        avgAccuracy,
      };
    });

    // Daily activity (last 7 days)
    const dailyActivity = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayQuizzes = quizResults.filter((result) => {
        const resultDate = new Date(result.completedAt);
        return resultDate.toDateString() === date.toDateString();
      }).length;

      dailyActivity.push({
        date: date.toLocaleDateString("id-ID", {
          weekday: "short",
          day: "numeric",
        }),
        quizzes: dayQuizzes,
        scans: Math.floor(dayQuizzes * 1.2), // Simulate scans
      });
    }

    // User growth (last 30 days)
    const userGrowth = [];
    for (let i = 6; i >= 0; i--) {
      const weeksAgo = i;
      const users = Math.max(
        0,
        totalUsers - weeksAgo * 2 + Math.floor(Math.random() * 3),
      );
      userGrowth.push({
        week: `${weeksAgo === 0 ? "Minggu ini" : `${weeksAgo} minggu lalu`}`,
        users,
        growth: weeksAgo === 6 ? 0 : Math.floor(Math.random() * 15) + 5,
      });
    }

    // Popular quizzes
    const popularQuizzes = quizPerformance
      .sort((a, b) => b.attempts - a.attempts)
      .map((quiz) => ({
        ...quiz,
        popularity: Math.min(
          100,
          (quiz.attempts / Math.max(1, quizCompletions)) * 100,
        ),
      }));

    setAnalytics({
      totalUsers,
      activeUsers,
      totalQuizzes,
      quizCompletions,
      avgScore,
      avgAccuracy,
      topPerformers,
      quizPerformance,
      dailyActivity,
      userGrowth,
      popularQuizzes,
    });
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="font-georgia text-2xl text-red-600 mb-2">
            Akses Ditolak
          </h1>
          <p className="font-quicksand text-gray-600 dark:text-gray-400">
            Anda tidak memiliki akses ke halaman admin.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 border-2 border-[#ced4da] dark:border-gray-700 rounded-lg">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      <Navbar />

      <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream dark:from-gray-800 dark:to-gray-700 py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-georgia text-4xl text-historic-brown-dark dark:text-historic-yellow mb-4">
              📊 Analytics Dashboard
            </h1>
            <p className="font-merriweather text-gray-600 dark:text-gray-300">
              Analisis performa dan statistik aplikasi Historic Block
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="font-quicksand text-2xl font-bold text-historic-brown dark:text-historic-yellow">
                {analytics.totalUsers}
              </div>
              <div className="font-quicksand text-gray-600 dark:text-gray-400">
                Total Users
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                {analytics.activeUsers} aktif 7 hari terakhir
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="font-quicksand text-2xl font-bold text-historic-brown dark:text-historic-yellow">
                {analytics.quizCompletions}
              </div>
              <div className="font-quicksand text-gray-600 dark:text-gray-400">
                Quiz Completions
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                dari {analytics.totalQuizzes} quiz tersedia
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="font-quicksand text-2xl font-bold text-historic-brown dark:text-historic-yellow">
                {analytics.avgScore}
              </div>
              <div className="font-quicksand text-gray-600 dark:text-gray-400">
                Avg Score
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                {analytics.avgAccuracy}% akurasi rata-rata
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">📱</div>
              <div className="font-quicksand text-2xl font-bold text-historic-brown dark:text-historic-yellow">
                {
                  JSON.parse(localStorage.getItem("scannedQuizzes") || "[]")
                    .length
                }
              </div>
              <div className="font-quicksand text-gray-600 dark:text-gray-400">
                AR Scans
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                total kartu discan
              </div>
            </div>
          </div>

          {/* Charts and Detailed Analytics */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Daily Activity Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                📈 Aktivitas Harian (7 hari terakhir)
              </h3>
              <div className="space-y-4">
                {analytics.dailyActivity.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="font-quicksand text-gray-700 dark:text-gray-300 w-20">
                      {day.date}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                        <div
                          className="bg-historic-brown dark:bg-historic-yellow h-4 rounded-full"
                          style={{
                            width: `${Math.min(100, (day.quizzes / 10) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="font-quicksand text-sm text-gray-600 dark:text-gray-400">
                      {day.quizzes} quiz • {day.scans} scan
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                🏆 Top Performers
              </h3>
              <div className="space-y-4">
                {analytics.topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-historic-brown dark:bg-historic-yellow rounded-full flex items-center justify-center text-white dark:text-historic-brown font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                          {performer.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Level {performer.level} • {performer.accuracy}%
                          akurasi
                        </div>
                      </div>
                    </div>
                    <div className="font-quicksand font-bold text-historic-brown dark:text-historic-yellow">
                      {performer.score.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz Performance Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
            <h3 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              📊 Analisis Performa Quiz
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {analytics.quizPerformance.map((quiz, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <h4 className="font-quicksand font-bold text-historic-brown dark:text-historic-yellow capitalize mb-2">
                    {quiz.name}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Attempts:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {quiz.attempts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Avg Score:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {quiz.avgScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Avg Accuracy:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {quiz.avgAccuracy}%
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-historic-brown dark:bg-historic-yellow h-2 rounded-full"
                          style={{ width: `${quiz.avgAccuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              ⚡ Quick Actions
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Link
                to="/admin/users"
                className="p-4 bg-historic-brown dark:bg-historic-yellow text-white dark:text-historic-brown rounded-lg hover:bg-historic-brown-dark dark:hover:bg-yellow-400 transition-colors text-center"
              >
                <div className="text-2xl mb-2">👥</div>
                <div className="font-quicksand font-semibold">Manage Users</div>
              </Link>
              <Link
                to="/admin/quizzes"
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                <div className="text-2xl mb-2">📝</div>
                <div className="font-quicksand font-semibold">
                  Manage Quizzes
                </div>
              </Link>
              <button
                onClick={loadAnalytics}
                className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-quicksand font-semibold">Refresh Data</div>
              </button>
              <Link
                to="/admin"
                className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-quicksand font-semibold">Dashboard</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-historic-brown dark:bg-gray-800 border-t-4 border-historic-brown-dark dark:border-gray-600 py-6 md:py-9 px-4 md:px-8 lg:px-36">
        <div className="max-w-6xl mx-auto text-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c339a674deb6423c5cd64cac74684504d5ed5944?placeholderIfAbsent=true"
            alt="HISTORIC BLOCK"
            className="w-[62px] h-[62px] mx-auto mb-4"
          />
          <p className="font-merriweather text-historic-cream-light dark:text-gray-300">
            Admin Analytics - Historic Block
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminAnalytics;
