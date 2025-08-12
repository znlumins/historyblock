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
    },
    sectionContent: {
      color: "#374151",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <div style={styles.contentContainer}>
          <h1 style={styles.title}>🏛️ Tentang Historic Block</h1>

          <p style={styles.description}>
            Historic Block adalah platform pembelajaran sejarah Indonesia yang
            menggabungkan teknologi AR dan kuis interaktif untuk pengalaman
            belajar yang menyenangkan.
          </p>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🎯 Misi Kami</h2>
            <p style={styles.sectionContent}>
              Membuat pembelajaran sejarah Indonesia menjadi lebih menarik dan
              interaktif melalui teknologi Augmented Reality dan gamifikasi.
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🚀 Fitur Utama</h2>
            <p style={styles.sectionContent}>
              • AR Scanner untuk kartu Historic Block
              <br />
              �� Kuis interaktif berbagai tingkat kesulitan
              <br />
              • Sistem poin dan leaderboard
              <br />• Tracking progress dan achievement
            </p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📞 Kontak</h2>
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
