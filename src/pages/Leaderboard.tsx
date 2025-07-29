import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
          name: "Adenia Raesita",
          email: "adenia@example.com",
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
          name: "Universitas Brawijaya",
          email: "ahmad@example.com",
          level: 10,
          score: 1720,
          accuracy: 85,
          quizzesCompleted: 10,
          totalQuestions: 140,
          correctAnswers: 119,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 15 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "5",
          name: "Derajat",
          email: "rina@example.com",
          level: 9,
          score: 1580,
          accuracy: 83,
          quizzesCompleted: 9,
          totalQuestions: 126,
          correctAnswers: 105,
          lastActive: new Date().toISOString(),
          joinDate: new Date(
            Date.now() - 10 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ];
      localStorage.setItem("leaderboard", JSON.stringify(initialData));
      leaderboard = initialData;
    }

    // Sort by score and format for display
    const formattedPlayers = leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 10) // Top 10
      .map((player, index) => ({
        rank: index + 1,
        id: player.id,
        name: player.name,
        level: `Level ${player.level} • ${getLevelTitle(player.level)}`,
        score: player.score,
        accuracy: player.accuracy || 0,
        badge: getBadge(index + 1),
        quizzesCompleted: player.quizzesCompleted || 0,
      }));

    setTopPlayers(formattedPlayers);
  };

  const getLevelTitle = (level) => {
    if (level >= 18) return "Master";
    if (level >= 15) return "Expert";
    if (level >= 10) return "Advanced";
    if (level >= 5) return "Intermediate";
    return "Beginner";
  };

  const getBadge = (rank) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "🏅";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 border-2 border-[#ced4da] dark:border-gray-700 rounded-lg transition-colors">
      {/* Import Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      {/* Header */}
      <Navbar />

      {/* Main Content - Leaderboard */}
      <section className="w-full bg-gradient-to-r from-historic-cream-light to-historic-cream dark:from-gray-800 dark:to-gray-700 py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20 flex-1 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-georgia text-5xl text-historic-brown-dark dark:text-historic-yellow mb-4">
              🏆 Papan Peringkat
            </h1>
            <p className="font-merriweather text-xl text-gray-600 dark:text-gray-300">
              Para ahli sejarah terbaik dengan skor tertinggi
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {topPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`rounded-xl p-6 ${
                  index === 0
                    ? "bg-gradient-to-r from-historic-yellow to-historic-orange"
                    : index === 1
                      ? "bg-gradient-to-r from-gray-300 to-gray-400"
                      : index === 2
                        ? "bg-gradient-to-r from-orange-400 to-orange-500"
                        : "bg-white dark:bg-gray-800 shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        index <= 2
                          ? "bg-white bg-opacity-20 text-white"
                          : "bg-historic-cream dark:bg-gray-700 text-historic-brown dark:text-historic-yellow"
                      }`}
                    >
                      {index <= 2 ? player.badge : player.rank}
                    </div>
                    <div>
                      <div
                        className={`font-quicksand text-lg font-medium ${
                          index <= 2
                            ? "text-white"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {player.name}
                      </div>
                      <div
                        className={`font-quicksand text-sm ${
                          index <= 2
                            ? index === 0
                              ? "text-historic-yellow-light"
                              : "text-white text-opacity-80"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {player.level}
                      </div>
                      <div
                        className={`font-quicksand text-xs ${
                          index <= 2
                            ? index === 0
                              ? "text-historic-yellow-light"
                              : "text-white text-opacity-60"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {player.quizzesCompleted} quiz • {player.accuracy}%
                        akurasi
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-quicksand text-2xl font-bold ${
                        index <= 2
                          ? "text-white"
                          : "text-historic-brown dark:text-historic-yellow"
                      }`}
                    >
                      {player.score.toLocaleString()}
                    </div>
                    <div
                      className={`font-quicksand text-sm ${
                        index <= 2
                          ? index === 0
                            ? "text-historic-yellow-light"
                            : "text-white text-opacity-80"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      Poin
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {topPlayers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="font-quicksand text-xl text-gray-600 mb-2">
                  Belum ada data leaderboard
                </h3>
                <p className="font-quicksand text-gray-500 mb-6">
                  Mulai kuis untuk muncul di leaderboard!
                </p>
                <Link
                  to="/kuis"
                  className="inline-block px-6 py-3 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark transition-colors"
                >
                  Mulai Quiz Pertama
                </Link>
              </div>
            )}

            {/* Stats Summary */}
            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
              <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark mb-6 text-center">
                📈 Statistik Leaderboard
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="font-quicksand text-2xl font-bold text-historic-brown">
                    {topPlayers.length}
                  </div>
                  <div className="font-quicksand text-sm text-gray-600">
                    Total Peserta
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-quicksand text-2xl font-bold text-historic-brown">
                    {topPlayers.length > 0
                      ? Math.round(
                          topPlayers.reduce(
                            (sum, p) => sum + p.quizzesCompleted,
                            0,
                          ) / topPlayers.length,
                        )
                      : 0}
                  </div>
                  <div className="font-quicksand text-sm text-gray-600">
                    Rata-rata Quiz
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-quicksand text-2xl font-bold text-historic-brown">
                    {topPlayers.length > 0
                      ? Math.round(
                          topPlayers.reduce((sum, p) => sum + p.accuracy, 0) /
                            topPlayers.length,
                        )
                      : 0}
                    %
                  </div>
                  <div className="font-quicksand text-sm text-gray-600">
                    Rata-rata Akurasi
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-quicksand text-2xl font-bold text-historic-brown">
                    {topPlayers.length > 0
                      ? topPlayers[0]?.score.toLocaleString()
                      : 0}
                  </div>
                  <div className="font-quicksand text-sm text-gray-600">
                    Skor Tertinggi
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-8">
              <p className="font-quicksand text-gray-600 mb-4">
                Ingin masuk ke leaderboard? Mulai quiz sekarang!
              </p>
              <Link
                to="/kuis"
                className="inline-block px-8 py-3 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark transition-colors mr-4"
              >
                🎯 Mulai Quiz
              </Link>
              <button
                onClick={() => {
                  // Force clear old data and load fresh
                  localStorage.removeItem("leaderboard");
                  loadLeaderboard();
                }}
                className="inline-block px-8 py-3 border border-historic-brown text-historic-brown rounded-lg font-quicksand hover:bg-historic-cream transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-historic-brown dark:bg-gray-800 border-t-4 border-historic-brown-dark dark:border-gray-600 py-6 md:py-9 px-4 md:px-8 lg:px-36">
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Logo */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c339a674deb6423c5cd64cac74684504d5ed5944?placeholderIfAbsent=true"
            alt="HISTORIC BLOCK"
            className="w-[62px] h-[62px] mx-auto mb-4"
          />

          <p className="font-merriweather text-historic-cream-light dark:text-gray-300 mb-4">
            Belajar sejarah dengan cara yang menyenangkan
          </p>

          {/* About Link */}
          <div className="mb-6">
            <Link
              to="/about"
              className="font-quicksand text-sm text-historic-cream-light dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors underline"
            >
              Tentang Tim Pengembang
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-historic-cream-light hover:text-white transition-colors"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_27_39)">
                  <path
                    d="M19.9375 10.5C19.9375 5.14844 15.6016 0.8125 10.25 0.8125C4.89844 0.8125 0.5625 5.14844 0.5625 10.5C0.5625 15.3352 4.10508 19.343 8.73633 20.0703V13.3004H6.27539V10.5H8.73633V8.36562C8.73633 5.93789 10.1816 4.59687 12.3953 4.59687C13.4555 4.59687 14.5641 4.78594 14.5641 4.78594V7.16875H13.3422C12.1391 7.16875 11.7637 7.91562 11.7637 8.68164V10.5H14.4504L14.0207 13.3004H11.7637V20.0703C16.3949 19.343 19.9375 15.3352 19.9375 10.5Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_39">
                    <path d="M0.25 0.5H20.25V20.5H0.25V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="#"
              className="text-historic-cream-light hover:text-white transition-colors"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_27_42)">
                  <path
                    d="M18.1941 6.42638C18.2068 6.60403 18.2068 6.78173 18.2068 6.95938C18.2068 12.3781 14.0825 18.6218 6.54441 18.6218C4.22207 18.6218 2.06473 17.9492 0.25 16.7817C0.579961 16.8198 0.897187 16.8325 1.23984 16.8325C3.15605 16.8325 4.92004 16.1853 6.32867 15.0812C4.52664 15.0431 3.01648 13.8629 2.49617 12.2386C2.75 12.2766 3.00379 12.302 3.27031 12.302C3.63832 12.302 4.00637 12.2512 4.34898 12.1624C2.47082 11.7817 1.06215 10.132 1.06215 8.13958V8.08884C1.60781 8.39341 2.24238 8.58376 2.91492 8.60911C1.81086 7.87306 1.08754 6.61673 1.08754 5.1954C1.08754 4.43399 1.29055 3.73603 1.6459 3.12688C3.66367 5.61419 6.69668 7.23853 10.0977 7.41622C10.0342 7.11165 9.99613 6.79442 9.99613 6.47716C9.99613 4.21825 11.8236 2.37817 14.0951 2.37817C15.2753 2.37817 16.3413 2.8731 17.09 3.67259C18.0164 3.49493 18.9047 3.15228 19.6916 2.68274C19.387 3.63454 18.7398 4.43403 17.8895 4.94161C18.7144 4.85282 19.5139 4.62435 20.2499 4.30712C19.6916 5.11927 18.9936 5.84259 18.1941 6.42638Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_42">
                    <path d="M0.25 0.5H20.25V20.5H0.25V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="#"
              className="text-historic-cream-light hover:text-white transition-colors"
            >
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_27_45)">
                  <path
                    d="M9.00391 6.00781C6.51953 6.00781 4.51562 8.01172 4.51562 10.4961C4.51562 12.9805 6.51953 14.9844 9.00391 14.9844C11.4883 14.9844 13.4922 12.9805 13.4922 10.4961C13.4922 8.01172 11.4883 6.00781 9.00391 6.00781ZM9.00391 13.4141C7.39844 13.4141 6.08594 12.1055 6.08594 10.4961C6.08594 8.88672 7.39453 7.57812 9.00391 7.57812C10.6133 7.57812 11.9219 8.88672 11.9219 10.4961C11.9219 12.1055 10.6094 13.4141 9.00391 13.4141ZM14.7227 5.82422C14.7227 6.40625 14.2539 6.87109 13.6758 6.87109C13.0938 6.87109 12.6289 6.40234 12.6289 5.82422C12.6289 5.24609 13.0977 4.77734 13.6758 4.77734C14.2539 4.77734 14.7227 5.24609 14.7227 5.82422ZM17.6953 6.88672C17.6289 5.48438 17.3086 4.24219 16.2812 3.21875C15.2578 2.19531 14.0156 1.875 12.6133 1.80469C11.168 1.72266 6.83594 1.72266 5.39062 1.80469C3.99219 1.87109 2.75 2.19141 1.72266 3.21484C0.695313 4.23828 0.378906 5.48047 0.308594 6.88281C0.226562 8.32812 0.226562 12.6602 0.308594 14.1055C0.375 15.5078 0.695313 16.75 1.72266 17.7734C2.75 18.7969 3.98828 19.1172 5.39062 19.1875C6.83594 19.2695 11.168 19.2695 12.6133 19.1875C14.0156 19.1211 15.2578 18.8008 16.2812 17.7734C17.3047 16.75 17.625 15.5078 17.6953 14.1055C17.7773 12.6602 17.7773 8.33203 17.6953 6.88672ZM15.8281 15.6562C15.5234 16.4219 14.9336 17.0117 14.1641 17.3203C13.0117 17.7773 10.2773 17.6719 9.00391 17.6719C7.73047 17.6719 4.99219 17.7734 3.84375 17.3203C3.07812 17.0156 2.48828 16.4258 2.17969 15.6562C1.72266 14.5039 1.82813 11.7695 1.82813 10.4961C1.82813 9.22266 1.72656 6.48438 2.17969 5.33594C2.48438 4.57031 3.07422 3.98047 3.84375 3.67187C4.99609 3.21484 7.73047 3.32031 9.00391 3.32031C10.2773 3.32031 13.0156 3.21875 14.1641 3.67187C14.9297 3.97656 15.5195 4.56641 15.8281 5.33594C16.2852 6.48828 16.1797 9.22266 16.1797 10.4961C16.1797 11.7695 16.2852 14.5078 15.8281 15.6562Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_45">
                    <path d="M0.25 0.5H17.75V20.5H0.25V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Leaderboard;
