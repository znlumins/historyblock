import { Link } from "react-router-dom";
import { BarChart3, Trophy, BookOpen, Target, TrendingUp, Calendar, ArrowLeft, Award, Star, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

const Stats = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "white",
    },
    content: {
      padding: "32px 16px",
      background: "linear-gradient(to right, #fef3c7, #fde68a)",
    },
    contentContainer: {
      maxWidth: "1536px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "32px",
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "#6b7280",
      textDecoration: "none",
      marginBottom: "24px",
      padding: "8px 16px",
      borderRadius: "8px",
      transition: "all 0.2s",
      fontSize: "14px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#8b4513",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
    },
    subtitle: {
      fontSize: "1.125rem",
      color: "#6b7280",
    },
    overviewGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "24px",
      marginBottom: "32px",
    },
    overviewCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      textAlign: "center" as const,
    },
    cardIcon: {
      marginBottom: "12px",
      display: "flex",
      justifyContent: "center",
    },
    cardValue: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "4px",
    },
    cardLabel: {
      fontSize: "0.875rem",
      color: "#6b7280",
      fontWeight: "500",
    },
    cardSubtext: {
      fontSize: "0.75rem",
      color: "#16a34a",
      marginTop: "4px",
    },
    progressSection: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      marginBottom: "32px",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    progressList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
    },
    progressItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    progressLabel: {
      fontSize: "0.875rem",
      color: "#374151",
      fontWeight: "500",
    },
    progressValue: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    progressBar: {
      width: "100%",
      height: "8px",
      backgroundColor: "#f3f4f6",
      borderRadius: "4px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#8b4513",
      borderRadius: "4px",
      transition: "width 0.3s ease",
    },
    activitySection: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    activityGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "8px",
      marginTop: "16px",
    },
    activityDay: {
      textAlign: "center" as const,
    },
    dayLabel: {
      fontSize: "0.75rem",
      color: "#6b7280",
      marginBottom: "8px",
    },
    activityBlock: {
      width: "32px",
      height: "32px",
      borderRadius: "4px",
      margin: "0 auto",
      marginBottom: "4px",
    },
    activityCount: {
      fontSize: "0.625rem",
      color: "#6b7280",
      marginTop: "4px",
    },
  };

  const weekDays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const activityData = [5, 3, 7, 2, 6, 1, 0]; // Mock data

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.content}>
        <div style={styles.contentContainer}>
          <div style={styles.header}>
            <Link 
              to="/profile" 
              style={styles.backButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.color = "#374151";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#6b7280";
              }}
            >
              <ArrowLeft size={16} />
              Kembali ke Profil
            </Link>

            <h1 style={styles.title}>
              <BarChart3 size={40} color="#8b4513" />
              Statistik Pembelajaran
            </h1>
            <p style={styles.subtitle}>
              Pantau progress dan pencapaian belajar sejarah Anda
            </p>
          </div>

          {/* Overview Cards */}
          <div style={styles.overviewGrid}>
            <div style={styles.overviewCard}>
              <div style={styles.cardIcon}>
                <Trophy size={32} color="#facc15" />
              </div>
              <div style={styles.cardValue}>24</div>
              <div style={styles.cardLabel}>Kuis Selesai</div>
              <div style={styles.cardSubtext}>+3 minggu ini</div>
            </div>

            <div style={styles.overviewCard}>
              <div style={styles.cardIcon}>
                <BookOpen size={32} color="#3b82f6" />
              </div>
              <div style={styles.cardValue}>87%</div>
              <div style={styles.cardLabel}>Akurasi Rata-rata</div>
              <div style={styles.cardSubtext}>+5% dari bulan lalu</div>
            </div>

            <div style={styles.overviewCard}>
              <div style={styles.cardIcon}>
                <Target size={32} color="#16a34a" />
              </div>
              <div style={styles.cardValue}>1,640</div>
              <div style={styles.cardLabel}>Total Poin</div>
              <div style={styles.cardSubtext}>+240 minggu ini</div>
            </div>

            <div style={styles.overviewCard}>
              <div style={styles.cardIcon}>
                <TrendingUp size={32} color="#f59e0b" />
              </div>
              <div style={styles.cardValue}>#3</div>
              <div style={styles.cardLabel}>Peringkat</div>
              <div style={styles.cardSubtext}>Naik 2 posisi</div>
            </div>
          </div>

          {/* Achievement Progress */}
          <div style={styles.progressSection}>
            <h3 style={styles.sectionTitle}>
              <Award size={20} />
              Progress Achievement
            </h3>
            
            <div style={styles.progressList}>
              <div>
                <div style={styles.progressItem}>
                  <span style={styles.progressLabel}>Sejarah Indonesia</span>
                  <span style={styles.progressValue}>8/10</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: "80%" }} />
                </div>
              </div>

              <div>
                <div style={styles.progressItem}>
                  <span style={styles.progressLabel}>Perang Dunia</span>
                  <span style={styles.progressValue}>6/8</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: "75%" }} />
                </div>
              </div>

              <div>
                <div style={styles.progressItem}>
                  <span style={styles.progressLabel}>Kerajaan Nusantara</span>
                  <span style={styles.progressValue}>4/6</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: "67%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div style={styles.activitySection}>
            <h3 style={styles.sectionTitle}>
              <Calendar size={20} />
              Aktivitas Minggu Ini
            </h3>
            
            <div style={styles.activityGrid}>
              {weekDays.map((day, index) => (
                <div key={day} style={styles.activityDay}>
                  <div style={styles.dayLabel}>{day}</div>
                  <div
                    style={{
                      ...styles.activityBlock,
                      backgroundColor: index < 5 
                        ? "#8b4513" 
                        : index === 5 
                          ? "rgba(139, 69, 19, 0.5)" 
                          : "#f3f4f6"
                    }}
                  />
                  <div style={styles.activityCount}>
                    {index < 5 ? `${3 + index}` : index === 5 ? "1" : "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
