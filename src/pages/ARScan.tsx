import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ARScan = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Kamera</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-historic-brown text-white py-2 px-4 rounded hover:bg-historic-brown-dark"
            >
              Coba Lagi
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-50 bg-black/70 text-white p-2 rounded-full hover:bg-black/90"
      >
        ← Kembali
      </button>

      {/* Loading overlay */}
      {!isInitialized && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-40">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg mb-2">Memuat Kamera AR...</p>
            <p className="text-sm opacity-75">Mohon izinkan akses kamera</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-black/80 text-white px-4 py-2 rounded-lg text-center">
        <p className="text-sm font-medium">
          📱 Arahkan kamera ke pola Historic Block
        </p>
      </div>

      {/* Start Quiz Button */}
      {showButton && (
        <button
          onClick={handleStartQuiz}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-historic-brown text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-historic-brown-dark transition-all duration-200 animate-pulse"
        >
          🎯 Mulai Kuis Sejarah
        </button>
      )}

      {/* Debug button */}
      <button
        onClick={() => setShowButton(!showButton)}
        className="absolute bottom-4 right-4 z-40 bg-blue-500 text-white px-3 py-1 rounded text-xs opacity-50"
      >
        Test
      </button>

      {/* A-Frame AR Scene */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
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
