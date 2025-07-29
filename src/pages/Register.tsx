import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return "Semua field harus diisi";
    }

    if (formData.name.length < 3) {
      return "Nama minimal 3 karakter";
    }

    if (!formData.email.includes("@")) {
      return "Format email tidak valid";
    }

    if (formData.password.length < 6) {
      return "Password minimal 6 karakter";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Konfirmasi password tidak cocok";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
      );
      if (success) {
        navigate("/");
      } else {
        setError("Gagal membuat akun. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-historic-cream-light to-historic-cream py-12 px-4">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/507170e63ed72fa0abf94c821deabb0a1109b706?placeholderIfAbsent=true"
            alt="HISTORIC BLOCK"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="font-georgia text-3xl text-historic-brown-dark">
            Bergabung dengan Historic Block
          </h2>
          <p className="mt-2 font-quicksand text-gray-600">
            Mulai perjalanan belajar sejarah yang menyenangkan
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm font-quicksand">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block font-quicksand font-semibold text-gray-700 mb-2"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-historic-brown focus:border-transparent"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-quicksand font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-historic-brown focus:border-transparent"
                placeholder="contoh@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-quicksand font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-historic-brown focus:border-transparent pr-12"
                  placeholder="Minimal 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-quicksand font-semibold text-gray-700 mb-2"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-historic-brown focus:border-transparent pr-12"
                  placeholder="Ulangi password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-historic-brown focus:ring-historic-brown border-gray-300 rounded"
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm font-quicksand text-gray-700"
              >
                Saya setuju dengan{" "}
                <a
                  href="#"
                  className="text-historic-brown hover:text-historic-brown-dark"
                >
                  Syarat & Ketentuan
                </a>{" "}
                dan{" "}
                <a
                  href="#"
                  className="text-historic-brown hover:text-historic-brown-dark"
                >
                  Kebijakan Privasi
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-historic-brown-dark hover:bg-historic-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-historic-brown font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Membuat Akun...
                </div>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-quicksand text-gray-600">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-historic-brown font-semibold hover:text-historic-brown-dark"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="font-quicksand text-historic-brown hover:text-historic-brown-dark"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
