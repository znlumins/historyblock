import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Smartphone, BookOpen, Target, Flag, Crown, Swords, BarChart3, Award, TrendingUp, Users, Play, Book, X, Gamepad2, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";

const Kuis = () => {
  const navigate = useNavigate();
  const [detectedCard, setDetectedCard] = useState(null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showManualQuizDialog, setShowManualQuizDialog] = useState(false);

  const handleARScan = () => {
    navigate("/ar-scan");
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

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "white",
    },
    overlay: {
      position: "fixed" as const,
      inset: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "32px",
      maxWidth: "768px",
      margin: "16px",
      maxHeight: "90vh",
      overflowY: "auto" as const,
    },
    modalSmall: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "32px",
      maxWidth: "512px",
      margin: "16px",
    },
    modalCenter: {
      textAlign: "center" as const,
      marginBottom: "24px",
    },
    modalIcon: {
      marginBottom: "16px",
      display: "flex",
      justifyContent: "center",
    },
    modalTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "8px",
    },
    modalDescription: {
      color: "#4b5563",
    },
    sectionTitle: {
      fontSize: "1.125rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    grid: {
      display: "grid",
      gap: "16px",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    },
    quizCard: {
      padding: "16px",
      border: "2px solid #fbbf24",
      borderRadius: "8px",
      textAlign: "left" as const,
      transition: "border-color 0.2s",
      backgroundColor: "#fefce8",
      cursor: "pointer",
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    cardTitle: {
      fontWeight: "700",
      color: "#1f2937",
    },
    cardSubtitle: {
      fontSize: "0.875rem",
      color: "#4b5563",
    },
    cardMeta: {
      fontSize: "0.75rem",
      color: "#6b7280",
    },
    divider: {
      borderTop: "1px solid #e5e7eb",
      margin: "24px 0",
    },
    buttonPrimary: {
      backgroundColor: "#eab308",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      fontWeight: "600",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    buttonSecondary: {
      backgroundColor: "transparent",
      color: "#374151",
      padding: "12px 24px",
      borderRadius: "8px",
      fontWeight: "400",
      border: "1px solid #d1d5db",
      cursor: "pointer",
      transition: "background-color 0.2s",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    buttonFull: {
      width: "100%",
      marginTop: "24px",
      justifyContent: "center",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
    },
    mainContent: {
      padding: "64px 16px",
      backgroundColor: "#f9fafb",
    },
    contentContainer: {
      maxWidth: "1024px",
      margin: "0 auto",
    },
    pageTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px",
      textAlign: "center" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
    },
    pageDescription: {
      fontSize: "1.125rem",
      color: "#4b5563",
      maxWidth: "512px",
      margin: "0 auto",
      textAlign: "center" as const,
    },
    optionsGrid: {
      display: "grid",
      gap: "32px",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      marginBottom: "48px",
    },
    optionCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "32px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      textAlign: "center" as const,
      border: "2px solid #fbbf24",
      transition: "border-color 0.2s",
    },
    optionCardSecondary: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "32px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      textAlign: "center" as const,
      border: "2px solid #e5e7eb",
      transition: "border-color 0.2s",
    },
    optionIcon: {
      marginBottom: "16px",
      display: "flex",
      justifyContent: "center",
    },
    optionTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px",
    },
    optionDescription: {
      color: "#4b5563",
      marginBottom: "24px",
    },
    featureList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
      marginBottom: "24px",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      fontSize: "0.875rem",
      color: "#4b5563",
      gap: "8px",
    },
    statsCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    statsTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px",
      textAlign: "center" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "16px",
      textAlign: "center" as const,
    },
    statItem: {
      backgroundColor: "#f3f4f6",
      borderRadius: "8px",
      padding: "16px",
    },
    statValue: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
    },
    statLabel: {
      fontSize: "0.875rem",
      color: "#4b5563",
    },
    footer: {
      backgroundColor: "#1f2937",
      color: "white",
      padding: "32px 16px",
    },
    footerContainer: {
      maxWidth: "1536px",
      margin: "0 auto",
      textAlign: "center" as const,
    },
    footerTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px",
    },
    footerSubtitle: {
      color: "#9ca3af",
      marginBottom: "16px",
    },
    footerLink: {
      color: "#9ca3af",
      textDecoration: "underline",
      transition: "color 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />

      {/* Manual Quiz Selection Dialog */}
      {showManualQuizDialog && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalCenter}>
              <div style={styles.modalIcon}>
                <BookOpen size={64} color="#8b4513" />
              </div>
              <h3 style={styles.modalTitle}>
                Pilih Quiz Manual
              </h3>
              <p style={styles.modalDescription}>
                Pilih quiz berdasarkan era atau tingkat kesulitan
              </p>
            </div>

            {/* Kuis yang Sudah Discan */}
            {getScannedQuizzes().length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h4 style={styles.sectionTitle}>
                  <Smartphone size={20} />
                  Kuis yang Sudah Discan ({getScannedQuizzes().length})
                </h4>
                <div style={styles.grid}>
                  {getScannedQuizzes().map((quiz, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setShowManualQuizDialog(false);
                        navigate(`/quiz/${quiz.id.replace("hc", "quiz-")}`);
                      }}
                      style={styles.quizCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#f97316";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#fbbf24";
                      }}
                    >
                      <div style={styles.cardContent}>
                        <Target size={24} color="#8b4513" />
                        <div>
                          <h5 style={styles.cardTitle}>
                            {quiz.name}
                          </h5>
                          <p style={styles.cardSubtitle}>
                            {quiz.era} • {quiz.difficulty} • Discan{" "}
                            {quiz.timesScanned} kali
                          </p>
                          <p style={styles.cardMeta}>
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
                <div style={styles.divider}></div>
              </div>
            )}

            {/* Kuis Manual */}
            {getScannedQuizzes().length > 0 ? (
              <div>
                <h4 style={styles.sectionTitle}>
                  <Book size={20} />
                  Kuis Lainnya yang Tersedia
                </h4>
                <div style={styles.grid}>
                  <button
                    onClick={() => {
                      setShowManualQuizDialog(false);
                      navigate("/quiz/quiz-proklamasi");
                    }}
                    style={styles.quizCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#f97316";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#fbbf24";
                    }}
                  >
                    <div style={styles.cardContent}>
                      <Flag size={24} color="#dc2626" />
                      <div>
                        <h4 style={styles.cardTitle}>
                          Proklamasi Kemerdekaan
                        </h4>
                        <p style={styles.cardSubtitle}>
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
                    style={styles.quizCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#f97316";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#fbbf24";
                    }}
                  >
                    <div style={styles.cardContent}>
                      <Crown size={24} color="#facc15" />
                      <div>
                        <h4 style={styles.cardTitle}>
                          Kerajaan Majapahit
                        </h4>
                        <p style={styles.cardSubtitle}>
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
                    style={styles.quizCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#f97316";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#fbbf24";
                    }}
                  >
                    <div style={styles.cardContent}>
                      <Swords size={24} color="#7c2d12" />
                      <div>
                        <h4 style={styles.cardTitle}>
                          Perang Diponegoro
                        </h4>
                        <p style={styles.cardSubtitle}>
                          Era Kolonial • Sulit • 1000 poin
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={styles.modalIcon}>
                  <Smartphone size={64} color="#8b4513" />
                </div>
                <h4 style={styles.modalTitle}>
                  Scan Kartu Historic Block Dulu!
                </h4>
                <p style={styles.modalDescription}>
                  Untuk mengakses kuis manual, kamu perlu scan kartu Historic
                  Block terlebih dahulu menggunakan AR Scanner.
                </p>
                <button
                  onClick={() => {
                    setShowManualQuizDialog(false);
                    handleARScan();
                  }}
                  style={{ ...styles.buttonPrimary, marginTop: "16px" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ca8a04";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#eab308";
                  }}
                >
                  <Target size={16} />
                  Mulai AR Scan
                </button>
              </div>
            )}

            <button
              onClick={() => setShowManualQuizDialog(false)}
              style={{ ...styles.buttonSecondary, ...styles.buttonFull }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <X size={16} />
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Quiz Detection Dialog */}
      {showQuizDialog && detectedCard && (
        <div style={styles.overlay}>
          <div style={styles.modalSmall}>
            <div style={styles.modalCenter}>
              <div style={styles.modalIcon}>
                <Target size={64} color="#16a34a" />
              </div>
              <h3 style={styles.modalTitle}>
                Kartu Terdeteksi!
              </h3>
              <div style={{ backgroundColor: "#f3f4f6", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1f2937" }}>
                  {detectedCard.name}
                </h4>
                <p style={{ color: "#4b5563", marginTop: "4px" }}>
                  Era: {detectedCard.era}
                </p>
                <p style={{ color: "#4b5563" }}>
                  Tingkat: {detectedCard.difficulty}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#374151", marginTop: "8px" }}>
                  {detectedCard.description}
                </p>
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <p style={styles.modalDescription}>
                Apakah Anda siap memulai kuis berdasarkan kartu ini?
              </p>
            </div>

            <div style={styles.buttonGroup}>
              <button
                onClick={() => setShowQuizDialog(false)}
                style={styles.buttonSecondary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <X size={16} />
                Nanti
              </button>
              <button
                onClick={handleStartQuiz}
                style={styles.buttonPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ca8a04";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#eab308";
                }}
              >
                <Play size={16} />
                Mulai Kuis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentContainer}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h1 style={styles.pageTitle}>
              <Gamepad2 size={40} color="#8b4513" />
              Kuis Historic Block
            </h1>
            <p style={styles.pageDescription}>
              Mulai petualangan sejarah Anda! Gunakan AR untuk memindai kartu
              atau pilih kuis manual.
            </p>
          </div>

          <div style={styles.optionsGrid}>
            {/* AR Scan Option */}
            <div 
              style={styles.optionCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#f97316";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#fbbf24";
              }}
            >
              <div style={styles.optionIcon}>
                <Camera size={64} color="#8b4513" />
              </div>
              <h2 style={styles.optionTitle}>
                AR Scan Kartu
              </h2>
              <p style={styles.optionDescription}>
                Gunakan kamera untuk memindai kartu Historic Block dan mulai
                kuis otomatis
              </p>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <Target size={16} color="#16a34a" />
                  Deteksi kartu otomatis
                </div>
                <div style={styles.featureItem}>
                  <BookOpen size={16} color="#16a34a" />
                  Kuis disesuaikan dengan kartu
                </div>
                <div style={styles.featureItem}>
                  <Smartphone size={16} color="#16a34a" />
                  Pengalaman interaktif
                </div>
              </div>
              <button
                onClick={handleARScan}
                style={{ ...styles.buttonPrimary, width: "100%" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ca8a04";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#eab308";
                }}
              >
                <Target size={16} />
                Mulai AR Scan
              </button>
            </div>

            {/* Manual Quiz Option */}
            <div 
              style={styles.optionCardSecondary}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#fbbf24";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div style={styles.optionIcon}>
                <BookOpen size={64} color="#8b4513" />
              </div>
              <h2 style={styles.optionTitle}>
                Kuis Manual
              </h2>
              <p style={styles.optionDescription}>
                Pilih sendiri topik dan tingkat kesulitan kuis sejarah yang
                ingin dimainkan
              </p>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <Book size={16} color="#16a34a" />
                  Pilih topik sendiri
                </div>
                <div style={styles.featureItem}>
                  <BarChart3 size={16} color="#16a34a" />
                  Berbagai tingkat kesulitan
                </div>
                <div style={styles.featureItem}>
                  <Award size={16} color="#16a34a" />
                  Akses semua materi
                </div>
              </div>
              <button
                onClick={() => setShowManualQuizDialog(true)}
                style={{ 
                  ...styles.buttonSecondary, 
                  width: "100%",
                  backgroundColor: "#6b7280",
                  color: "white",
                  borderColor: "#6b7280",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4b5563";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#6b7280";
                }}
              >
                <BookOpen size={16} />
                Pilih Kuis Manual
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={styles.statsCard}>
            <h3 style={styles.statsTitle}>
              <BarChart3 size={20} />
              Statistik Cepat
            </h3>
            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <div style={styles.statValue}>15</div>
                <div style={styles.statLabel}>Kuis Selesai</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>85%</div>
                <div style={styles.statLabel}>Akurasi</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>1,250</div>
                <div style={styles.statLabel}>Total Poin</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>#5</div>
                <div style={styles.statLabel}>Ranking</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <p style={styles.footerTitle}>Historic Block</p>
          <p style={styles.footerSubtitle}>
            Belajar sejarah dengan cara yang menyenangkan
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "24px", fontSize: "14px" }}>
            <Link 
              to="/about" 
              style={styles.footerLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Kuis;
