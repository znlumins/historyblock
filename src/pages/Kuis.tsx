import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ARCamera from "@/components/ARCamera";

const Kuis = () => {
  const navigate = useNavigate();
  const [showARCamera, setShowARCamera] = useState(false);
  const [detectedCard, setDetectedCard] = useState(null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showManualQuizDialog, setShowManualQuizDialog] = useState(false);

  const handleARScan = () => {
    navigate("/ar-scan");
  };

  const handleCardDetected = (cardData) => {
    setDetectedCard(cardData);
    setShowARCamera(false);

    // Simpan kuis yang sudah discan ke localStorage
    const scannedQuizzes = JSON.parse(
      localStorage.getItem("scannedQuizzes") || "[]",
    );
    const quizExists = scannedQuizzes.find((quiz) => quiz.id === cardData.id);

    if (!quizExists) {
      const newScannedQuiz = {
        ...cardData,
        scannedAt: new Date().toISOString(),
        timesScanned: 1,
      };
      scannedQuizzes.push(newScannedQuiz);
      localStorage.setItem("scannedQuizzes", JSON.stringify(scannedQuizzes));
    } else {
      // Update times scanned
      quizExists.timesScanned += 1;
      quizExists.lastScannedAt = new Date().toISOString();
      localStorage.setItem("scannedQuizzes", JSON.stringify(scannedQuizzes));
    }

    setShowQuizDialog(true);
  };

  const handleStartQuiz = () => {
    // Navigate to actual quiz interface
    setShowQuizDialog(false);
    const quizId = detectedCard.id.replace("hc", "quiz-");
    const quizMap = {
      "quiz-001": "quiz-proklamasi",
      "quiz-002": "quiz-majapahit",
      "quiz-003": "quiz-diponegoro",
    };
    navigate(`/quiz/${quizMap[quizId] || "quiz-proklamasi"}`);
  };

  const handleManualQuiz = () => {
    // Show manual quiz selection options
    setShowManualQuizDialog(true);
  };

  // Get scanned quizzes dari localStorage
  const getScannedQuizzes = () => {
    return JSON.parse(localStorage.getItem("scannedQuizzes") || "[]");
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

      {/* AR Camera Modal */}
      {showARCamera && (
        <ARCamera
          onCardDetected={handleCardDetected}
          onClose={() => setShowARCamera(false)}
        />
      )}

      {/* Manual Quiz Selection Dialog */}
      {showManualQuizDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="font-georgia text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-2">
                Pilih Quiz Manual
              </h3>
              <p className="font-quicksand text-gray-600 dark:text-gray-300">
                Pilih quiz berdasarkan era atau tingkat kesulitan
              </p>
            </div>

            {/* Kuis yang Sudah Discan */}
            {getScannedQuizzes().length > 0 && (
              <div className="mb-8">
                <h4 className="font-quicksand font-bold text-lg text-historic-brown dark:text-historic-yellow mb-4 flex items-center gap-2">
                  📱 Kuis yang Sudah Discan ({getScannedQuizzes().length})
                </h4>
                <div className="grid gap-3 mb-4">
                  {getScannedQuizzes().map((quiz, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setShowManualQuizDialog(false);
                        const quizMap = {
                          hc001: "quiz-proklamasi",
                          hc002: "quiz-majapahit",
                          hc003: "quiz-diponegoro",
                        };
                        navigate(
                          `/quiz/${quizMap[quiz.id] || "quiz-proklamasi"}`,
                        );
                      }}
                      className="p-4 border-2 border-historic-yellow dark:border-historic-yellow rounded-lg hover:border-historic-orange dark:hover:border-historic-orange text-left transition-colors bg-historic-yellow/10 dark:bg-historic-yellow/20"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-quicksand font-bold text-historic-brown dark:text-historic-yellow">
                            {quiz.name}
                          </h5>
                          <p className="font-quicksand text-sm text-gray-600 dark:text-gray-300">
                            {quiz.era} • {quiz.difficulty} • Discan{" "}
                            {quiz.timesScanned}x
                          </p>
                          <p className="font-quicksand text-xs text-gray-500 dark:text-gray-400">
                            Terakhir discan:{" "}
                            {new Date(
                              quiz.lastScannedAt || quiz.scannedAt,
                            ).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                        <div className="text-2xl">⭐</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 my-6"></div>
              </div>
            )}

            {/* Semua Kuis Tersedia - Hanya muncul jika ada yang sudah discan */}
            {getScannedQuizzes().length > 0 && (
              <div>
                <h4 className="font-quicksand font-bold text-lg text-historic-brown dark:text-historic-yellow mb-4 flex items-center gap-2">
                  📖 Kuis Lainnya yang Tersedia
                </h4>
                <div className="grid gap-4 mb-6">
                  <button
                    onClick={() => {
                      setShowManualQuizDialog(false);
                      navigate("/quiz/quiz-proklamasi");
                    }}
                    className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-historic-brown dark:hover:border-historic-yellow text-left transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-quicksand font-bold text-historic-brown dark:text-historic-yellow">
                          Proklamasi Kemerdekaan
                        </h4>
                        <p className="font-quicksand text-sm text-gray-600 dark:text-gray-300">
                          Era Kemerdekaan • Mudah • 500 poin
                        </p>
                      </div>
                      <div className="text-2xl">🇮🇩</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowManualQuizDialog(false);
                      navigate("/quiz/quiz-majapahit");
                    }}
                    className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-historic-brown dark:hover:border-historic-yellow text-left transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-quicksand font-bold text-historic-brown dark:text-historic-yellow">
                          Kerajaan Majapahit
                        </h4>
                        <p className="font-quicksand text-sm text-gray-600 dark:text-gray-300">
                          Era Hindu-Buddha • Sedang • 750 poin
                        </p>
                      </div>
                      <div className="text-2xl">👑</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowManualQuizDialog(false);
                      navigate("/quiz/quiz-diponegoro");
                    }}
                    className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-historic-brown dark:hover:border-historic-yellow text-left transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-quicksand font-bold text-historic-brown dark:text-historic-yellow">
                          Perang Diponegoro
                        </h4>
                        <p className="font-quicksand text-sm text-gray-600 dark:text-gray-300">
                          Era Kolonial • Sulit • 1000 poin
                        </p>
                      </div>
                      <div className="text-2xl">⚔️</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Jika belum ada yang discan, tampilkan pesan */}
            {getScannedQuizzes().length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📱</div>
                <h4 className="font-quicksand font-bold text-xl text-historic-brown dark:text-historic-yellow mb-2">
                  Scan Kartu Historic Block Dulu!
                </h4>
                <p className="font-quicksand text-gray-600 dark:text-gray-300 mb-4">
                  Untuk mengakses kuis manual, kamu perlu scan kartu Historic
                  Block terlebih dahulu menggunakan AR Scanner.
                </p>
                <button
                  onClick={() => {
                    setShowManualQuizDialog(false);
                    handleARScan();
                  }}
                  className="bg-historic-brown dark:bg-historic-yellow text-white dark:text-historic-brown font-quicksand px-6 py-3 rounded-lg hover:bg-historic-brown-dark dark:hover:bg-yellow-400 transition-colors"
                >
                  📱 Buka AR Scanner
                </button>
              </div>
            )}

            <button
              onClick={() => setShowManualQuizDialog(false)}
              className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-quicksand hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Quiz Confirmation Dialog */}
      {showQuizDialog && detectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-lg mx-4">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="font-georgia text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-2">
                Kartu Terdeteksi!
              </h3>
              <div className="bg-historic-cream dark:bg-gray-700 rounded-lg p-4 mb-4">
                <h4 className="font-quicksand text-xl font-bold text-historic-brown dark:text-historic-yellow">
                  {detectedCard.name}
                </h4>
                <p className="font-quicksand text-gray-600 dark:text-gray-300 mt-1">
                  Era: {detectedCard.era}
                </p>
                <p className="font-quicksand text-gray-600 dark:text-gray-300">
                  Tingkat: {detectedCard.difficulty}
                </p>
                <p className="font-merriweather text-sm text-gray-700 dark:text-gray-200 mt-2">
                  {detectedCard.description}
                </p>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="font-quicksand text-gray-600 dark:text-gray-300">
                Apakah Anda siap memulai kuis berdasarkan kartu ini?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowQuizDialog(false)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-quicksand hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleStartQuiz}
                className="flex-1 px-6 py-3 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8078 17.5267H21.9075V20.8114H20.8078V17.5267ZM20.8078 2.18857H21.9075V5.48044H20.8078V2.18857ZM17.5231 1.09607H20.8078V2.18857H17.5231V1.09607ZM17.5231 20.8114H20.8078V21.9039H17.5231V20.8114ZM18.6156 4.38435H4.3772V18.6228H18.6156V4.38435ZM14.2384 9.86123H15.3309V13.1459H12.0463V12.0534H14.2384V9.86123ZM9.85407 5.48404H13.1388V6.57654H9.85407V5.48404ZM9.85407 7.66904H13.1388V10.9537H12.0463V8.76872H9.85407V7.66904ZM9.85407 9.86123H10.9538V13.1459H9.85407V9.86123ZM8.76157 17.5303H5.47688V14.2456H8.76157V17.5303ZM8.76157 12.0534H6.56938V13.1459H5.47688V9.86123H6.56938V10.9537H8.76157V12.0534ZM8.76157 9.86123H7.66907V7.66904H8.76157V9.86123ZM8.76157 6.57654H6.56938V8.76872H5.47688V5.48044H8.76157V6.57654ZM13.1388 17.5303H12.0463V16.4306H13.1388V17.5303ZM13.1388 15.3381H10.9538V17.5303H9.85407V14.2456H13.1388V15.3381ZM17.5231 17.5303H14.2384V14.2456H17.5231V17.5303ZM17.5231 13.1459H16.4306V9.86123H17.5231V13.1459ZM17.5231 8.76872H14.2384V5.48044H17.5231V8.76872Z"
                    fill="white"
                  />
                  <path
                    d="M15.331 15.3345H16.4307V16.427H15.331V15.3345ZM15.331 6.57294H16.4307V7.66544H15.331V6.57294ZM6.5694 15.3345H7.66909V16.427H6.5694V15.3345ZM2.19222 20.8114H5.4769V21.9039H2.19222V20.8114ZM2.19222 1.09607H5.4769V2.18857H2.19222V1.09607ZM1.09253 17.5267H2.19222V20.8114H1.09253V17.5267ZM1.09253 2.18857H2.19222V5.48044H1.09253V2.18857Z"
                    fill="white"
                  />
                </svg>
                Mulai Kuis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream dark:from-gray-800 dark:to-gray-700 py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-georgia text-4xl text-historic-brown-dark dark:text-historic-yellow mb-4">
              🎮 Kuis Historic Block
            </h1>
            <p className="font-merriweather text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
              Mulai petualangan sejarah Anda! Gunakan AR untuk memindai kartu
              Historic Block atau pilih kuis manual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* AR Scan Option */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg text-center border-2 border-historic-yellow hover:border-historic-orange transition-colors">
              <div className="text-4xl md:text-6xl mb-4">📱</div>
              <h2 className="font-quicksand text-xl md:text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-4">
                AR Scan Kartu
              </h2>
              <p className="font-merriweather text-gray-600 dark:text-gray-300 mb-6">
                Gunakan kamera untuk memindai kartu Historic Block dan mulai
                kuis sesuai kartu yang dipindai.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="mr-2">✅</span>
                  <span>Kuis disesuaikan dengan kartu</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="mr-2">✅</span>
                  <span>Pengalaman AR interaktif</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="mr-2">✅</span>
                  <span>Tingkat kesulitan otomatis</span>
                </div>
              </div>
              <button
                onClick={handleARScan}
                className="w-full bg-historic-brown text-white px-6 py-3 rounded-lg font-quicksand hover:bg-historic-brown-dark transition-colors flex items-center justify-center gap-2"
              >
                <span>📷</span>
                Buka Kamera AR
              </button>
            </div>

            {/* Manual Quiz Option */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg text-center border-2 border-gray-200 dark:border-gray-600 hover:border-historic-yellow transition-colors">
              <div className="text-4xl md:text-6xl mb-4">📚</div>
              <h2 className="font-quicksand text-xl md:text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-4">
                Kuis Manual
              </h2>
              <p className="font-merriweather text-gray-600 dark:text-gray-300 mb-6">
                Pilih sendiri topik dan tingkat kesulitan kuis sejarah yang
                ingin Anda kerjakan.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="mr-2">✅</span>
                  <span>Pilih topik sejarah</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="mr-2">✅</span>
                  <span>Atur tingkat kesulitan</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="mr-2">✅</span>
                  <span>Akses semua periode</span>
                </div>
              </div>
              <button
                onClick={handleManualQuiz}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-quicksand hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>⚙️</span>
                Pilih Kuis Manual
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-4 text-center">
              📊 Statistik Cepat
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-historic-cream dark:bg-gray-700 rounded-lg p-4">
                <div className="font-quicksand text-2xl font-bold text-historic-brown dark:text-historic-yellow">
                  15
                </div>
                <div className="font-quicksand text-sm text-gray-600 dark:text-gray-300">
                  Kuis Selesai
                </div>
              </div>
              <div className="bg-historic-cream dark:bg-gray-700 rounded-lg p-4">
                <div className="font-quicksand text-2xl font-bold text-historic-brown dark:text-historic-yellow">
                  85%
                </div>
                <div className="font-quicksand text-sm text-gray-600 dark:text-gray-300">
                  Akurasi
                </div>
              </div>
              <div className="bg-historic-cream dark:bg-gray-700 rounded-lg p-4">
                <div className="font-quicksand text-2xl font-bold text-historic-brown dark:text-historic-yellow">
                  1,250
                </div>
                <div className="font-quicksand text-sm text-gray-600 dark:text-gray-300">
                  Total Poin
                </div>
              </div>
              <div className="bg-historic-cream dark:bg-gray-700 rounded-lg p-4">
                <div className="font-quicksand text-2xl font-bold text-historic-brown dark:text-historic-yellow">
                  #5
                </div>
                <div className="font-quicksand text-sm text-gray-600 dark:text-gray-300">
                  Ranking
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              className="text-historic-cream-light dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
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
              className="text-historic-cream-light dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
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
              className="text-historic-cream-light dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
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

export default Kuis;
