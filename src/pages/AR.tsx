import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const AR = () => {
  const navigate = useNavigate();

  const styles = {
    pageContainer: {
      minHeight: "100vh",
      backgroundColor: "white",
    },
    container: {
      margin: 0,
      padding: "40px 20px",
      minHeight: "calc(100vh - 80px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      textAlign: "center" as const,
      maxWidth: "500px",
      width: "100%",
    },
    backButton: {
      position: "absolute" as const,
      top: "100px",
      left: "20px",
      backgroundColor: "#654321",
      color: "white",
      padding: "12px",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#654321",
      marginBottom: "16px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#6b7280",
      marginBottom: "32px",
      lineHeight: "1.6",
    },
    comingSoon: {
      backgroundColor: "#f3f4f6",
      border: "2px dashed #d1d5db",
      borderRadius: "12px",
      padding: "40px 32px",
      color: "#6b7280",
      fontSize: "16px",
    },
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />

      {/* Back button */}
      <button
        onClick={handleBack}
        style={styles.backButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#8b4513";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#654321";
        }}
      >
        <ArrowLeft size={20} />
      </button>

      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>AR Scanner</h1>
          <p style={styles.subtitle}>
            Fitur AR Scanner sedang dalam tahap pengembangan. Kembali lagi nanti
            untuk pengalaman AR yang menakjubkan!
          </p>
          <div style={styles.comingSoon}>
            <p>🚧 Coming Soon 🚧</p>
            <p style={{ marginTop: "8px", fontSize: "14px" }}>
              AR functionality will be available soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AR;
