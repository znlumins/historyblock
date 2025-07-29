import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Email atau password salah");
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
            Masuk ke Historic Block
          </h2>
          <p className="mt-2 font-quicksand text-gray-600">
            Lanjutkan perjalanan belajar sejarah Anda
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm font-quicksand">{error}</p>
              </div>
            )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-historic-brown focus:border-transparent"
                placeholder="daffa@historic.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-historic-brown focus:border-transparent pr-12"
                  placeholder="Masukkan password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-historic-brown focus:ring-historic-brown border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-quicksand text-gray-700"
                >
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-quicksand text-historic-brown hover:text-historic-brown-dark"
                >
                  Lupa password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-historic-brown-dark hover:bg-historic-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-historic-brown font-quicksand font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Masuk...
                </div>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-quicksand text-gray-600 mb-2">
              Demo Accounts:
            </p>
            <div className="text-xs font-quicksand text-gray-500 space-y-1">
              <div>📧 daffa@historic.com | 🔑 password123 (Level 15)</div>
              <div>📧 adenia@historic.com | 🔑 adenia123 (Level 11)</div>
              <div>📧 aymarda@historic.com | 🔑 aymarda123 (Level 12)</div>
              <div>📧 admin@historic.com | 🔑 admin123 (Admin)</div>
              <div>📧 user@test.com | 🔑 test123 (Level 5)</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-quicksand text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-historic-brown font-semibold hover:text-historic-brown-dark"
              >
                Daftar sekarang
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

export default Login;
