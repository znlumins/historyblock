import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // State untuk form data
  const [formData, setFormData] = useState({
    fullName: user?.name || "Daffa Ahmad Al Attas",
    email: user?.email || "daffa@historic.com",
  });

  // State untuk toggle switches
  const [toggles, setToggles] = useState({
    showNameInLeaderboard: true,
    publicProfile: true,
    soundEffects: true,
    dailyQuizNotification: true,
    leaderboardUpdate: true,
  });

  // State untuk fitur aksesibilitas
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false,
    screenReader: false,
    reduceMotion: false,
    voiceNavigation: false,
    colorBlindSupport: false,
  });

  // State untuk difficulty level
  const [difficulty, setDifficulty] = useState("Sedang");

  // State untuk UI feedback
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

  // Load accessibility settings dari localStorage saat component mount
  useEffect(() => {
    const savedAccessibility = localStorage.getItem("accessibilitySettings");
    if (savedAccessibility) {
      const settings = JSON.parse(savedAccessibility);
      setAccessibility(settings);

      // Apply saved settings to document
      const root = document.documentElement;
      if (settings.highContrast) root.classList.add("high-contrast");
      if (settings.largeText) root.classList.add("large-text");
      if (settings.reduceMotion) root.classList.add("reduce-motion");
      if (settings.colorBlindSupport) root.classList.add("color-blind-support");
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggle = (toggleName) => {
    setToggles({
      ...toggles,
      [toggleName]: !toggles[toggleName],
    });
  };

  const handleAccessibilityToggle = (featureName) => {
    setAccessibility({
      ...accessibility,
      [featureName]: !accessibility[featureName],
    });

    // Apply accessibility features to document
    const root = document.documentElement;

    if (featureName === "highContrast") {
      if (!accessibility.highContrast) {
        root.classList.add("high-contrast");
      } else {
        root.classList.remove("high-contrast");
      }
    }

    if (featureName === "largeText") {
      if (!accessibility.largeText) {
        root.classList.add("large-text");
      } else {
        root.classList.remove("large-text");
      }
    }

    if (featureName === "reduceMotion") {
      if (!accessibility.reduceMotion) {
        root.classList.add("reduce-motion");
      } else {
        root.classList.remove("reduce-motion");
      }
    }

    // Save to localStorage
    const newAccessibility = {
      ...accessibility,
      [featureName]: !accessibility[featureName],
    };
    localStorage.setItem(
      "accessibilitySettings",
      JSON.stringify(newAccessibility),
    );
  };

  const handleSaveAccount = () => {
    // Simulate API call
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    // Redirect to change password flow
    alert("Redirect ke halaman ganti password (akan diimplementasi)");
  };

  const handleResetProgress = () => {
    setShowConfirmDialog("reset");
  };

  const handleDeleteAccount = () => {
    setShowConfirmDialog("delete");
  };

  const confirmAction = () => {
    if (showConfirmDialog === "reset") {
      alert("Progress berhasil di-reset!");
    } else if (showConfirmDialog === "delete") {
      alert("Akun berhasil dihapus!");
    }
    setShowConfirmDialog(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 border-2 border-[#ced4da] dark:border-gray-700 rounded-lg">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      {/* Header */}
      <Navbar />

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          ✅ Perubahan berhasil disimpan!
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4">
            <h3 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {showConfirmDialog === "reset"
                ? "⚠️ Reset Progress?"
                : "⚠️ Hapus Akun?"}
            </h3>
            <p className="font-quicksand text-gray-600 mb-6">
              {showConfirmDialog === "reset"
                ? "Semua progress kuis dan achievement akan hilang. Tindakan ini tidak dapat dibatalkan."
                : "Akun dan semua data Anda akan dihapus permanen. Tindakan ini tidak dapat dibatalkan."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-quicksand hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-quicksand hover:bg-red-700"
              >
                {showConfirmDialog === "reset" ? "Reset" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream dark:from-gray-800 dark:to-gray-700 py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-georgia text-4xl text-historic-brown-dark dark:text-historic-yellow mb-2">
              ⚙️ Pengaturan
            </h1>
            <p className="font-merriweather text-gray-600 dark:text-gray-300">
              Kelola preferensi dan pengaturan akun Anda
            </p>
          </div>

          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border dark:border-gray-700">
              <h2 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                👤 Pengaturan Akun
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-quicksand font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-quicksand focus:ring-2 focus:ring-historic-brown focus:border-historic-brown"
                    />
                  </div>
                  <div>
                    <label className="block font-quicksand font-semibold text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-quicksand focus:ring-2 focus:ring-historic-brown focus:border-historic-brown"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveAccount}
                  className="bg-historic-brown text-white px-6 py-2 rounded-lg font-quicksand hover:bg-historic-brown-dark transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="font-quicksand text-xl font-bold text-gray-800 mb-4">
                🔒 Privasi & Keamanan
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold">
                      Tampilkan nama di leaderboard
                    </div>
                    <div className="text-sm text-gray-600">
                      Nama Anda akan terlihat di papan peringkat
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("showNameInLeaderboard")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        toggles.showNameInLeaderboard
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          toggles.showNameInLeaderboard
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold">
                      Profil publik
                    </div>
                    <div className="text-sm text-gray-600">
                      Pemain lain dapat melihat statistik Anda
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("publicProfile")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        toggles.publicProfile
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          toggles.publicProfile
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
                <button
                  onClick={handleChangePassword}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-quicksand hover:bg-red-700 transition-colors"
                >
                  Ganti Password
                </button>
              </div>
            </div>

            {/* Game Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="font-quicksand text-xl font-bold text-gray-800 mb-4">
                🎮 Preferensi Game
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold">
                      Efek suara
                    </div>
                    <div className="text-sm text-gray-600">
                      Putar suara saat menjawab quiz
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("soundEffects")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        toggles.soundEffects
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          toggles.soundEffects
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold">
                      Mode gelap
                    </div>
                    <div className="text-sm text-gray-600">
                      Gunakan tema gelap untuk mata yang lebih nyaman
                    </div>
                  </div>
                  <button onClick={toggleTheme} className="relative">
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        theme === "dark" ? "bg-historic-brown" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          theme === "dark" ? "translate-x-5" : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
                <div>
                  <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                    Tingkat kesulitan default
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-quicksand focus:ring-2 focus:ring-historic-brown focus:border-historic-brown"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="font-quicksand text-xl font-bold text-gray-800 mb-4">
                🔔 Notifikasi
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold">
                      Notifikasi quiz harian
                    </div>
                    <div className="text-sm text-gray-600">
                      Pengingat untuk mengerjakan quiz setiap hari
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("dailyQuizNotification")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        toggles.dailyQuizNotification
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          toggles.dailyQuizNotification
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold">
                      Update leaderboard
                    </div>
                    <div className="text-sm text-gray-600">
                      Pemberitahuan perubahan ranking
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("leaderboardUpdate")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        toggles.leaderboardUpdate
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          toggles.leaderboardUpdate
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Accessibility Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="font-quicksand text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                ♿ Fitur Aksesibilitas
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Fitur khusus untuk membantu pengguna dengan kebutuhan khusus
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      High Contrast Mode
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Tingkatkan kontras warna untuk kemudahan membaca
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccessibilityToggle("highContrast")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        accessibility.highContrast
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          accessibility.highContrast
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      Large Text
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Perbesar ukuran teks untuk kemudahan membaca
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccessibilityToggle("largeText")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        accessibility.largeText
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          accessibility.largeText
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      Screen Reader Support
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Optimalisasi untuk pembaca layar
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccessibilityToggle("screenReader")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        accessibility.screenReader
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          accessibility.screenReader
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      Reduce Motion
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Kurangi animasi dan efek gerakan
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccessibilityToggle("reduceMotion")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        accessibility.reduceMotion
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          accessibility.reduceMotion
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      Voice Navigation
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Navigasi menggunakan perintah suara
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccessibilityToggle("voiceNavigation")}
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        accessibility.voiceNavigation
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          accessibility.voiceNavigation
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-quicksand font-semibold text-gray-800 dark:text-gray-200">
                      Color Blind Support
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Mode khusus untuk pengguna buta warna
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleAccessibilityToggle("colorBlindSupport")
                    }
                    className="relative"
                  >
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${
                        accessibility.colorBlindSupport
                          ? "bg-historic-brown"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                          accessibility.colorBlindSupport
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-quicksand">
                  💡 <strong>Tips:</strong> Fitur aksesibilitas ini akan
                  tersimpan dan diterapkan di seluruh aplikasi Historic Block.
                </p>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h2 className="font-quicksand text-xl font-bold text-red-700 mb-4">
                ⚠️ Zona Berbahaya
              </h2>
              <div className="space-y-3">
                <p className="text-red-600 font-quicksand">
                  Tindakan berikut tidak dapat dibatalkan
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleResetProgress}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-quicksand hover:bg-red-700 transition-colors"
                  >
                    Reset Progress
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-700 text-white px-4 py-2 rounded-lg font-quicksand hover:bg-red-800 transition-colors"
                  >
                    Hapus Akun
                  </button>
                </div>
              </div>
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

export default Settings;
