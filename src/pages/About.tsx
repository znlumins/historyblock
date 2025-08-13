import { Target, Rocket, Phone, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "white",
    },
    content: {
      padding: "64px 16px",
    },
    contentContainer: {
      maxWidth: "1024px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "24px",
      textAlign: "center" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
    },
    description: {
      fontSize: "1.125rem",
      color: "#4b5563",
      lineHeight: "1.6",
      marginBottom: "32px",
      textAlign: "center" as const,
    },
    section: {
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      padding: "32px",
      marginBottom: "24px",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    sectionContent: {
      color: "#374151",
      lineHeight: "1.6",
    },
    featureList: {
      marginTop: "16px",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "8px 0",
      color: "#374151",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.content}>
        <div style={styles.contentContainer}>
          <h1 style={styles.title}>
            <BookOpen size={40} color="#8b4513" />
            Tentang Historic Block
          </h1>
          
          <p style={styles.description}>
            Historic Block adalah platform pembelajaran sejarah Indonesia yang 
            menggabungkan teknologi AR dan kuis interaktif untuk pengalaman 
            belajar yang menyenangkan.
          </p>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Target size={24} color="#16a34a" />
              Misi Kami
            </h2>
            <p style={styles.sectionContent}>
              Membuat pembelajaran sejarah Indonesia menjadi lebih menarik dan 
              interaktif melalui teknologi Augmented Reality dan gamifikasi.
            </p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Rocket size={24} color="#3b82f6" />
              Fitur Utama
            </h2>
            <div style={styles.sectionContent}>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <Target size={16} color="#16a34a" />
                  <span>AR Scanner untuk kartu Historic Block</span>
                </div>
                <div style={styles.featureItem}>
                  <BookOpen size={16} color="#16a34a" />
                  <span>Kuis interaktif berbagai tingkat kesulitan</span>
                </div>
                <div style={styles.featureItem}>
                  <Target size={16} color="#16a34a" />
                  <span>Sistem poin dan leaderboard</span>
                </div>
                <div style={styles.featureItem}>
                  <Target size={16} color="#16a34a" />
                  <span>Tracking progress dan achievement</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Phone size={24} color="#eab308" />
              Kontak
            </h2>
            <p style={styles.sectionContent}>
              Untuk informasi lebih lanjut, hubungi tim Historic Block.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
