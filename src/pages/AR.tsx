const AR = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      padding: "16px",
    },
    card: {
      maxWidth: "448px",
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      textAlign: "center" as const,
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px",
    },
    description: {
      color: "#4b5563",
      marginBottom: "16px",
    },
    note: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
      padding: "12px",
      borderRadius: "6px",
      fontSize: "0.875rem",
      border: "1px solid #fbbf24",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📱 AR Scanner</h1>
        <p style={styles.description}>
          Halaman ini siap untuk implementasi AR.js manual
        </p>
        <div style={styles.note}>
          💡 Tip: Implementasikan AR.js secara manual di halaman ini untuk
          scanning kartu Historic Block
        </div>
      </div>
    </div>
  );
};

export default AR;
