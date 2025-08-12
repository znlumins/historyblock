import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            🏛️ Historic Block
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Belajar sejarah Indonesia dengan cara yang menyenangkan! 
            Mainkan kuis interaktif dan tes pengetahuan sejarahmu.
          </p>
          
          {isAuthenticated ? (
            <Link
              to="/kuis"
              className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              🎯 Mulai Kuis
            </Link>
          ) : (
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                📝 Daftar Sekarang
              </Link>
              <Link
                to="/login"
                className="inline-block bg-white text-yellow-600 border border-yellow-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-50 transition-colors"
              >
                🚪 Masuk
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ✨ Fitur Unggulan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AR Scanner</h3>
              <p className="text-gray-600">Scan kartu Historic Block untuk memulai kuis</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Kuis Manual</h3>
              <p className="text-gray-600">Pilih topik dan tingkat kesulitan sendiri</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Leaderboard</h3>
              <p className="text-gray-600">Kompetisi dengan pemain lain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-semibold mb-2">Historic Block</p>
          <p className="text-gray-400">Belajar sejarah dengan cara yang menyenangkan</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
