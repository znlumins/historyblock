import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ARCamera = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const initAR = () => {
      if (!sceneRef.current || !mounted) return;

      // Create the A-Frame scene programmatically
      const sceneHTML = `
        <a-scene 
          embedded 
          arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
          vr-mode-ui="enabled: false"
          style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;"
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
              width="1" 
              height="1" 
              position="0 0.5 0"
              look-at="[camera]"
            ></a-image>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      `;

      sceneRef.current.innerHTML = sceneHTML;

      // Wait a bit for the scene to initialize
      setTimeout(() => {
        if (!mounted) return;

        const marker = document.querySelector("#ar-marker");
        const scene = document.querySelector("a-scene");

        if (marker) {
          marker.addEventListener("markerFound", () => {
            console.log("Marker found!");
            if (mounted) setShowButton(true);
          });

          marker.addEventListener("markerLost", () => {
            console.log("Marker lost!");
            if (mounted) setShowButton(false);
          });
        }

        if (scene) {
          scene.addEventListener("arjs-video-loaded", () => {
            console.log("Video loaded successfully");
            if (mounted) setIsReady(true);
          });

          scene.addEventListener("loaded", () => {
            console.log("A-Frame scene loaded");
            if (mounted) setIsReady(true);
          });
        }

        // Set ready after timeout as fallback
        setTimeout(() => {
          if (mounted) setIsReady(true);
        }, 3000);
      }, 1000);
    };

    // Check if we're in a secure context
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Kamera tidak didukung di browser ini. Gunakan HTTPS atau browser yang lebih baru.");
      return;
    }

    // Request camera permission first
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 640 },
        height: { ideal: 480 }
      } 
    })
    .then(stream => {
      // Stop the test stream
      stream.getTracks().forEach(track => track.stop());
      
      if (mounted) {
        console.log("Camera permission granted, initializing AR...");
        initAR();
      }
    })
    .catch(err => {
      console.error("Camera error:", err);
      if (mounted) {
        setError(`Kamera tidak dapat diakses: ${err.message}. Pastikan izin kamera sudah diberikan.`);
      }
    });

    return () => {
      mounted = false;
      if (sceneRef.current) {
        sceneRef.current.innerHTML = '';
      }
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-historic-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center shadow-lg">
          <h2 className="text-xl font-bold text-historic-brown mb-4">Error Kamera</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-historic-brown text-white py-2 px-4 rounded hover:bg-historic-brown-dark"
            >
              Coba Lagi
            </button>
            <button
              onClick={() => navigate("/kuis")}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Skip AR (Manual)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Loading overlay */}
      {!isReady && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Memuat kamera AR...</p>
            <p className="text-sm mt-2">Mohon izinkan akses kamera</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-black/70 text-white px-4 py-2 rounded text-center">
        <p className="text-sm">Arahkan kamera ke pola Historic Block</p>
      </div>

      {/* AR Button */}
      {showButton && (
        <button
          onClick={() => navigate("/kuis")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-historic-brown text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-historic-brown-dark"
        >
          Mulai Kuis Sejarah
        </button>
      )}

      {/* Debug button for testing */}
      <button
        onClick={() => {
          console.log("Debug: Force show button");
          setShowButton(!showButton);
        }}
        className="absolute top-20 right-4 z-40 bg-blue-500 text-white px-3 py-1 rounded text-xs"
      >
        Debug
      </button>

      {/* A-Frame scene container */}
      <div 
        ref={sceneRef} 
        className="w-full h-full"
        style={{ 
          position: 'relative',
          width: '100vw', 
          height: '100vh' 
        }}
      />
    </div>
  );
};

export default ARCamera;
