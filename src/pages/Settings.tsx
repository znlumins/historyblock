import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (key: string) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    alert("Pengaturan disimpan!");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">⚙️ Pengaturan</h1>
          
          {/* Profile Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">👤 Profil Saya</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔒 Privasi</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-700">Tampilkan nama di leaderboard</div>
                  <div className="text-sm text-gray-500">Nama Anda akan terlihat di papan peringkat</div>
                </div>
                <button
                  onClick={() => handleToggleChange('showNameInLeaderboard')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    toggles.showNameInLeaderboard ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    toggles.showNameInLeaderboard ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-700">Profil publik</div>
                  <div className="text-sm text-gray-500">Pengguna lain dapat melihat profil Anda</div>
                </div>
                <button
                  onClick={() => handleToggleChange('publicProfile')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    toggles.publicProfile ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    toggles.publicProfile ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔔 Notifikasi</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-700">Efek suara</div>
                  <div className="text-sm text-gray-500">Putar suara saat bermain kuis</div>
                </div>
                <button
                  onClick={() => handleToggleChange('soundEffects')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    toggles.soundEffects ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    toggles.soundEffects ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-700">Notifikasi kuis harian</div>
                  <div className="text-sm text-gray-500">Ingatkan untuk bermain kuis setiap hari</div>
                </div>
                <button
                  onClick={() => handleToggleChange('dailyQuizNotification')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    toggles.dailyQuizNotification ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    toggles.dailyQuizNotification ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-700">Update leaderboard</div>
                  <div className="text-sm text-gray-500">Notifikasi saat posisi Anda berubah</div>
                </div>
                <button
                  onClick={() => handleToggleChange('leaderboardUpdate')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    toggles.leaderboardUpdate ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    toggles.leaderboardUpdate ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
            >
              💾 Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
