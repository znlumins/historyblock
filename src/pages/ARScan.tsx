import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ARScan = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
      position: "relative" as const,
    },
    backButton: {
      position: "absolute" as const,
      top: "16px",
      left: "16px",
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "8px",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    loadingOverlay: {
      position: "absolute" as const,
      inset: "0",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 40,
    },
    loadingContent: {
      textAlign: "center" as const,
      color: "white",
    },
    spinner: {
      width: "48px",
      height: "48px",
      border: "2px solid transparent",
      borderBottom: "2px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto 16px auto",
    },
    loadingTitle: {
      fontSize: "18px",
      marginBottom: "8px",
    },
    loadingSubtitle: {
      fontSize: "14px",
      opacity: 0.75,
    },
    instructions: {
      position: "absolute" as const,
      top: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 40,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "8px 16px",
      borderRadius: "8px",
      textAlign: "center" as const,
    },
    instructionsText: {
      fontSize: "14px",
      fontWeight: "500",
    },
    startButton: {
      position: "absolute" as const,
      bottom: "32px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 40,
      backgroundColor: "#654321",
      color: "white",
      padding: "16px 32px",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "18px",
      boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    debugButton: {
      position: "absolute" as const,
      bottom: "16px",
      right: "16px",
      zIndex: 40,
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "4px 12px",
      borderRadius: "4px",
      fontSize: "12px",
      opacity: 0.5,
      border: "none",
      cursor: "pointer",
    },
    errorContainer: {
      minHeight: "100vh",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    errorCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      maxWidth: "448px",
      margin: "16px",
      textAlign: "center" as const,
    },
    errorTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#dc2626",
      marginBottom: "16px",
    },
    errorText: {
      color: "#374151",
      marginBottom: "24px",
    },
    errorButtonContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
    },
    errorButtonPrimary: {
      width: "100%",
      backgroundColor: "#654321",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    errorButtonSecondary: {
      width: "100%",
      backgroundColor: "#6b7280",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    aframeScene: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
  };

  useEffect(() => {
    let mounted = true;

    const initializeAR = async () => {
      try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
          },
        });

        // Stop the test stream
        stream.getTracks().forEach((track) => track.stop());

        if (!mounted) return;

        // Wait for A-Frame to be ready
        setTimeout(() => {
          if (!mounted) return;

          // Initialize marker events
          const marker = document.querySelector("#ar-marker");
          if (marker) {
            marker.addEventListener("markerFound", () => {
              console.log("Marker detected!");
              if (mounted) setShowButton(true);
            });

            marker.addEventListener("markerLost", () => {
              console.log("Marker lost!");
              if (mounted) setShowButton(false);
            });
          }

          setIsInitialized(true);
        }, 2000);
      } catch (err) {
        console.error("Camera initialization error:", err);
        if (mounted) {
          setError(
            "Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.",
          );
        }
      }
    };

    initializeAR();

    return () => {
      mounted = false;
    };
  }, []);

  const handleStartQuiz = () => {
    navigate("/quiz/quiz-proklamasi");
  };

  const handleBack = () => {
    navigate("/kuis");
  };

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>Error Kamera</h2>
          <p style={styles.errorText}>{error}</p>
          <div style={styles.errorButtonContainer}>
            <button
              onClick={() => window.location.reload()}
              style={styles.errorButtonPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#8b4513";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#654321";
              }}
            >
              Coba Lagi
            </button>
            <button
              onClick={handleBack}
              style={styles.errorButtonSecondary}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#4b5563";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#6b7280";
              }}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Add CSS keyframes for animations */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>

      {/* Back button */}
      <button
        onClick={handleBack}
        style={styles.backButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        }}
      >
        ← Kembali
      </button>

      {/* Loading overlay */}
      {!isInitialized && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingTitle}>Memuat Kamera AR...</p>
            <p style={styles.loadingSubtitle}>Mohon izinkan akses kamera</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={styles.instructions}>
        <p style={styles.instructionsText}>
          📱 Arahkan kamera ke pola Historic Block
        </p>
      </div>

      {/* Start Quiz Button */}
      {showButton && (
        <button
          onClick={handleStartQuiz}
          style={styles.startButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#8b4513";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#654321";
          }}
        >
          🎯 Mulai Kuis Sejarah
        </button>
      )}

      {/* Debug button */}
      <button
        onClick={() => setShowButton(!showButton)}
        style={styles.debugButton}
      >
        Test
      </button>

      {/* A-Frame AR Scene */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        style={styles.aframeScene}
      >
        <a-marker
          id="ar-marker"
          type="pattern"
          url="/patternHISTORICBLOCK.patt"
          smooth="true"
          smoothCount="10"
          smoothTolerance="0.01"
          smoothThreshold="5"
        >
          <a-image
            src="/HISTORI.png"
            width="1.5"
            height="1.5"
            position="0 0.75 0"
            look-at="[camera]"
          />
        </a-marker>
        <a-entity
          camera
          look-controls-enabled="false"
          cursor="rayOrigin: mouse"
        ></a-entity>
      </a-scene>
    </div>
  );
};

export default ARScan;
