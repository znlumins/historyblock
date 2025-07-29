import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Stats = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 border-2 border-[#ced4da] dark:border-gray-700 rounded-lg">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream dark:from-gray-800 dark:to-gray-700 py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-georgia text-4xl text-historic-brown-dark dark:text-yellow-300 mb-2">
              Statistik Pembelajaran
            </h1>
            <p className="font-merriweather text-gray-600 dark:text-gray-200">
              Pantau progress dan pencapaian belajar sejarah Anda
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-quicksand text-2xl font-bold text-historic-brown-dark dark:text-yellow-300">
                #1
              </div>
              <div className="font-quicksand text-gray-600 dark:text-gray-300">
                Ranking Global
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="font-quicksand text-2xl font-bold text-historic-brown-dark dark:text-yellow-300">
                2,450
              </div>
              <div className="font-quicksand text-gray-600 dark:text-gray-300">
                Total Poin
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">📚</div>
              <div className="font-quicksand text-2xl font-bold text-historic-brown-dark dark:text-yellow-300">
                47
              </div>
              <div className="font-quicksand text-gray-600 dark:text-gray-300">
                Kuis Selesai
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-quicksand text-2xl font-bold text-historic-brown-dark dark:text-yellow-300">
                89%
              </div>
              <div className="font-quicksand text-gray-600 dark:text-gray-300">
                Akurasi Rata-rata
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Quiz History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                📈 Riwayat Kuis Terakhir
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      Kemerdekaan RI
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      2 jam yang lalu
                    </div>
                  </div>
                  <div className="text-green-600 dark:text-green-400 font-bold">
                    95%
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      Kerajaan Majapahit
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      1 hari yang lalu
                    </div>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-bold">
                    87%
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      Perang Diponegoro
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      3 hari yang lalu
                    </div>
                  </div>
                  <div className="text-yellow-600 dark:text-yellow-400 font-bold">
                    92%
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                🏅 Progress Achievement
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-quicksand text-gray-800 dark:text-gray-200">
                      Sejarah Indonesia
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      8/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-historic-brown dark:bg-yellow-400 h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-quicksand text-gray-800 dark:text-gray-200">
                      Perang Dunia
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      6/8
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-historic-brown dark:bg-yellow-400 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-quicksand text-gray-800 dark:text-gray-200">
                      Kerajaan Nusantara
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      4/6
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-historic-brown dark:bg-yellow-400 h-2 rounded-full"
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mt-8">
            <h3 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              📊 Aktivitas Minggu Ini
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                (day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-sm font-quicksand text-gray-600 dark:text-gray-400 mb-2">
                      {day}
                    </div>
                    <div
                      className={`w-full h-8 rounded ${
                        index < 5
                          ? "bg-historic-brown dark:bg-yellow-400"
                          : index === 5
                            ? "bg-historic-brown dark:bg-yellow-400 opacity-50"
                            : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    ></div>
                    <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                      {index < 5 ? `${3 + index}` : index === 5 ? "1" : "-"}
                    </div>
                  </div>
                ),
              )}
            </div>
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
            Belajar sejarah dengan cara yang menyenangkan
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Stats;
