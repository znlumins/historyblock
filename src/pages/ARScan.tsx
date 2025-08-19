import { useEffect, useState, useRef } from "react";

// Deklarasi Tipe Global (jika menggunakan TypeScript)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-marker': any;
      'a-image': any;
      'a-entity': any;
    }
  }
}

const ARScan = () => {
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const sceneRef = useRef<any>(null);

  // useEffect untuk inisialisasi AR (tidak berubah, sudah benar)
  useEffect(() => {
    let mounted = true;
    const initializeAR = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      if (!mounted) return;
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("API MediaDevices tidak didukung di browser ini.");
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        stream.getTracks().forEach(track => track.stop());
        if (!mounted) return;
        const sceneEl = sceneRef.current;
        if (sceneEl) {
          const onSceneReady = () => {
            if (!mounted) return;
            const marker = document.querySelector("#ar-marker");
            if (marker) {
              marker.addEventListener("markerFound", () => { if (mounted) setShowButton(true); });
              marker.addEventListener("markerLost", () => { if (mounted) setShowButton(false); });
            }
            setIsInitialized(true);
          };
          if (sceneEl.hasLoaded) onSceneReady();
          else sceneEl.addEventListener("loaded", onSceneReady, { once: true });
        } else {
           if (mounted) setError("Komponen AR <a-scene> gagal ditemukan di DOM.");
        }
      } catch (err: any) {
        if (mounted) {
          let errorMessage = "Tidak dapat mengakses kamera. Pastikan Anda menggunakan HTTPS dan izin kamera sudah diberikan.";
          if (err.name === "NotAllowedError") errorMessage = "Akses kamera ditolak. Mohon izinkan akses kamera di pengaturan browser Anda.";
          else if (err.name === "NotFoundError") errorMessage = "Tidak ada kamera yang ditemukan di perangkat ini.";
          setError(`${errorMessage} (${err.name})`);
        }
      }
    };
    initializeAR();
    return () => {
      mounted = false;
      const marker = document.querySelector("#ar-marker");
      if (marker) {
        marker.removeEventListener("markerFound", () => {});
        marker.removeEventListener("markerLost", () => {});
      }
    };
  }, []);

  // useEffect untuk styling body (tidak berubah)
  useEffect(() => {
    document.body.classList.add('ar-mode-active');
    return () => document.body.classList.remove('ar-mode-active');
  }, []);

  const handleStartQuiz = () => { window.location.href = "/quiz/quiz-proklamasi"; };
  const handleBack = () => { window.location.href = "/kuis"; };

  if (error) {
    // ... UI Error tidak berubah ...
    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center p-4">
            {/* ... Konten error ... */}
        </div>
    );
  }

  return (
    // Gunakan React Fragment agar kita bisa punya beberapa elemen root level
    <>
      <style>{`
        /* 
          Aturan ini tetap penting untuk memastikan video/canvas mengisi layar.
          Tapi kita tidak lagi mengatur z-index di sini.
        */
        video, .a-canvas {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          min-width: 100vw !important;
          min-height: 100vh !important;
          width: auto !important;
          height: auto !important;
          object-fit: cover !important;
        }
      `}</style>
      
      {/* ==================================================================== */}
      {/* LAPISAN 1: DUNIA AR (PALING BELAKANG) */}
      {/* ==================================================================== */}
      <div className="fixed inset-0 z-[1]">
        <a-scene 
          ref={sceneRef}
          embedded 
          arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
          vr-mode-ui="enabled: false" 
          renderer="logarithmicDepthBuffer: true; antialias: true; colorManagement: true;"
        >
          <a-marker id="ar-marker" type="pattern" url="/patternHISTORICBLOCK.patt" smooth="true" smoothCount="5" smoothTolerance="0.01" smoothThreshold="2">
            <a-image src="/HISTORI.png" width="1.5" height="1.5" position="0 0.5 0" rotation="-90 0 0" />
          </a-marker>
          <a-entity camera look-controls-enabled="false" cursor="rayOrigin: mouse"></a-entity>
        </a-scene>
      </div>

      {/* ==================================================================== */}
      {/* LAPISAN 2: UI PENGGUNA (DI TENGAH) */}
      {/* ==================================================================== */}
      <div className="fixed inset-0 z-10 pointer-events-none flex flex-col items-center">
        <div className="w-full flex justify-between items-center p-4">
          <button onClick={handleBack} className="pointer-events-auto bg-black/70 text-white w-10 h-10 rounded-full hover:bg-black/90 transition-all text-xl flex items-center justify-center" aria-label="Kembali">←</button>
          <div className={`transition-opacity duration-300 bg-black/80 text-white px-4 py-2 rounded-lg text-center ${showButton || !isInitialized ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-sm font-medium">Arahkan kamera ke pola</p>
          </div>
          <div className="w-10 h-10"></div> {/* Spacer */}
        </div>
        <div className="flex-grow"></div> {/* Spacer */}
        {showButton && (
          <div className="w-full p-4 flex justify-center pb-6">
            <button onClick={handleStartQuiz} className="pointer-events-auto bg-historic-brown text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-historic-brown-dark transition-all duration-200 animate-pulse">
              Mulai Kuis Sejarah
            </button>
          </div>
        )}
      </div>
      
      {/* ==================================================================== */}
      {/* LAPISAN 3: LAYAR LOADING (PALING DEPAN) */}
      {/* ==================================================================== */}
      {(!isInitialized) && (
        <div className="fixed inset-0 z-20 bg-black/90 flex items-center justify-center p-4">
          <div className="text-center text-white max-w-xs">
            <div className="animate-spin rounded-full border-b-2 border-white mx-auto h-12 w-12 mb-4"></div>
            <p className="font-semibold text-lg">Memuat Kamera AR...</p>
            <p className="opacity-75 text-sm">Mohon izinkan akses kamera</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ARScan;