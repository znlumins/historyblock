import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ARCamera = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleMarkerFound = () => {
      console.log("Marker ditemukan!");
      setShowButton(true);
    };

    const handleMarkerLost = () => {
      console.log("Marker hilang!");
      setShowButton(false);
    };

    // Small delay to ensure A-Frame elements are ready
    const timer = setTimeout(() => {
      const marker = document.querySelector("#ar-marker");
      
      if (marker) {
        marker.addEventListener("markerFound", handleMarkerFound);
        marker.addEventListener("markerLost", handleMarkerLost);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      const marker = document.querySelector("#ar-marker");
      if (marker) {
        marker.removeEventListener("markerFound", handleMarkerFound);
        marker.removeEventListener("markerLost", handleMarkerLost);
      }
    };
  }, []);

  const handleStartQuiz = () => {
    navigate("/kuis");
  };

  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      {/* AR Button */}
      {showButton && (
        <button
          onClick={handleStartQuiz}
          style={{
            display: "block",
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 24px",
            fontSize: "18px",
            zIndex: 10,
            backgroundColor: "#654321",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
          }}
        >
          Mulai Kuis Sejarah
        </button>
      )}
      
      {/* A-Frame AR Scene */}
      <a-scene
        embedded
        arjs='sourceType: webcam; debugUIEnabled: false;'
        vr-mode-ui="enabled: false"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999
        }}
      >
        <a-marker
          id="ar-marker"
          type="pattern"
          url="/patternHISTORICBLOCK.patt"
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
