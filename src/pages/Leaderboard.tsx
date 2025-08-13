import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Crown, Zap, Target, Medal } from "lucide-react";
import Navbar from "@/components/Navbar";

const Leaderboard = () => {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = () => {
    // Load leaderboard from localStorage
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    // If no leaderboard exists, create initial mock data
    if (leaderboard.length === 0) {
      const initialData = [
        {
          id: "1",
          name: "Daffa Ahmad Al Attas",
          email: "daffa@historic.com",
          level: 15,
          score: 2450,
          accuracy: 92,
          quizzesCompleted: 15,
          totalQuestions: 210,
          correctAnswers: 193,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "2",
          name: "Aymardayanti Pagril",
          email: "aymarda@example.com",
          level: 12,
          score: 2180,
          accuracy: 89,
          quizzesCompleted: 12,
          totalQuestions: 168,
          correctAnswers: 149,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 25 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "3",
          name: "Budi Setiawan",
          email: "budi@example.com",
          level: 11,
          score: 1950,
          accuracy: 87,
          quizzesCompleted: 11,
          totalQuestions: 154,
          correctAnswers: 134,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 20 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "4",
          name: "Citra Dewi",
          email: "citra@example.com",
          level: 9,
          score: 1750,
          accuracy: 85,
          quizzesCompleted: 10,
          totalQuestions: 140,
          correctAnswers: 119,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 18 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "5",
          name: "Eko Prasetyo",
          email: "eko@example.com",
          level: 8,
          score: 1520,
          accuracy: 82,
          quizzesCompleted: 9,
          totalQuestions: 126,
          correctAnswers: 103,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 15 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "6",
          name: "Farah Amalia",
          email: "farah@example.com",
          level: 7,
          score: 1350,
          accuracy: 80,
          quizzesCompleted: 8,
          totalQuestions: 112,
          correctAnswers: 90,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 12 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "7",
          name: "Galih Nugraha",
          email: "galih@example.com",
          level: 6,
          score: 1180,
          accuracy: 78,
          quizzesCompleted: 7,
          totalQuestions: 98,
          correctAnswers: 76,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 10 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "8",
          name: "Hana Sari",
          email: "hana@example.com",
          level: 5,
          score: 980,
          accuracy: 75,
          quizzesCompleted: 6,
          totalQuestions: 84,
          correctAnswers: 63,
          lastActive: new Date().toISOString(),
          joinDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "9",
          name: "Indra Wijaya",
          email: "indra@example.com",
          level: 4,
          score: 820,
          accuracy: 73,
          quizzesCompleted: 5,
          totalQuestions: 70,
          correctAnswers: 51,
          lastActive: new Date().toISOString(),
          joinDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "10",
          name: "Joko Santoso",
          email: "joko@example.com",
          level: 3,
          score: 650,
          accuracy: 70,
          quizzesCompleted: 4,
          totalQuestions: 56,
          correctAnswers: 39,
          lastActive: new Date().toISOString(),
          joinDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];

      // Save to localStorage
      localStorage.setItem("leaderboard", JSON.stringify(initialData));
      leaderboard = initialData;
    }

    // Sort by score descending
    const sortedData = leaderboard.sort((a, b) => b.score - a.score);
    setTopPlayers(sortedData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white border-2 border-[#ced4da] rounded-lg transition-colors">
      {/* Import Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      <Navbar />

      {/* Main Content - Leaderboard */}
      <section className="w-full bg-gradient-to-r from-historic-cream-light to-historic-cream py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20 flex-1 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-georgia text-5xl text-historic-brown-dark mb-4 flex items-center justify-center gap-3">
              <Trophy size={48} className="text-historic-brown-dark" />
              Papan Peringkat
            </h1>
            <p className="font-merriweather text-xl text-gray-600">
              Para ahli sejarah terbaik dengan skor tertinggi
            </p>
          </div>

          {/* Leaderboard Cards */}
          <div className="space-y-4">
            {topPlayers.map((player, index) => {
              const isTopThree = index < 3;
              const position = index + 1;

              return (
                <div
                  key={player.id}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl ${
                    isTopThree
                      ? position === 1
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                        : position === 2
                        ? "bg-gradient-to-r from-gray-300 to-gray-400"
                        : "bg-gradient-to-r from-orange-400 to-orange-500"
                      : "bg-white shadow-lg"
                  }`}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 md:gap-6">
                        {/* Position Badge */}
                        <div
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg md:text-xl ${
                            isTopThree
                              ? "bg-white bg-opacity-20 text-white"
                              : "bg-historic-cream text-historic-brown"
                          }`}
                        >
                          {position === 1 ? <Crown size={20} /> : position}
                        </div>

                        {/* Player Info */}
                        <div>
                          <h3
                            className={`font-quicksand text-xl md:text-2xl font-bold ${
                              isTopThree
                                ? "text-white"
                                : "text-gray-800"
                            }`}
                          >
                            {player.name}
                          </h3>
                          <div
                            className={`font-merriweather text-sm md:text-base ${
                              isTopThree
                                ? position === 1
                                  ? "text-white text-opacity-80"
                                  : "text-white text-opacity-80"
                                : "text-gray-600"
                            }`}
                          >
                            Level {player.level} • {player.quizzesCompleted} Quiz
                            Selesai
                          </div>
                          <div
                            className={`font-quicksand text-xs md:text-sm ${
                              isTopThree
                                ? position === 1
                                  ? "text-white text-opacity-60"
                                  : "text-white text-opacity-60"
                                : "text-gray-500"
                            }`}
                          >
                            Akurasi: {player.accuracy}% ({player.correctAnswers}/
                            {player.totalQuestions})
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div
                          className={`font-quicksand text-2xl md:text-3xl font-bold ${
                            isTopThree
                              ? "text-white"
                              : "text-historic-brown"
                          }`}
                        >
                          {player.score.toLocaleString()}
                        </div>
                        <div
                          className={`font-merriweather text-xs md:text-sm ${
                            isTopThree
                              ? position === 1
                                ? "text-white text-opacity-80"
                                : "text-white text-opacity-80"
                              : "text-gray-600"
                          }`}
                        >
                          poin
                        </div>
                      </div>
                    </div>

                    {/* Additional Stats for Top 3 */}
                    {isTopThree && (
                      <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="font-quicksand text-lg font-bold text-white">
                              {Math.round(player.score / player.quizzesCompleted)}
                            </div>
                            <div className="text-xs text-white text-opacity-70">
                              Avg/Quiz
                            </div>
                          </div>
                          <div>
                            <div className="font-quicksand text-lg font-bold text-white">
                              {player.level}
                            </div>
                            <div className="text-xs text-white text-opacity-70">
                              Level
                            </div>
                          </div>
                          <div>
                            <div className="font-quicksand text-lg font-bold text-white">
                              {player.accuracy}%
                            </div>
                            <div className="text-xs text-white text-opacity-70">
                              Akurasi
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Trophy Icon for Winner */}
                    {position === 1 && (
                      <div className="absolute top-4 right-4 text-4xl animate-bounce">
                        🏆
                      </div>
                    )}
                    {position === 2 && (
                      <div className="absolute top-4 right-4 text-3xl">🥈</div>
                    )}
                    {position === 3 && (
                      <div className="absolute top-4 right-4 text-3xl">🥉</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievement Badges */}
          <div className="mt-16 text-center">
            <h2 className="font-georgia text-3xl text-historic-brown-dark mb-8">
              🎖️ Pencapaian Istimewa
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">👑</div>
                <h3 className="font-quicksand text-lg font-bold text-historic-brown mb-2">
                  Master Sejarah
                </h3>
                <p className="font-merriweather text-sm text-gray-600">
                  Menyelesaikan 15+ quiz dengan akurasi 90%+
                </p>
                <div className="mt-3 text-xs text-green-600 font-semibold">
                  {topPlayers.filter(p => p.quizzesCompleted >= 15 && p.accuracy >= 90).length} pemain mencapai
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-quicksand text-lg font-bold text-historic-brown mb-2">
                  Speed Runner
                </h3>
                <p className="font-merriweather text-sm text-gray-600">
                  Menyelesaikan 10+ quiz dalam waktu singkat
                </p>
                <div className="mt-3 text-xs text-blue-600 font-semibold">
                  {topPlayers.filter(p => p.quizzesCompleted >= 10).length} pemain mencapai
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-quicksand text-lg font-bold text-historic-brown mb-2">
                  Perfect Score
                </h3>
                <p className="font-merriweather text-sm text-gray-600">
                  Mendapat skor sempurna di minimal 1 quiz
                </p>
                <div className="mt-3 text-xs text-purple-600 font-semibold">
                  {topPlayers.filter(p => p.accuracy >= 95).length} pemain mencapai
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="font-georgia text-2xl text-historic-brown-dark mb-4">
              Bergabunglah dengan Kompetisi!
            </h2>
            <p className="font-merriweather text-gray-600 mb-8">
              Mulai perjalanan sejarahmu dan raih posisi teratas di papan
              peringkat
            </p>
            <Link
              to="/kuis"
              className="inline-block bg-historic-brown text-white px-8 py-4 rounded-xl font-quicksand font-bold text-lg hover:bg-historic-brown-dark transition-colors shadow-lg"
            >
              🎯 Mulai Quiz Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-historic-brown border-t-4 border-historic-brown-dark py-6 md:py-9 px-4 md:px-8 lg:px-36">
        <div className="max-w-6xl mx-auto text-center relative">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c339a674deb6423c5cd64cac74684504d5ed5944?placeholderIfAbsent=true"
            alt="HISTORIC BLOCK"
            className="w-[62px] h-[62px] mx-auto mb-4"
          />

          <p className="font-merriweather text-historic-cream-light mb-4">
            Belajar sejarah dengan cara yang menyenangkan
          </p>

          <div className="flex justify-center items-center gap-4">
            <Link
              to="/about"
              className="font-quicksand text-sm text-historic-cream-light hover:text-white transition-colors underline"
            >
              Tentang Kami
            </Link>
            <span className="text-historic-cream-light">•</span>
            <Link
              to="/"
              className="font-quicksand text-sm text-historic-cream-light hover:text-white transition-colors underline"
            >
              Beranda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Leaderboard;
