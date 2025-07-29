import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ARCamera = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const requestCameraPermission = async () => {
      try {
        // Request camera permission explicitly
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment', // Use back camera for AR
            width: { ideal: 640 },
            height: { ideal: 480 }
          } 
        });
        
        // Stop the stream after getting permission
        stream.getTracks().forEach(track => track.stop());
        
        if (mounted) {
          setIsLoading(false);
          initializeAR();
        }
      } catch (error) {
        console.error("Camera permission error:", error);
        if (mounted) {
          setCameraError("Kamera tidak dapat diakses. Pastikan izin kamera sudah diberikan.");
          setIsLoading(false);
        }
      }
    };

    const initializeAR = () => {
      const handleMarkerFound = () => {
        console.log("Marker ditemukan!");
        if (mounted) {
          setShowButton(true);
        }
      };

      const handleMarkerLost = () => {
        console.log("Marker hilang!");
        if (mounted) {
          setShowButton(false);
        }
      };

      // Wait for A-Frame to be ready
      const timer = setTimeout(() => {
        if (!mounted) return;
        
        const marker = document.querySelector("#ar-marker");
        const scene = document.querySelector("a-scene");
        
        if (marker) {
          marker.addEventListener("markerFound", handleMarkerFound);
          marker.addEventListener("markerLost", handleMarkerLost);
        }

        // Add error handling for AR.js
        if (scene) {
          scene.addEventListener("arjs-video-loaded", () => {
            console.log("AR video loaded successfully");
          });
          
          scene.addEventListener("arjs-video-error", (event) => {
            console.error("AR video error:", event);
            if (mounted) {
              setCameraError("Terjadi error saat mengakses kamera AR");
            }
          });
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
        const marker = document.querySelector("#ar-marker");
        if (marker) {
          marker.removeEventListener("markerFound", handleMarkerFound);
          marker.removeEventListener("markerLost", handleMarkerLost);
        }
      };
    };

    // Start the camera permission request
    requestCameraPermission();

    return () => {
      mounted = false;
    };
  }, []);

  const handleStartQuiz = () => {
    navigate("/kuis");
  };

  const handleRetryCamera = () => {
    setCameraError("");
    setIsLoading(true);
    window.location.reload(); // Simple way to retry
  };

  if (cameraError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-historic-cream p-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-historic-brown mb-4">
            Masalah Kamera
          </h2>
          <p className="text-historic-brown-dark mb-6">
            {cameraError}
          </p>
          <div className="space-y-3">
            <button
              onClick={handleRetryCamera}
              className="w-full bg-historic-brown text-white px-6 py-3 rounded-lg font-medium hover:bg-historic-brown-dark transition-colors"
            >
              Coba Lagi
            </button>
            <button
              onClick={() => navigate("/kuis")}
              className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Lewati AR (Manual)
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Tips: Pastikan browser Anda mendukung kamera dan izin sudah diberikan
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-historic-cream">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-historic-brown mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-historic-brown mb-2">
            Memuat Kamera AR...
          </h2>
          <p className="text-historic-brown-dark">
            Mohon izinkan akses kamera untuk melanjutkan
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: 0, overflow: "hidden", height: "100vh" }}>
      {/* AR Button */}
      {showButton && (
        <button
          onClick={handleStartQuiz}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[10000] bg-historic-brown text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-historic-brown-dark transition-colors"
        >
          Mulai Kuis Sejarah
        </button>
      )}
      
      {/* Instructions */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[10000] bg-black/70 text-white px-4 py-2 rounded-lg text-center">
        <p className="text-sm">Arahkan kamera ke pola Historic Block</p>
      </div>
      
      {/* A-Frame AR Scene */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1
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
            id="historic-image"
            src="/HISTORI.png"
            width="1"
            height="1"
            position="0 0.5 0"
            look-at="[camera]"
          />
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARCamera;
