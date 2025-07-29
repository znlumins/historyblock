import Navbar from "@/components/Navbar";

const About = () => {
  const teamMembers = [
    {
      name: "Adenia Raesita",
      role: "Chief Executive Officer",
      email: "adeniaaresita@student.ub.ac.id",
      description:
        "Memimpin visi dan strategi pengembangan Historic Block sebagai platform edukasi sejarah yang inovatif.",
      avatar: "AR",
    },
    {
      name: "Aymardayanti Pagril",
      role: "Co-Founder",
      subtitle: "Head of Finance, Sales, and Marketing",
      email: "aymardayanti@student.ub.ac.id",
      description:
        "Bertanggung jawab dalam strategi pemasaran dan pengembangan bisnis Historic Block.",
      avatar: "AP",
    },
    {
      name: "Daffa Ahmad Al Attas",
      role: "Co-Founder",
      subtitle: "Head of Technology and Product Development",
      email: "daffaahmadlisch@student.ub.ac.id",
      description:
        "Memimpin pengembangan teknologi dan implementasi fitur-fitur inovatif dalam aplikasi.",
      avatar: "DA",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 border-2 border-[#ced4da] dark:border-gray-700 rounded-lg">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
      />

      <Navbar />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-r from-historic-cream-light to-historic-cream dark:from-gray-800 dark:to-gray-700 py-8 md:py-12 lg:py-20 px-4 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-block bg-historic-brown dark:bg-historic-yellow text-white dark:text-historic-brown px-6 md:px-8 py-2 md:py-3 rounded-full font-quicksand font-bold text-base md:text-lg mb-4 md:mb-6">
              🚀 Tim Pengembang
            </div>
            <h1 className="font-georgia text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-historic-brown-dark dark:text-historic-yellow mb-4 md:mb-6 leading-tight px-4">
              Tentang Historic Block
            </h1>
            <p className="font-merriweather text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-6 md:mb-8 px-4">
              Platform edukasi sejarah inovatif yang menggabungkan teknologi
              <span className="text-historic-brown dark:text-historic-yellow font-bold">
                {" "}
                AR (Augmented Reality){" "}
              </span>
              dengan gameplay interaktif untuk pengalaman belajar yang tak
              terlupakan.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm px-4">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <span className="text-gray-600 dark:text-gray-400">
                  📍 Universitas Brawijaya
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <span className="text-gray-600 dark:text-gray-400">
                  📅 2025
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <span className="text-gray-600 dark:text-gray-400">
                  👥 3 Anggota Tim
                </span>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4 text-center">🎯</div>
              <h2 className="font-quicksand text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-4 text-center">
                Misi Kami
              </h2>
              <p className="font-merriweather text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Membuat pembelajaran sejarah menjadi lebih menarik dan
                interaktif melalui teknologi modern, sehingga setiap orang dapat
                memahami dan menghargai warisan sejarah dengan cara yang fun dan
                engaging.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4 text-center">🌟</div>
              <h2 className="font-quicksand text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-4 text-center">
                Visi Kami
              </h2>
              <p className="font-merriweather text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Menjadi platform edukasi sejarah terdepan yang menginspirasi
                generasi muda untuk mencintai dan melestarikan sejarah bangsa
                melalui pengalaman belajar yang inovatif dan teknologi terdepan.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="font-georgia text-4xl md:text-5xl text-historic-brown-dark dark:text-historic-yellow mb-6">
                Meet The Team
              </h2>
              <p className="font-merriweather text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Tim passionate yang berdedikasi untuk merevolusi cara belajar
                sejarah melalui teknologi dan inovasi.
              </p>
            </div>

            {/* Team Members Cards with enhanced design - Adenia di tengah */}
            <div className="flex flex-wrap justify-center gap-8">
              {/* Adenia (CEO) - Always centered */}
              <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 w-full max-w-sm">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-historic-yellow dark:bg-historic-brown opacity-10 rounded-full -translate-y-4 translate-x-4"></div>

                {/* Avatar with enhanced styling */}
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-historic-brown to-historic-brown-dark dark:from-historic-yellow dark:to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white dark:text-historic-brown font-quicksand font-bold text-2xl">
                    AR
                  </span>
                </div>

                {/* Name & Role with better hierarchy */}
                <div className="text-center mb-6">
                  <h3 className="font-georgia text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-2">
                    Adenia Raesita
                  </h3>
                  <div className="inline-block bg-historic-brown dark:bg-historic-yellow text-white dark:text-historic-brown px-4 py-1 rounded-full font-quicksand font-semibold text-sm mb-2">
                    Chief Executive Officer
                  </div>
                </div>

                {/* Description with better spacing */}
                <p className="font-merriweather text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center">
                  Memimpin visi dan strategi pengembangan Historic Block sebagai
                  platform edukasi sejarah yang inovatif.
                </p>

                {/* Email with enhanced styling */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                  <a
                    href="mailto:adeniaaresita@student.ub.ac.id"
                    className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-historic-cream dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-quicksand text-historic-brown dark:text-historic-yellow hover:text-historic-brown-dark dark:hover:text-yellow-300 transition-all duration-200 group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      📧
                    </span>
                    <span className="font-semibold">
                      adeniaaresita@student.ub.ac.id
                    </span>
                  </a>
                </div>
              </div>

              {/* Co-Founders Row */}
              <div className="w-full flex flex-wrap justify-center gap-8 lg:gap-12">
                {/* Aymardayanti */}
                <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 w-full max-w-sm">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-historic-yellow dark:bg-historic-brown opacity-10 rounded-full -translate-y-4 translate-x-4"></div>

                  {/* Avatar with enhanced styling */}
                  <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-historic-brown to-historic-brown-dark dark:from-historic-yellow dark:to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white dark:text-historic-brown font-quicksand font-bold text-2xl">
                      AP
                    </span>
                  </div>

                  {/* Name & Role with better hierarchy */}
                  <div className="text-center mb-6">
                    <h3 className="font-georgia text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-2">
                      Aymardayanti Pagril
                    </h3>
                    <div className="inline-block bg-historic-brown dark:bg-historic-yellow text-white dark:text-historic-brown px-4 py-1 rounded-full font-quicksand font-semibold text-sm mb-2">
                      Co-Founder
                    </div>
                    <div className="font-quicksand text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Head of Finance, Sales, and Marketing
                    </div>
                  </div>

                  {/* Description with better spacing */}
                  <p className="font-merriweather text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center">
                    Bertanggung jawab dalam strategi pemasaran dan pengembangan
                    bisnis Historic Block.
                  </p>

                  {/* Email with enhanced styling */}
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                    <a
                      href="mailto:aymardayanti@student.ub.ac.id"
                      className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-historic-cream dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-quicksand text-historic-brown dark:text-historic-yellow hover:text-historic-brown-dark dark:hover:text-yellow-300 transition-all duration-200 group"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">
                        📧
                      </span>
                      <span className="font-semibold">
                        aymardayanti@student.ub.ac.id
                      </span>
                    </a>
                  </div>
                </div>

                {/* Daffa */}
                <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 w-full max-w-sm">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-historic-yellow dark:bg-historic-brown opacity-10 rounded-full -translate-y-4 translate-x-4"></div>

                  {/* Avatar with enhanced styling */}
                  <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-historic-brown to-historic-brown-dark dark:from-historic-yellow dark:to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white dark:text-historic-brown font-quicksand font-bold text-2xl">
                      DA
                    </span>
                  </div>

                  {/* Name & Role with better hierarchy */}
                  <div className="text-center mb-6">
                    <h3 className="font-georgia text-2xl font-bold text-historic-brown-dark dark:text-historic-yellow mb-2">
                      Daffa Ahmad Al Attas
                    </h3>
                    <div className="inline-block bg-historic-brown dark:bg-historic-yellow text-white dark:text-historic-brown px-4 py-1 rounded-full font-quicksand font-semibold text-sm mb-2">
                      Co-Founder
                    </div>
                    <div className="font-quicksand text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Head of Technology and Product Development
                    </div>
                  </div>

                  {/* Description with better spacing */}
                  <p className="font-merriweather text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center">
                    Memimpin pengembangan teknologi dan implementasi fitur-fitur
                    inovatif dalam aplikasi.
                  </p>

                  {/* Email with enhanced styling */}
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                    <a
                      href="mailto:daffaahmadlisch@student.ub.ac.id"
                      className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-historic-cream dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-quicksand text-historic-brown dark:text-historic-yellow hover:text-historic-brown-dark dark:hover:text-yellow-300 transition-all duration-200 group"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">
                        📧
                      </span>
                      <span className="font-semibold">
                        daffaahmadlisch@student.ub.ac.id
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Highlight with enhanced design */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-historic-brown to-historic-brown-dark dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-12">
                <h2 className="font-georgia text-4xl md:text-5xl text-white dark:text-historic-yellow mb-4">
                  Fitur Unggulan
                </h2>
                <p className="font-merriweather text-xl text-historic-cream-light dark:text-gray-300 max-w-3xl mx-auto">
                  Teknologi terdepan yang membuat belajar sejarah menjadi
                  petualangan yang tak terlupakan
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "📱",
                    title: "AR Scanner",
                    desc: "Teknologi AR cutting-edge untuk memindai kartu Historic Block dan membuka dunia sejarah yang interaktif",
                    gradient: "from-blue-500 to-purple-600",
                  },
                  {
                    icon: "🎯",
                    title: "Quiz Interaktif",
                    desc: "Kuis sejarah adaptif dengan AI-powered difficulty adjustment dan sistem reward yang engaging",
                    gradient: "from-green-500 to-teal-600",
                  },
                  {
                    icon: "🏆",
                    title: "Leaderboard",
                    desc: "Kompetisi global real-time dengan achievements, badges, dan social features yang motivatif",
                    gradient: "from-yellow-500 to-orange-600",
                  },
                  {
                    icon: "♿",
                    title: "Aksesibilitas",
                    desc: "Inclusive design dengan fitur-fitur accessibility yang komprehensif untuk semua pengguna",
                    gradient: "from-pink-500 to-red-600",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3"
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                    <h3 className="font-quicksand font-bold text-xl text-historic-brown-dark dark:text-historic-yellow mb-3 text-center">
                      {feature.title}
                    </h3>
                    <p className="font-merriweather text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Support with enhanced CTA design */}
          <div className="relative">
            {/* Background with gradient and pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-historic-brown via-historic-brown-dark to-historic-brown dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-400 rounded-full"></div>
              <div className="absolute top-1/2 right-20 w-8 h-8 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10 p-12 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-georgia text-4xl md:text-5xl text-white dark:text-historic-yellow mb-6">
                  Mari Berkolaborasi!
                </h2>
                <p className="font-merriweather text-xl text-historic-cream-light dark:text-gray-300 mb-10 leading-relaxed">
                  Punya ide untuk Historic Block? Atau ingin bergabung dalam
                  misi kami merevolusi pendidikan sejarah? Mari berkolaborasi!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <a
                    href="mailto:adeniaaresita@student.ub.ac.id"
                    className="group bg-white dark:bg-gray-800 text-historic-brown dark:text-historic-yellow px-8 py-6 rounded-2xl font-quicksand font-bold hover:bg-historic-yellow dark:hover:bg-historic-yellow hover:text-historic-brown dark:hover:text-historic-brown transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      📧
                    </div>
                    <div className="text-lg">Email Tim</div>
                    <div className="text-sm opacity-75 mt-1">
                      Diskusi & Kolaborasi
                    </div>
                  </a>
                  <a
                    href="https://ub.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white dark:bg-gray-800 text-historic-brown dark:text-historic-yellow px-8 py-6 rounded-2xl font-quicksand font-bold hover:bg-historic-yellow dark:hover:bg-historic-yellow hover:text-historic-brown dark:hover:text-historic-brown transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      🏫
                    </div>
                    <div className="text-lg">Universitas Brawijaya</div>
                    <div className="text-sm opacity-75 mt-1">
                      Institusi Kami
                    </div>
                  </a>
                  <a
                    href="/tutorial"
                    className="group bg-white dark:bg-gray-800 text-historic-brown dark:text-historic-yellow px-8 py-6 rounded-2xl font-quicksand font-bold hover:bg-historic-yellow dark:hover:bg-historic-yellow hover:text-historic-brown dark:hover:text-historic-brown transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      📖
                    </div>
                    <div className="text-lg">Tutorial</div>
                    <div className="text-sm opacity-75 mt-1">
                      Panduan Lengkap
                    </div>
                  </a>
                </div>

                {/* Social proof / testimonial style element */}
                <div className="bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-30 rounded-2xl p-6 backdrop-blur-sm">
                  <p className="font-merriweather text-historic-cream-light dark:text-gray-300 italic text-lg">
                    "Historic Block - Menghidupkan kembali sejarah melalui
                    teknologi, satu kartu AR dalam sekali waktu."
                  </p>
                  <div className="mt-4 text-historic-yellow-light dark:text-yellow-300 font-quicksand font-bold">
                    - Tim Historic Block 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-historic-brown dark:bg-gray-800 border-t-4 border-historic-brown-dark dark:border-gray-600 py-6 md:py-9 px-4 md:px-8 lg:px-36">
        <div className="max-w-6xl mx-auto text-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c339a674deb6423c5cd64cac74684504d5ed5944?placeholderIfAbsent=true"
            alt="HISTORIC BLOCK"
            className="w-[62px] h-[62px] mx-auto mb-4"
          />
          <p className="font-merriweather text-historic-cream-light dark:text-gray-300">
            Dikembangkan dengan ❤️ oleh Tim Historic Block - Universitas
            Brawijaya
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
