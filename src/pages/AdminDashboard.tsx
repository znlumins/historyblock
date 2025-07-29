import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    totalQuestions: 0,
    quizCompletions: 0,
    avgScore: 0,
    recentActivity: [],
  });

  useEffect(() => {
    // Load admin statistics
    loadAdminStats();
  }, []);

  const loadAdminStats = () => {
    // Get data from localStorage (in real app, this would be API calls)
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]");

    const totalUsers = leaderboard.length;
    const totalQuizzes = 3; // From quizDatabase
    const totalQuestions = 14; // Total questions across all quizzes
    const quizCompletions = quizResults.length;
    const avgScore = quizResults.length
      ? Math.round(
          quizResults.reduce(
            (sum: number, result: { score: number }) => sum + result.score,
            0,
          ) / quizResults.length,
        )
      : 0;

    // Recent activity
    const recentActivity = quizResults
      .sort(
        (a: { completedAt: string }, b: { completedAt: string }) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      )
      .slice(0, 5)
      .map(
        (result: {
          id: string;
          userId: string;
          quizId: string;
          score: number;
          completedAt: string;
        }) => {
          const user = leaderboard.find(
            (u: { id: string }) => u.id === result.userId,
          );
          return {
            id: result.id,
            userName: user?.name || "Unknown User",
            quiz: result.quizId.replace("quiz-", "").replace("-", " "),
            score: result.score,
            completedAt: result.completedAt,
          };
        },
      );

    setStats({
      totalUsers,
      totalQuizzes,
      totalQuestions,
      quizCompletions,
      avgScore,
      recentActivity,
    });
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="font-georgia text-2xl text-red-600 mb-2">
            Akses Ditolak
          </h1>
          <p className="font-quicksand text-gray-600">
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
    <div className="min-h-screen flex flex-col bg-white border-2 border-[#ced4da] rounded-lg">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      <Navbar />

      <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-georgia text-4xl text-historic-brown-dark mb-4">
              🛠️ Admin Dashboard
            </h1>
            <p className="font-merriweather text-gray-600">
              Kelola sistem Historic Block dan monitor aktivitas pengguna
            </p>
          </div>

          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-quicksand text-sm text-gray-600">
                    Total Pengguna
                  </p>
                  <p className="font-quicksand text-3xl font-bold text-historic-brown">
                    {stats.totalUsers}
                  </p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-quicksand text-sm text-gray-600">
                    Total Kuis
                  </p>
                  <p className="font-quicksand text-3xl font-bold text-historic-brown">
                    {stats.totalQuizzes}
                  </p>
                </div>
                <div className="text-4xl">📚</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-quicksand text-sm text-gray-600">
                    Quiz Diselesaikan
                  </p>
                  <p className="font-quicksand text-3xl font-bold text-historic-brown">
                    {stats.quizCompletions}
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-quicksand text-sm text-gray-600">
                    Rata-rata Skor
                  </p>
                  <p className="font-quicksand text-3xl font-bold text-historic-brown">
                    {stats.avgScore}
                  </p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>
          </div>

          {/* Management Actions */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link
              to="/admin/quizzes"
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center border-2 border-transparent hover:border-historic-yellow"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark mb-2">
                Kelola Kuis
              </h3>
              <p className="font-quicksand text-gray-600 mb-4">
                Tambah, edit, atau hapus kuis dan pertanyaan
              </p>
              <div className="inline-flex items-center gap-2 text-historic-brown font-quicksand font-semibold">
                <span>Kelola Kuis</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              to="/admin/users"
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center border-2 border-transparent hover:border-historic-yellow"
            >
              <div className="text-6xl mb-4">👥</div>
              <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark mb-2">
                Kelola Pengguna
              </h3>
              <p className="font-quicksand text-gray-600 mb-4">
                Lihat dan kelola data pengguna sistem
              </p>
              <div className="inline-flex items-center gap-2 text-historic-brown font-quicksand font-semibold">
                <span>Kelola Pengguna</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              to="/admin/analytics"
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center border-2 border-transparent hover:border-historic-yellow"
            >
              <div className="text-6xl mb-4">📈</div>
              <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark mb-2">
                Analytics
              </h3>
              <p className="font-quicksand text-gray-600 mb-4">
                Lihat statistik dan laporan sistem
              </p>
              <div className="inline-flex items-center gap-2 text-historic-brown font-quicksand font-semibold">
                <span>Lihat Analytics</span>
                <span>→</span>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark mb-6">
              📈 Aktivitas Terkini
            </h3>
            {stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map(
                  (activity: {
                    id: string;
                    userName: string;
                    quiz: string;
                    score: number;
                    completedAt: string;
                  }) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-historic-cream rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-historic-brown rounded-full flex items-center justify-center text-white font-quicksand font-bold">
                          {activity.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-quicksand font-semibold text-gray-800">
                            {activity.userName}
                          </p>
                          <p className="font-quicksand text-sm text-gray-600">
                            Menyelesaikan quiz "{activity.quiz}"
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-quicksand font-bold text-historic-brown">
                          {activity.score} poin
                        </p>
                        <p className="font-quicksand text-xs text-gray-500">
                          {new Date(activity.completedAt).toLocaleString(
                            "id-ID",
                          )}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📭</div>
                <p className="font-quicksand text-gray-600">
                  Belum ada aktivitas terkini
                </p>
              </div>
            )}
          </div>
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
            Panel Admin Historic Block
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
