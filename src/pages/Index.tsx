import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const Index = () => {
  const { isAuthenticated } = useAuth();

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "white",
    },
    heroSection: {
      padding: "80px 16px",
      background: "linear-gradient(to right, #fffbeb, #fef3c7)",
    },
    heroContainer: {
      maxWidth: "1024px",
      margin: "0 auto",
      textAlign: "center" as const,
    },
    heroTitle: {
      fontSize: "3rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "24px",
      lineHeight: "1.2",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      color: "#4b5563",
      marginBottom: "32px",
      maxWidth: "512px",
      margin: "0 auto 32px auto",
      lineHeight: "1.6",
    },
    buttonContainer: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      flexWrap: "wrap" as const,
    },
    primaryButton: {
      display: "inline-block",
      backgroundColor: "#eab308",
      color: "white",
      padding: "12px 32px",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "600",
      textDecoration: "none",
      transition: "background-color 0.2s",
    },
    secondaryButton: {
      display: "inline-block",
      backgroundColor: "white",
      color: "#eab308",
      border: "1px solid #eab308",
      padding: "12px 32px",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "600",
      textDecoration: "none",
      transition: "background-color 0.2s",
    },
    featuresSection: {
      padding: "64px 16px",
      backgroundColor: "white",
    },
    featuresContainer: {
      maxWidth: "1536px",
      margin: "0 auto",
    },
    featuresTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      textAlign: "center" as const,
      color: "#1f2937",
      marginBottom: "48px",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "32px",
    },
    featureCard: {
      textAlign: "center" as const,
      padding: "24px",
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
    },
    featureIcon: {
      fontSize: "3rem",
      marginBottom: "16px",
    },
    featureTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "8px",
    },
    featureDescription: {
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
    },
  };

  // Media queries simulation for responsive design
  const isMobile = window.innerWidth < 768;

  const mobileStyles = {
    heroTitle: {
      ...styles.heroTitle,
      fontSize: isMobile ? "2rem" : "3rem",
    },
    heroSubtitle: {
      ...styles.heroSubtitle,
      fontSize: isMobile ? "1rem" : "1.25rem",
    },
    buttonContainer: {
      ...styles.buttonContainer,
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
      alignItems: "center",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <h1 style={mobileStyles.heroTitle}>🏛️ Historic Block</h1>
          <p style={mobileStyles.heroSubtitle}>
            Belajar sejarah Indonesia dengan cara yang menyenangkan! Mainkan
            kuis interaktif dan tes pengetahuan sejarahmu.
          </p>

          <div style={mobileStyles.buttonContainer}>
            {isAuthenticated ? (
              <Link
                to="/kuis"
                style={styles.primaryButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ca8a04";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#eab308";
                }}
              >
                🎯 Mulai Kuis
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  style={styles.primaryButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ca8a04";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#eab308";
                  }}
                >
                  📝 Daftar Sekarang
                </Link>
                <Link
                  to="/login"
                  style={styles.secondaryButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fef3c7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  🚪 Masuk
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresContainer}>
          <h2 style={styles.featuresTitle}>✨ Fitur Unggulan</h2>

          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📱</div>
              <h3 style={styles.featureTitle}>AR Scanner</h3>
              <p style={styles.featureDescription}>
                Scan kartu Historic Block untuk memulai kuis
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📚</div>
              <h3 style={styles.featureTitle}>Kuis Manual</h3>
              <p style={styles.featureDescription}>
                Pilih topik dan tingkat kesulitan sendiri
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🏆</div>
              <h3 style={styles.featureTitle}>Leaderboard</h3>
              <p style={styles.featureDescription}>
                Kompetisi dengan pemain lain
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <p style={styles.footerTitle}>Historic Block</p>
          <p style={styles.footerSubtitle}>
            Belajar sejarah dengan cara yang menyenangkan
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
