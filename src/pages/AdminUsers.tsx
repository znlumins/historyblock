import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

interface UserData {
  id: string;
  name: string;
  email: string;
  level: number;
  score: number;
  accuracy: number;
  quizzesCompleted: number;
  totalQuestions: number;
  correctAnswers: number;
  lastActive: string;
  joinDate: string;
  role?: "user" | "admin";
}

const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "score" | "level" | "joinDate">(
    "score",
  );
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, sortBy]);

  const loadUsers = () => {
    // Load users from leaderboard
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setUsers(leaderboard);
  };

  const filterAndSortUsers = () => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "score":
          return b.score - a.score;
        case "level":
          return b.level - a.level;
        case "joinDate":
          return (
            new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Yakin ingin menghapus pengguna ini?")) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("leaderboard", JSON.stringify(updatedUsers));
      alert("Pengguna berhasil dihapus");
    }
  };

  const handleResetProgress = (userId: string) => {
    if (confirm("Yakin ingin reset progress pengguna ini?")) {
      const updatedUsers = users.map((u) =>
        u.id === userId
          ? {
              ...u,
              score: 0,
              level: 1,
              quizzesCompleted: 0,
              totalQuestions: 0,
              correctAnswers: 0,
              accuracy: 0,
            }
          : u,
      );
      setUsers(updatedUsers);
      localStorage.setItem("leaderboard", JSON.stringify(updatedUsers));
      alert("Progress pengguna berhasil di-reset");
    }
  };

  const getLevelTitle = (level: number) => {
    if (level >= 18) return "Master";
    if (level >= 15) return "Expert";
    if (level >= 10) return "Advanced";
    if (level >= 5) return "Intermediate";
    return "Beginner";
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
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-georgia text-4xl text-historic-brown-dark mb-2">
                👥 Kelola Pengguna
              </h1>
              <p className="font-merriweather text-gray-600">
                Lihat dan kelola data pengguna sistem
              </p>
            </div>
            <Link
              to="/admin"
              className="px-6 py-2 border border-gray-300 rounded-lg font-quicksand hover:bg-gray-50"
            >
              ← Kembali ke Dashboard
            </Link>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                  Cari Pengguna
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari berdasarkan nama atau email..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-quicksand"
                />
              </div>
              <div>
                <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                  Urutkan Berdasarkan
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "name" | "score" | "level" | "joinDate",
                    )
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg font-quicksand"
                >
                  <option value="score">Skor Tertinggi</option>
                  <option value="name">Nama (A-Z)</option>
                  <option value="level">Level Tertinggi</option>
                  <option value="joinDate">Terbaru Bergabung</option>
                </select>
              </div>
            </div>
          </div>

          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <div className="font-quicksand text-3xl font-bold text-historic-brown">
                  {users.length}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Total Pengguna
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <div className="font-quicksand text-3xl font-bold text-historic-brown">
                  {users.filter((u) => u.quizzesCompleted > 0).length}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Pengguna Aktif
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <div className="font-quicksand text-3xl font-bold text-historic-brown">
                  {users.length > 0
                    ? Math.round(
                        users.reduce((sum, u) => sum + u.accuracy, 0) /
                          users.length,
                      )
                    : 0}
                  %
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Rata-rata Akurasi
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <div className="font-quicksand text-3xl font-bold text-historic-brown">
                  {users.length > 0
                    ? Math.round(
                        users.reduce((sum, u) => sum + u.quizzesCompleted, 0) /
                          users.length,
                      )
                    : 0}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Rata-rata Quiz
                </div>
              </div>
            </div>
          </div>

          {/* User List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-historic-brown text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-quicksand">
                      Pengguna
                    </th>
                    <th className="px-6 py-4 text-center font-quicksand">
                      Level
                    </th>
                    <th className="px-6 py-4 text-center font-quicksand">
                      Skor
                    </th>
                    <th className="px-6 py-4 text-center font-quicksand">
                      Quiz
                    </th>
                    <th className="px-6 py-4 text-center font-quicksand">
                      Akurasi
                    </th>
                    <th className="px-6 py-4 text-center font-quicksand">
                      Bergabung
                    </th>
                    <th className="px-6 py-4 text-center font-quicksand">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((userData, index) => (
                    <tr
                      key={userData.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-historic-cream transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-historic-brown rounded-full flex items-center justify-center text-white font-quicksand font-bold">
                            {userData.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-quicksand font-semibold text-gray-800">
                              {userData.name}
                            </div>
                            <div className="font-quicksand text-sm text-gray-600">
                              {userData.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-quicksand font-bold text-historic-brown">
                          {userData.level}
                        </div>
                        <div className="font-quicksand text-xs text-gray-600">
                          {getLevelTitle(userData.level)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-quicksand font-bold text-gray-800">
                          {userData.score.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-quicksand text-gray-800">
                          {userData.quizzesCompleted}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-quicksand text-gray-800">
                          {userData.accuracy}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-quicksand text-sm text-gray-600">
                          {new Date(userData.joinDate).toLocaleDateString(
                            "id-ID",
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => setSelectedUser(userData)}
                            className="px-3 py-1 bg-blue-600 text-white rounded font-quicksand text-sm hover:bg-blue-700"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => handleResetProgress(userData.id)}
                            className="px-3 py-1 bg-yellow-600 text-white rounded font-quicksand text-sm hover:bg-yellow-700"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => handleDeleteUser(userData.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded font-quicksand text-sm hover:bg-red-700"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">👤</div>
                  <p className="font-quicksand text-gray-600">
                    {searchTerm
                      ? "Tidak ada pengguna yang sesuai dengan pencarian"
                      : "Belum ada pengguna terdaftar"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Detail Modal */}
          {selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-quicksand text-xl font-bold text-gray-800">
                    👤 Detail Pengguna
                  </h3>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-historic-brown rounded-full flex items-center justify-center text-white font-quicksand font-bold text-2xl mx-auto mb-4">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <h4 className="font-quicksand text-xl font-bold text-gray-800">
                      {selectedUser.name}
                    </h4>
                    <p className="font-quicksand text-gray-600">
                      {selectedUser.email}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-historic-cream rounded-lg p-4 text-center">
                      <div className="font-quicksand text-2xl font-bold text-historic-brown">
                        {selectedUser.level}
                      </div>
                      <div className="font-quicksand text-sm text-gray-600">
                        Level ({getLevelTitle(selectedUser.level)})
                      </div>
                    </div>
                    <div className="bg-historic-cream rounded-lg p-4 text-center">
                      <div className="font-quicksand text-2xl font-bold text-historic-brown">
                        {selectedUser.score.toLocaleString()}
                      </div>
                      <div className="font-quicksand text-sm text-gray-600">
                        Total Poin
                      </div>
                    </div>
                    <div className="bg-historic-cream rounded-lg p-4 text-center">
                      <div className="font-quicksand text-2xl font-bold text-historic-brown">
                        {selectedUser.quizzesCompleted}
                      </div>
                      <div className="font-quicksand text-sm text-gray-600">
                        Quiz Diselesaikan
                      </div>
                    </div>
                    <div className="bg-historic-cream rounded-lg p-4 text-center">
                      <div className="font-quicksand text-2xl font-bold text-historic-brown">
                        {selectedUser.accuracy}%
                      </div>
                      <div className="font-quicksand text-sm text-gray-600">
                        Akurasi
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-quicksand font-bold text-gray-800 mb-2">
                      Informasi Lainnya
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-quicksand text-gray-600">
                          Total Pertanyaan:
                        </span>
                        <span className="font-quicksand text-gray-800">
                          {selectedUser.totalQuestions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-quicksand text-gray-600">
                          Jawaban Benar:
                        </span>
                        <span className="font-quicksand text-gray-800">
                          {selectedUser.correctAnswers}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-quicksand text-gray-600">
                          Bergabung:
                        </span>
                        <span className="font-quicksand text-gray-800">
                          {new Date(selectedUser.joinDate).toLocaleDateString(
                            "id-ID",
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-quicksand text-gray-600">
                          Terakhir Aktif:
                        </span>
                        <span className="font-quicksand text-gray-800">
                          {new Date(selectedUser.lastActive).toLocaleDateString(
                            "id-ID",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="w-full mt-6 px-4 py-2 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
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
            Panel Admin Historic Block - Kelola Pengguna
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminUsers;
