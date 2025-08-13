import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ArrowLeft, Target, AlertCircle, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";

const AR = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState("");

  const styles = {
    pageContainer: {
      minHeight: "100vh",
      backgroundColor: "white",
    },
    container: {
      margin: 0,
      padding: 0,
      overflow: "hidden",
      height: "calc(100vh - 80px)",
      width: "100vw",
      position: "relative" as const,
      backgroundColor: "black",
    },
    backButton: {
      position: "absolute" as const,
      top: "16px",
      left: "16px",
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
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
      maxWidth: "300px",
      padding: "20px",
    },
    spinner: {
      width: "48px",
      height: "48px",
      border: "3px solid transparent",
      borderTop: "3px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto 16px auto",
    },
    loadingTitle: {
      fontSize: "18px",
      marginBottom: "8px",
      fontWeight: "600",
    },
    loadingSubtitle: {
      fontSize: "14px",
      opacity: 0.75,
      marginBottom: "16px",
    },
    instructions: {
      position: "absolute" as const,
      top: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 40,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
      textAlign: "center" as const,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      maxWidth: "90%",
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
      backgroundColor: "#16a34a",
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
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    debugButton: {
      position: "absolute" as const,
      bottom: "16px",
      right: "16px",
      zIndex: 40,
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "12px",
      opacity: 0.7,
      border: "none",
      cursor: "pointer",
    },
    debugInfo: {
      position: "absolute" as const,
      bottom: "60px",
      right: "16px",
      zIndex: 40,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "8px 12px",
      borderRadius: "4px",
      fontSize: "10px",
      maxWidth: "200px",
      wordBreak: "break-word" as const,
    },
    errorContainer: {
      minHeight: "calc(100vh - 80px)",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    errorCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "32px",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center" as const,
    },
    errorIcon: {
      marginBottom: "16px",
      display: "flex",
      justifyContent: "center",
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
      lineHeight: "1.5",
    },
    errorButtonContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
    },
    errorButtonPrimary: {
      width: "100%",
      backgroundColor: "#16a34a",
      color: "white",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontWeight: "600",
    },
    errorButtonSecondary: {
      width: "100%",
      backgroundColor: "#6b7280",
      color: "white",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontWeight: "600",
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
    let stream: MediaStream | null = null;

    const initializeAR = async () => {
      try {
        setDebugInfo("Meminta akses kamera...");
        
        // Check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("getUserMedia tidak didukung di browser ini");
        }

        // Request camera permission with specific constraints
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // Use back camera
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
          },
        });

        setDebugInfo("Kamera berhasil diakses, menginisialisasi AR...");
        
        // Stop the test stream immediately
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        if (!mounted) return;

        // Check if A-Frame is loaded
        const checkAFrame = () => {
          if (typeof window !== 'undefined' && (window as any).AFRAME) {
            setDebugInfo("A-Frame loaded, waiting for scene...");
            setTimeout(initializeMarkerEvents, 2000);
          } else {
            setDebugInfo("Waiting for A-Frame to load...");
            setTimeout(checkAFrame, 500);
          }
        };

        checkAFrame();

      } catch (err: any) {
        console.error("Camera initialization error:", err);
        setDebugInfo(`Error: ${err.message}`);
        
        if (mounted) {
          let errorMessage = "Tidak dapat mengakses kamera.";
          
          if (err.name === 'NotAllowedError') {
            errorMessage = "Akses kamera ditolak. Silakan izinkan akses kamera dan refresh halaman.";
          } else if (err.name === 'NotFoundError') {
            errorMessage = "Kamera tidak ditemukan. Pastikan device memiliki kamera.";
          } else if (err.name === 'NotSupportedError') {
            errorMessage = "Akses kamera tidak didukung di browser ini.";
          } else if (err.message.includes('getUserMedia')) {
            errorMessage = "Browser tidak mendukung akses kamera. Gunakan browser yang lebih baru.";
          }
          
          setError(errorMessage);
        }
      }
    };

    const initializeMarkerEvents = () => {
      if (!mounted) return;
      
      setDebugInfo("Setting up marker events...");
      
      // Wait for A-Frame scene to be ready
      const scene = document.querySelector('a-scene');
      if (scene) {
        scene.addEventListener('loaded', () => {
          setDebugInfo("Scene loaded, finding marker...");
          setupMarkerEvents();
        });
        
        // Also try immediately in case scene is already loaded
        setupMarkerEvents();
      } else {
        setDebugInfo("Scene not found, retrying...");
        setTimeout(initializeMarkerEvents, 1000);
      }
    };

    const setupMarkerEvents = () => {
      const marker = document.querySelector("#ar-marker");
      
      if (marker) {
        setDebugInfo("Marker found, setting up events...");
        
        const handleMarkerFound = () => {
          console.log("🎯 Marker detected!");
          setDebugInfo("✅ Marker detected!");
          if (mounted) {
            setShowButton(true);
          }
        };

        const handleMarkerLost = () => {
          console.log("❌ Marker lost!");
          setDebugInfo("❌ Marker lost, looking for marker...");
          if (mounted) {
            setShowButton(false);
          }
        };

        // Remove existing listeners first
        marker.removeEventListener("markerFound", handleMarkerFound);
        marker.removeEventListener("markerLost", handleMarkerLost);
        
        // Add new listeners
        marker.addEventListener("markerFound", handleMarkerFound);
        marker.addEventListener("markerLost", handleMarkerLost);
        
        setIsLoading(false);
        setDebugInfo("✅ AR ready! Point camera at Historic Block pattern");
        
      } else {
        setDebugInfo("❌ Marker element not found, retrying...");
        setTimeout(setupMarkerEvents, 1000);
      }
    };

    // Start initialization
    initializeAR();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartQuiz = () => {
    navigate("/quiz/quiz-proklamasi");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (error) {
    return (
      <div style={styles.pageContainer}>
        <Navbar />
        <div style={styles.errorContainer}>
          <div style={styles.errorCard}>
            <div style={styles.errorIcon}>
              <AlertCircle size={48} color="#dc2626" />
            </div>
            <h2 style={styles.errorTitle}>Kamera Tidak Dapat Diakses</h2>
            <p style={styles.errorText}>{error}</p>
            <div style={styles.errorButtonContainer}>
              <button
                onClick={handleRetry}
                style={styles.errorButtonPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#15803d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#16a34a";
                }}
              >
                <RefreshCw size={16} />
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
                <ArrowLeft size={16} />
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <div style={styles.container}>
        {/* Add CSS keyframes for animations */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
              50% { opacity: 0.8; transform: translateX(-50%) scale(1.05); }
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
          <ArrowLeft size={20} />
        </button>

        {/* Loading overlay */}
        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingContent}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingTitle}>Memuat AR Scanner</p>
              <p style={styles.loadingSubtitle}>
                Mohon izinkan akses kamera untuk melanjutkan
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", fontSize: "12px", marginTop: "8px" }}>
                <Camera size={16} />
                <span>Pastikan kamera berfungsi dengan baik</span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!isLoading && !error && (
          <div style={styles.instructions}>
            <Camera size={16} />
            <p style={styles.instructionsText}>
              Arahkan kamera ke pola Historic Block
            </p>
          </div>
        )}

        {/* Start Quiz Button */}
        {showButton && (
          <button
            onClick={handleStartQuiz}
            style={styles.startButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#15803d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#16a34a";
            }}
          >
            <Target size={20} />
            Mulai Kuis Sejarah
          </button>
        )}

        {/* Debug Info */}
        {debugInfo && (
          <div style={styles.debugInfo}>
            Debug: {debugInfo}
          </div>
        )}

        {/* Debug button */}
        <button
          onClick={() => setShowButton(!showButton)}
          style={styles.debugButton}
          title="Test mode - simulate marker detection"
        >
          Test Mode
        </button>

        {/* A-Frame AR Scene */}
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; trackingMethod: best; maxDetectionRate: 60; canvasWidth: 640; canvasHeight: 480;"
          vr-mode-ui="enabled: false"
          style={styles.aframeScene}
        >
          <a-assets>
            <img id="historic-pattern" src="/HISTORI.png" crossOrigin="anonymous" />
          </a-assets>

          <a-marker
            id="ar-marker"
            type="pattern"
            url="/patternHISTORICBLOCK.patt"
            smooth="true"
            smoothCount="10"
            smoothTolerance="0.01"
            smoothThreshold="5"
            raycaster="objects: .clickable"
          >
            <a-image
              src="#historic-pattern"
              width="1.5"
              height="1.5"
              position="0 0.75 0"
              rotation="-90 0 0"
              animation="property: rotation; to: -90 360 0; loop: true; dur: 10000"
            />
            
            <a-text
              value="Historic Block Detected!"
              position="0 2 0"
              align="center"
              color="#ffffff"
              shader="msdf"
              font="dejavu"
              geometry="primitive: plane; width: 3; height: 0.5"
              material="color: #654321; opacity: 0.8"
            />
          </a-marker>

          <a-entity
            camera
            look-controls-enabled="false"
            cursor="rayOrigin: mouse"
            raycaster="objects: .clickable"
          />
        </a-scene>
      </div>
    </div>
  );
};

export default AR;
