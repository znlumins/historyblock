import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Kuis = () => {
  const navigate = useNavigate();
  const [detectedCard, setDetectedCard] = useState(null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showManualQuizDialog, setShowManualQuizDialog] = useState(false);

  const handleARScan = () => {
    navigate("/ar");
  };

  const handleCardDetected = (cardData) => {
    setDetectedCard(cardData);

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
    const targetQuiz = quizMap[quizId] || "quiz-proklamasi";
    navigate(`/quiz/${targetQuiz}`);
  };

  const getScannedQuizzes = () => {
    return JSON.parse(localStorage.getItem("scannedQuizzes") || "[]");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Manual Quiz Selection Dialog */}
      {showManualQuizDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Pilih Quiz Manual
              </h3>
              <p className="text-gray-600">
                Pilih quiz berdasarkan era atau tingkat kesulitan
              </p>
            </div>

            {/* Kuis yang Sudah Discan */}
            {getScannedQuizzes().length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📱 Kuis yang Sudah Discan ({getScannedQuizzes().length})
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {getScannedQuizzes().map((quiz, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setShowManualQuizDialog(false);
                        navigate(`/quiz/${quiz.id.replace("hc", "quiz-")}`);
                      }}
                      className="p-4 border-2 border-yellow-400 rounded-lg hover:border-orange-400 text-left transition-colors bg-yellow-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🎯</div>
                        <div>
                          <h5 className="font-bold text-gray-800">
                            {quiz.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {quiz.era} • {quiz.difficulty} • Discan{" "}
                            {quiz.timesScanned} kali
                          </p>
                          <p className="text-xs text-gray-500">
                            Terakhir discan:{" "}
                            {new Date(
                              quiz.lastScannedAt || quiz.scannedAt,
                            ).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-200 my-6"></div>
              </div>
            )}

            {/* Kuis Manual */}
            {getScannedQuizzes().length > 0 ? (
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📖 Kuis Lainnya yang Tersedia
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    onClick={() => {
                      setShowManualQuizDialog(false);
                      navigate("/quiz/quiz-proklamasi");
                    }}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🇮🇩</div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          Proklamasi Kemerdekaan
                        </h4>
                        <p className="text-sm text-gray-600">
                          Era Kemerdekaan • Mudah • 500 poin
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowManualQuizDialog(false);
                      navigate("/quiz/quiz-majapahit");
                    }}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🏛️</div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          Kerajaan Majapahit
                        </h4>
                        <p className="text-sm text-gray-600">
                          Era Hindu-Buddha • Sedang • 750 poin
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowManualQuizDialog(false);
                      navigate("/quiz/quiz-diponegoro");
                    }}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">⚔️</div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          Perang Diponegoro
                        </h4>
                        <p className="text-sm text-gray-600">
                          Era Kolonial • Sulit • 1000 poin
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📱</div>
                <h4 className="font-bold text-xl text-gray-800 mb-2">
                  Scan Kartu Historic Block Dulu!
                </h4>
                <p className="text-gray-600 mb-4">
                  Untuk mengakses kuis manual, kamu perlu scan kartu Historic
                  Block terlebih dahulu menggunakan AR Scanner.
                </p>
                <button
                  onClick={() => {
                    setShowManualQuizDialog(false);
                    handleARScan();
                  }}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  🎯 Mulai AR Scan
                </button>
              </div>
            )}

            <button
              onClick={() => setShowManualQuizDialog(false)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 mt-6"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Quiz Detection Dialog */}
      {showQuizDialog && detectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg mx-4">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Kartu Terdeteksi!
              </h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h4 className="text-xl font-bold text-gray-800">
                  {detectedCard.name}
                </h4>
                <p className="text-gray-600 mt-1">
                  Era: {detectedCard.era}
                </p>
                <p className="text-gray-600">
                  Tingkat: {detectedCard.difficulty}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  {detectedCard.description}
                </p>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600">
                Apakah Anda siap memulai kuis berdasarkan kartu ini?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowQuizDialog(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                Nanti
              </button>
              <button
                onClick={handleStartQuiz}
                className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
              >
                Mulai Kuis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎮 Kuis Historic Block
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mulai petualangan sejarah Anda! Gunakan AR untuk memindai kartu
              atau pilih kuis manual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* AR Scan Option */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center border-2 border-yellow-400 hover:border-orange-400 transition-colors">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                AR Scan Kartu
              </h2>
              <p className="text-gray-600 mb-6">
                Gunakan kamera untuk memindai kartu Historic Block dan mulai
                kuis otomatis
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✅</span>
                  Deteksi kartu otomatis
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✅</span>
                  Kuis disesuaikan dengan kartu
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✅</span>
                  Pengalaman interaktif
                </div>
              </div>
              <button
                onClick={handleARScan}
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold w-full"
              >
                🎯 Mulai AR Scan
              </button>
            </div>

            {/* Manual Quiz Option */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center border-2 border-gray-200 hover:border-yellow-400 transition-colors">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Kuis Manual
              </h2>
              <p className="text-gray-600 mb-6">
                Pilih sendiri topik dan tingkat kesulitan kuis sejarah yang
                ingin dimainkan
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✅</span>
                  Pilih topik sendiri
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✅</span>
                  Berbagai tingkat kesulitan
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">✅</span>
                  Akses semua materi
                </div>
              </div>
              <button
                onClick={() => setShowManualQuizDialog(true)}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold w-full"
              >
                📖 Pilih Kuis Manual
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              📊 Statistik Cepat
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">15</div>
                <div className="text-sm text-gray-600">Kuis Selesai</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">85%</div>
                <div className="text-sm text-gray-600">Akurasi</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">1,250</div>
                <div className="text-sm text-gray-600">Total Poin</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">#5</div>
                <div className="text-sm text-gray-600">Ranking</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-semibold mb-2">Historic Block</p>
          <p className="text-gray-400 mb-4">
            Belajar sejarah dengan cara yang menyenangkan
          </p>
          <div className="flex justify-center items-center gap-6 text-sm">
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors underline">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Kuis;
