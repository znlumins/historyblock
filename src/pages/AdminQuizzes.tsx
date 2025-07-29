import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { quizDatabase, Quiz, QuizQuestion } from "@/data/quizData";

const AdminQuizzes = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(
    null,
  );
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    era: "Kemerdekaan",
    difficulty: "Mudah" as "Mudah" | "Sedang" | "Sulit" | "Expert",
  });

  useEffect(() => {
    setQuizzes(quizDatabase);
  }, []);

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

  const handleAddQuestion = (quizId: string) => {
    alert(`Fungsi tambah pertanyaan untuk quiz ${quizId} akan diimplementasi`);
  };

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setShowEditQuestion(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm("Yakin ingin menghapus pertanyaan ini?")) {
      alert(`Pertanyaan ${questionId} akan dihapus`);
    }
  };

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
                📝 Kelola Kuis
              </h1>
              <p className="font-merriweather text-gray-600">
                Tambah, edit, atau hapus kuis dan pertanyaan
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/admin"
                className="px-6 py-2 border border-gray-300 rounded-lg font-quicksand hover:bg-gray-50"
              >
                ← Kembali ke Dashboard
              </Link>
              <button
                onClick={() => setShowAddQuiz(true)}
                className="px-6 py-2 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark"
              >
                + Tambah Kuis Baru
              </button>
            </div>
          </div>

          {/* Quiz List */}
          <div className="grid gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark mb-2">
                      {quiz.title}
                    </h3>
                    <p className="font-quicksand text-gray-600 mb-3">
                      {quiz.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-historic-cream px-3 py-1 rounded-full font-quicksand">
                        {quiz.era}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full font-quicksand">
                        {quiz.difficulty}
                      </span>
                      <span className="bg-green-100 px-3 py-1 rounded-full font-quicksand text-green-700">
                        {quiz.questions.length} pertanyaan
                      </span>
                      <span className="bg-blue-100 px-3 py-1 rounded-full font-quicksand text-blue-700">
                        {quiz.totalPoints} poin
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setSelectedQuiz(
                          selectedQuiz?.id === quiz.id ? null : quiz,
                        )
                      }
                      className="px-4 py-2 bg-historic-yellow text-historic-brown-dark rounded-lg font-quicksand hover:bg-historic-yellow-light"
                    >
                      {selectedQuiz?.id === quiz.id ? "Tutup" : "Lihat Detail"}
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-quicksand hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-quicksand hover:bg-red-700">
                      Hapus
                    </button>
                  </div>
                </div>

                {/* Quiz Details */}
                {selectedQuiz?.id === quiz.id && (
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-quicksand text-lg font-bold text-gray-800">
                        Daftar Pertanyaan
                      </h4>
                      <button
                        onClick={() => handleAddQuestion(quiz.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-quicksand hover:bg-green-700"
                      >
                        + Tambah Pertanyaan
                      </button>
                    </div>

                    <div className="space-y-4">
                      {quiz.questions.map((question, index) => (
                        <div
                          key={question.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="bg-historic-brown text-white px-2 py-1 rounded text-sm font-quicksand">
                                  {index + 1}
                                </span>
                                <span className="bg-gray-200 px-2 py-1 rounded text-sm font-quicksand">
                                  {question.difficulty}
                                </span>
                                <span className="bg-yellow-200 px-2 py-1 rounded text-sm font-quicksand">
                                  {question.points} poin
                                </span>
                              </div>
                              <h5 className="font-quicksand font-semibold text-gray-800 mb-2">
                                {question.question}
                              </h5>
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                {question.options.map((option, optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className={`text-sm p-2 rounded ${
                                      optionIndex === question.correctAnswer
                                        ? "bg-green-100 text-green-800 font-semibold"
                                        : "bg-white"
                                    }`}
                                  >
                                    {optionIndex === question.correctAnswer &&
                                      "✅ "}
                                    {option}
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-gray-600 font-quicksand">
                                <strong>Penjelasan:</strong>{" "}
                                {question.explanation}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleEditQuestion(question)}
                                className="px-3 py-1 bg-blue-600 text-white rounded font-quicksand text-sm hover:bg-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteQuestion(question.id)
                                }
                                className="px-3 py-1 bg-red-600 text-white rounded font-quicksand text-sm hover:bg-red-700"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Quiz Modal */}
          {showAddQuiz && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
                <h3 className="font-quicksand text-xl font-bold text-gray-800 mb-6">
                  📝 Tambah Kuis Baru
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                      Judul Kuis
                    </label>
                    <input
                      type="text"
                      value={newQuiz.title}
                      onChange={(e) =>
                        setNewQuiz({ ...newQuiz, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-quicksand"
                      placeholder="Masukkan judul kuis..."
                    />
                  </div>
                  <div>
                    <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={newQuiz.description}
                      onChange={(e) =>
                        setNewQuiz({ ...newQuiz, description: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-quicksand"
                      rows={3}
                      placeholder="Masukkan deskripsi kuis..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                        Era
                      </label>
                      <select
                        value={newQuiz.era}
                        onChange={(e) =>
                          setNewQuiz({ ...newQuiz, era: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-quicksand"
                      >
                        <option>Kemerdekaan</option>
                        <option>Hindu-Buddha</option>
                        <option>Kolonial</option>
                        <option>Pra-Sejarah</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                        Tingkat Kesulitan
                      </label>
                      <select
                        value={newQuiz.difficulty}
                        onChange={(e) =>
                          setNewQuiz({
                            ...newQuiz,
                            difficulty: e.target.value as
                              | "Mudah"
                              | "Sedang"
                              | "Sulit"
                              | "Expert",
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-quicksand"
                      >
                        <option>Mudah</option>
                        <option>Sedang</option>
                        <option>Sulit</option>
                        <option>Expert</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddQuiz(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-quicksand hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      alert("Fungsi tambah kuis akan diimplementasi");
                      setShowAddQuiz(false);
                    }}
                    className="flex-1 px-4 py-2 bg-historic-brown text-white rounded-lg font-quicksand hover:bg-historic-brown-dark"
                  >
                    Simpan Kuis
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-quicksand text-xl font-bold text-historic-brown-dark mb-6">
              📊 Statistik Kuis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="font-quicksand text-2xl font-bold text-historic-brown">
                  {quizzes.length}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Total Kuis
                </div>
              </div>
              <div className="text-center">
                <div className="font-quicksand text-2xl font-bold text-historic-brown">
                  {quizzes.reduce(
                    (sum, quiz) => sum + quiz.questions.length,
                    0,
                  )}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Total Pertanyaan
                </div>
              </div>
              <div className="text-center">
                <div className="font-quicksand text-2xl font-bold text-historic-brown">
                  {quizzes.reduce((sum, quiz) => sum + quiz.totalPoints, 0)}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Total Poin
                </div>
              </div>
              <div className="text-center">
                <div className="font-quicksand text-2xl font-bold text-historic-brown">
                  {Math.round(
                    quizzes.reduce((sum, quiz) => sum + quiz.timeLimit, 0) / 60,
                  )}
                </div>
                <div className="font-quicksand text-sm text-gray-600">
                  Total Menit
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
            Panel Admin Historic Block - Kelola Kuis
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminQuizzes;
