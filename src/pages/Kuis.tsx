// src/pages/Kuis.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Komponen Kuis Utama
const Kuis = () => {
  const navigate = useNavigate();
  const [detectedCard, setDetectedCard] = useState(null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showManualQuizDialog, setShowManualQuizDialog] = useState(false);

  const getScannedQuizzes = () => {
    return JSON.parse(localStorage.getItem("scannedQuizzes") || "[]");
  };

  const handleARScan = () => {
    navigate("/ar-scan");
  };

  const handleStartQuiz = () => {
    if (!detectedCard) return;
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
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {showManualQuizDialog && (
        <ManualQuizDialog 
          onClose={() => setShowManualQuizDialog(false)} 
          scannedQuizzes={getScannedQuizzes()}
          navigate={navigate}
          startArScan={handleARScan}
        />
      )}

      {showQuizDialog && detectedCard && (
        <DetectedCardDialog
          card={detectedCard}
          onClose={() => setShowQuizDialog(false)}
          onStartQuiz={handleStartQuiz}
        />
      )}

      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
              Uji Wawasan Sejarahmu!
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">
              Pindai kartu ajaib dengan AR atau pilih kuis favoritmu secara manual. Siap jadi ahli sejarah?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <OptionCard
              title="Pindai Kartu AR"
              description="Arahkan kamera ke kartu Historic Block. Biarkan keajaiban AR membawamu langsung ke kuis yang relevan!"
              features={[
                "Deteksi kartu super cepat",
                "Kuis yang sesuai dengan kartumu",
                "Pengalaman belajar interaktif",
              ]}
              buttonText="Mulai Pindai AR"
              onButtonClick={handleARScan}
              isPrimary
            />
            <OptionCard
              title="Pilih Kuis Manual"
              description="Tak ada kartu? Tenang. Pilih sendiri topik sejarah yang ingin kamu taklukkan dari koleksi kami."
              features={[
                "Akses semua topik kuis",
                "Pilih tingkat kesulitan sendiri",
                "Asah pengetahuan kapan saja",
              ]}
              buttonText="Pilih Kuis Manual"
              onButtonClick={() => setShowManualQuizDialog(true)}
            />
          </div>

          <StatsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

// --- KOMPONEN-KOMPONEN KECIL ---

const OptionCard = ({ title, description, features, buttonText, onButtonClick, isPrimary = false }) => (
  <div className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col border-2 transition-all duration-300 ${isPrimary ? 'border-yellow-400 hover:border-yellow-500 hover:shadow-xl' : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'}`}>
    <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
    <p className="text-gray-600 mb-6 flex-grow">{description}</p>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start text-gray-700">
          <span className="text-green-500 font-bold mr-3 mt-1">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button onClick={onButtonClick} className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 mt-auto ${isPrimary ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md hover:shadow-lg' : 'bg-gray-700 text-white hover:bg-gray-800'}`}>
      {buttonText}
    </button>
  </div>
);

// --- PERBAIKAN DI SINI ---
// Menggunakan implicit return () agar JSX dikembalikan
const StatsSection = () => {
  const stats = [
      { value: 15, label: 'Kuis Selesai' },
      { value: '85%', label: 'Akurasi Jawaban' },
      { value: '1.250', label: 'Total Poin' },
      { value: '#5', label: 'Peringkat' },
  ];

  return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Papan Skor Kilat</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(stat => (
                  <div key={stat.label} className="bg-gray-100 rounded-lg p-4 text-center">
                      <div className="text-3xl font-extrabold text-yellow-600">{stat.value}</div>
                      <div className="text-sm font-semibold text-gray-600 mt-1">{stat.label}</div>
                  </div>
              ))}
          </div>
      </div>
  );
};

// --- DAN PERBAIKAN DI SINI ---
// Menggunakan implicit return () agar JSX dikembalikan
const DetectedCardDialog = ({ card, onClose, onStartQuiz }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-fade-in-up">
      <h3 className="text-2xl font-bold text-gray-800">Kartu Ditemukan!</h3>
      <div className="bg-gray-100 rounded-lg p-4 my-6 text-left">
        <h4 className="font-bold text-lg text-gray-900">{card.name}</h4>
        <p className="text-sm text-gray-600">{card.era} • {card.difficulty}</p>
        <p className="text-sm text-gray-700 mt-2">{card.description}</p>
      </div>
      <p className="text-gray-600 mb-6">Anda siap untuk memulai tantangan kuis dari kartu ini?</p>
      <div className="flex gap-4">
        <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">
          Nanti Saja
        </button>
        <button onClick={onStartQuiz} className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg">
          Mulai Kuis
        </button>
      </div>
    </div>
  </div>
);


const ManualQuizDialog = ({ onClose, scannedQuizzes, navigate, startArScan }) => {
  const hasScanned = scannedQuizzes.length > 0;
  const allManualQuizzes = [
    { id: "quiz-proklamasi", icon: "🇮🇩", title: "Proklamasi Kemerdekaan", details: "Era Kemerdekaan • Mudah • 500 poin" },
    { id: "quiz-majapahit", icon: "🏛️", title: "Kerajaan Majapahit", details: "Era Hindu-Buddha • Sedang • 750 poin" },
    { id: "quiz-diponegoro", icon: "⚔️", title: "Perang Diponegoro", details: "Era Kolonial • Sulit • 1000 poin" },
  ];
  const scannedQuizIds = new Set(scannedQuizzes.map(q => q.id.replace("hc", "quiz-")));
  const otherAvailableQuizzes = allManualQuizzes.filter(q => !scannedQuizIds.has(q.id));
  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        {hasScanned ? (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Pilih Kuis Manual</h3>
              <p className="text-gray-600 mt-2">Pilih dari koleksimu atau jelajahi kuis lainnya.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-800 mb-4">Koleksi Kartumu ({scannedQuizzes.length})</h4>
              <div className="space-y-4">
                {scannedQuizzes.map((quiz, index) => (
                  <QuizManualCard
                    key={index}
                    icon={allManualQuizzes.find(mq => mq.id === quiz.id.replace("hc", "quiz-"))?.icon || "📜"}
                    title={quiz.name}
                    details={`${quiz.era} • ${quiz.difficulty}`}
                    onClick={() => handleNavigate(`/quiz/${quiz.id.replace("hc", "quiz-")}`)}
                  />
                ))}
              </div>
            </div>
            {otherAvailableQuizzes.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-bold text-lg text-gray-800 mb-4">Kuis Lainnya Tersedia</h4>
                <div className="space-y-4">
                  {otherAvailableQuizzes.map((quiz) => (
                    <QuizManualCard
                      key={quiz.id}
                      icon={quiz.icon}
                      title={quiz.title}
                      details={quiz.details}
                      onClick={() => handleNavigate(`/quiz/${quiz.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-4">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-2xl font-bold text-gray-800">Buka Akses Penuh!</h3>
            <p className="text-gray-600 mt-2 mb-6 max-w-sm mx-auto">
              Untuk mengakses semua kuis manual, kamu perlu memindai minimal satu kartu Historic Block terlebih dahulu.
            </p>
            <button
              onClick={() => {
                onClose();
                startArScan();
              }}
              className="w-full sm:w-auto bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg"
            >
              Mulai Pindai AR
            </button>
          </div>
        )}
        <button onClick={onClose} className="w-full mt-8 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">
          Tutup
        </button>
      </div>
    </div>
  );
};

const QuizManualCard = ({ icon, title, details, onClick }) => (
    <button onClick={onClick} className="w-full text-left p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg hover:bg-yellow-100 hover:border-yellow-400 transition-all flex items-center gap-4">
        <span className="text-3xl flex-shrink-0 w-8 text-center">{icon}</span>
        <div>
            <h5 className="font-bold text-gray-800">{title}</h5>
            <p className="text-sm text-gray-600">{details}</p>
        </div>
    </button>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
            <h4 className="text-xl font-semibold">Historic Block</h4>
            <p className="text-gray-400 mt-1">Belajar sejarah jadi luar biasa.</p>
            <div className="mt-4">
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors underline">
                    Tentang Kami
                </Link>
            </div>
        </div>
    </footer>
);

export default Kuis;