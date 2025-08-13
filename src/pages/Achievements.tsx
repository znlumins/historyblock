import { Link } from "react-router-dom";
import { Target, Flag, Flame, Star, Trophy, BookOpen, Medal, Award, Crown, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "First Quiz Master",
      description: "Selesaikan kuis pertama Anda",
      icon: Target,
      earned: true,
      progress: 100,
      date: "15 Jan 2024",
    },
    {
      id: 2,
      title: "Kemerdekaan Expert",
      description: "Jawab 10 soal tentang kemerdekaan dengan benar",
      icon: Flag,
      earned: true,
      progress: 100,
      date: "18 Jan 2024",
    },
    {
      id: 3,
      title: "History Streak",
      description: "Mainkan kuis 7 hari berturut-turut",
      icon: Flame,
      earned: true,
      progress: 100,
      date: "25 Jan 2024",
    },
    {
      id: 4,
      title: "Perfect Score",
      description: "Dapatkan skor 100% dalam satu kuis",
      icon: Star,
      earned: true,
      progress: 100,
      date: "28 Jan 2024",
    },
    {
      id: 5,
      title: "Quiz Champion",
      description: "Selesaikan 25 kuis dengan skor rata-rata >80%",
      icon: Trophy,
      earned: true,
      progress: 100,
      date: "5 Feb 2024",
    },
    {
      id: 6,
      title: "Knowledge Seeker",
      description: "Baca 50 artikel sejarah",
      icon: BookOpen,
      earned: false,
      progress: 76,
      date: null,
    },
    {
      id: 7,
      title: "Speed Demon",
      description: "Selesaikan kuis dalam waktu kurang dari 2 menit",
      icon: Medal,
      earned: false,
      progress: 45,
      date: null,
    },
    {
      id: 8,
      title: "Social Learner",
      description: "Ajak 5 teman bergabung di Historic Block",
      icon: Award,
      earned: false,
      progress: 20,
      date: null,
    },
    {
      id: 9,
      title: "Master Historian",
      description: "Raih posisi #1 di leaderboard selama 1 bulan",
      icon: Crown,
      earned: false,
      progress: 0,
      date: null,
    },
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "white",
    },
    content: {
      padding: "32px 16px",
      backgroundColor: "#f9fafb",
    },
    contentContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "48px",
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
      color: "#1f2937",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
    },
    subtitle: {
      fontSize: "1.125rem",
      color: "#6b7280",
      maxWidth: "600px",
      margin: "0 auto",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "24px",
      marginBottom: "48px",
    },
    statCard: {
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "12px",
      textAlign: "center" as const,
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid #e5e7eb",
    },
    statIcon: {
      marginBottom: "12px",
      display: "flex",
      justifyContent: "center",
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "4px",
    },
    statLabel: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    achievementsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },
    achievementCard: {
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid #e5e7eb",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    achievementCardEarned: {
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "2px solid #16a34a",
      transition: "transform 0.2s, box-shadow 0.2s",
      position: "relative" as const,
    },
    achievementHeader: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "16px",
    },
    achievementIcon: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    achievementIconEarned: {
      backgroundColor: "#dcfce7",
    },
    achievementIconLocked: {
      backgroundColor: "#f3f4f6",
    },
    achievementInfo: {
      flex: 1,
    },
    achievementTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "4px",
    },
    achievementDescription: {
      fontSize: "0.875rem",
      color: "#6b7280",
      lineHeight: "1.4",
    },
    achievementDate: {
      fontSize: "0.75rem",
      color: "#16a34a",
      fontWeight: "500",
      marginTop: "8px",
    },
    progressSection: {
      marginTop: "16px",
    },
    progressLabel: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
      fontSize: "0.875rem",
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
      borderRadius: "4px",
      transition: "width 0.3s ease",
    },
    progressFillEarned: {
      backgroundColor: "#16a34a",
    },
    progressFillProgress: {
      backgroundColor: "#3b82f6",
    },
    earnedBadge: {
      position: "absolute" as const,
      top: "12px",
      right: "12px",
      backgroundColor: "#16a34a",
      color: "white",
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "0.75rem",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
  };

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalCount = achievements.length;
  const completionRate = Math.round((earnedCount / totalCount) * 100);

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
              <Award size={40} color="#facc15" />
              Achievement
            </h1>
            <p style={styles.subtitle}>
              Lihat pencapaian Anda dalam mempelajari sejarah Indonesia
            </p>
          </div>

          {/* Statistics Overview */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <Trophy size={32} color="#facc15" />
              </div>
              <div style={styles.statValue}>{earnedCount}</div>
              <div style={styles.statLabel}>Achievement Terbuka</div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <Target size={32} color="#3b82f6" />
              </div>
              <div style={styles.statValue}>{totalCount - earnedCount}</div>
              <div style={styles.statLabel}>Masih Terkunci</div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <Medal size={32} color="#16a34a" />
              </div>
              <div style={styles.statValue}>{completionRate}%</div>
              <div style={styles.statLabel}>Tingkat Penyelesaian</div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                style={achievement.earned ? styles.achievementCardEarned : styles.achievementCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 15px -3px rgb(0 0 0 / 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
                }}
              >
                {achievement.earned && (
                  <div style={styles.earnedBadge}>
                    <Star size={12} />
                    Earned
                  </div>
                )}
                
                <div style={styles.achievementHeader}>
                  <div style={{
                    ...styles.achievementIcon,
                    ...(achievement.earned ? styles.achievementIconEarned : styles.achievementIconLocked)
                  }}>
                    <achievement.icon 
                      size={24} 
                      color={achievement.earned ? "#16a34a" : "#9ca3af"} 
                    />
                  </div>
                  <div style={styles.achievementInfo}>
                    <h3 style={styles.achievementTitle}>
                      {achievement.title}
                    </h3>
                    <p style={styles.achievementDescription}>
                      {achievement.description}
                    </p>
                    {achievement.earned && achievement.date && (
                      <p style={styles.achievementDate}>
                        Diraih pada {achievement.date}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={styles.progressSection}>
                  <div style={styles.progressLabel}>
                    <span style={{ color: achievement.earned ? "#16a34a" : "#6b7280", fontWeight: "500" }}>
                      Progress
                    </span>
                    <span style={{ color: achievement.earned ? "#16a34a" : "#3b82f6", fontWeight: "600" }}>
                      {achievement.progress}%
                    </span>
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        ...(achievement.earned ? styles.progressFillEarned : styles.progressFillProgress),
                        width: `${achievement.progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
