import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ARCamera = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const marker = document.querySelector("#ar-marker");

    const handleMarkerFound = () => {
      console.log("Marker ditemukan!");
      navigate("/kuis");
    };

    if (marker) {
      marker.addEventListener("markerFound", handleMarkerFound);
    }

    return () => {
      if (marker) {
        marker.removeEventListener("markerFound", handleMarkerFound);
      }
    };
  }, [navigate]);

  return (
    <div>
      <a-scene
        embedded
        arjs="sourceType: webcam;"
        vr-mode-ui="enabled: false"
        className="fixed top-0 left-0 w-screen h-screen z-[9999]"
      >
        <a-marker
          id="ar-marker"
          type="pattern"
          url="patternHISTORICBLOCK.patt"
        >
          <a-image
            src="HISTORI.png"
            width="1"
            height="1"
            position="0 0.5 0"
            rotation="0 0 90"
            look-at="[camera]"
          />
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARCamera;
