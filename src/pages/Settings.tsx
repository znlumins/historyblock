import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();

  // State untuk form data
  const [formData, setFormData] = useState({
    fullName: user?.name || "Daffa Ahmad Al Attas",
    email: user?.email || "daffa@historic.com",
  });

  // State untuk toggle switches
  const [toggles, setToggles] = useState({
    showNameInLeaderboard: true,
    publicProfile: true,
    soundEffects: true,
    dailyQuizNotification: true,
    leaderboardUpdate: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (key: string) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    alert("Pengaturan disimpan!");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "white",
    },
    content: {
      padding: "32px 16px",
    },
    contentContainer: {
      maxWidth: "1024px",
      margin: "0 auto",
    },
    pageTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "32px",
    },
    section: {
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "24px",
      marginBottom: "24px",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "16px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column" as const,
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "4px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "border-color 0.2s, box-shadow 0.2s",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#eab308",
      boxShadow: "0 0 0 3px rgba(234, 179, 8, 0.1)",
    },
    toggleGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
    },
    toggleItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    toggleInfo: {
      flex: 1,
    },
    toggleLabel: {
      fontWeight: "500",
      color: "#374151",
    },
    toggleDescription: {
      fontSize: "0.875rem",
      color: "#6b7280",
    },
    toggleButton: {
      width: "48px",
      height: "24px",
      borderRadius: "12px",
      transition: "background-color 0.2s",
      position: "relative" as const,
      border: "none",
      cursor: "pointer",
    },
    toggleButtonActive: {
      backgroundColor: "#eab308",
    },
    toggleButtonInactive: {
      backgroundColor: "#d1d5db",
    },
    toggleSlider: {
      width: "20px",
      height: "20px",
      backgroundColor: "white",
      borderRadius: "50%",
      transition: "transform 0.2s",
      position: "absolute" as const,
      top: "2px",
    },
    toggleSliderActive: {
      transform: "translateX(24px)",
    },
    toggleSliderInactive: {
      transform: "translateX(2px)",
    },
    saveButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    saveButton: {
      backgroundColor: "#eab308",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      fontWeight: "600",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <div style={styles.contentContainer}>
          <h1 style={styles.pageTitle}>⚙️ Pengaturan</h1>

          {/* Profile Settings */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>👤 Profil Saya</h2>

            <div style={styles.formGroup}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nama Lengkap</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#eab308";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(234, 179, 8, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#eab308";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(234, 179, 8, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🔒 Privasi</h2>

            <div style={styles.toggleGroup}>
              <div style={styles.toggleItem}>
                <div style={styles.toggleInfo}>
                  <div style={styles.toggleLabel}>
                    Tampilkan nama di leaderboard
                  </div>
                  <div style={styles.toggleDescription}>
                    Nama Anda akan terlihat di papan peringkat
                  </div>
                </div>
                <button
                  onClick={() => handleToggleChange("showNameInLeaderboard")}
                  style={{
                    ...styles.toggleButton,
                    ...(toggles.showNameInLeaderboard
                      ? styles.toggleButtonActive
                      : styles.toggleButtonInactive),
                  }}
                >
                  <div
                    style={{
                      ...styles.toggleSlider,
                      ...(toggles.showNameInLeaderboard
                        ? styles.toggleSliderActive
                        : styles.toggleSliderInactive),
                    }}
                  />
                </button>
              </div>

              <div style={styles.toggleItem}>
                <div style={styles.toggleInfo}>
                  <div style={styles.toggleLabel}>Profil publik</div>
                  <div style={styles.toggleDescription}>
                    Pengguna lain dapat melihat profil Anda
                  </div>
                </div>
                <button
                  onClick={() => handleToggleChange("publicProfile")}
                  style={{
                    ...styles.toggleButton,
                    ...(toggles.publicProfile
                      ? styles.toggleButtonActive
                      : styles.toggleButtonInactive),
                  }}
                >
                  <div
                    style={{
                      ...styles.toggleSlider,
                      ...(toggles.publicProfile
                        ? styles.toggleSliderActive
                        : styles.toggleSliderInactive),
                    }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🔔 Notifikasi</h2>

            <div style={styles.toggleGroup}>
              <div style={styles.toggleItem}>
                <div style={styles.toggleInfo}>
                  <div style={styles.toggleLabel}>Efek suara</div>
                  <div style={styles.toggleDescription}>
                    Putar suara saat bermain kuis
                  </div>
                </div>
                <button
                  onClick={() => handleToggleChange("soundEffects")}
                  style={{
                    ...styles.toggleButton,
                    ...(toggles.soundEffects
                      ? styles.toggleButtonActive
                      : styles.toggleButtonInactive),
                  }}
                >
                  <div
                    style={{
                      ...styles.toggleSlider,
                      ...(toggles.soundEffects
                        ? styles.toggleSliderActive
                        : styles.toggleSliderInactive),
                    }}
                  />
                </button>
              </div>

              <div style={styles.toggleItem}>
                <div style={styles.toggleInfo}>
                  <div style={styles.toggleLabel}>Notifikasi kuis harian</div>
                  <div style={styles.toggleDescription}>
                    Ingatkan untuk bermain kuis setiap hari
                  </div>
                </div>
                <button
                  onClick={() => handleToggleChange("dailyQuizNotification")}
                  style={{
                    ...styles.toggleButton,
                    ...(toggles.dailyQuizNotification
                      ? styles.toggleButtonActive
                      : styles.toggleButtonInactive),
                  }}
                >
                  <div
                    style={{
                      ...styles.toggleSlider,
                      ...(toggles.dailyQuizNotification
                        ? styles.toggleSliderActive
                        : styles.toggleSliderInactive),
                    }}
                  />
                </button>
              </div>

              <div style={styles.toggleItem}>
                <div style={styles.toggleInfo}>
                  <div style={styles.toggleLabel}>Update leaderboard</div>
                  <div style={styles.toggleDescription}>
                    Notifikasi saat posisi Anda berubah
                  </div>
                </div>
                <button
                  onClick={() => handleToggleChange("leaderboardUpdate")}
                  style={{
                    ...styles.toggleButton,
                    ...(toggles.leaderboardUpdate
                      ? styles.toggleButtonActive
                      : styles.toggleButtonInactive),
                  }}
                >
                  <div
                    style={{
                      ...styles.toggleSlider,
                      ...(toggles.leaderboardUpdate
                        ? styles.toggleSliderActive
                        : styles.toggleSliderInactive),
                    }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div style={styles.saveButtonContainer}>
            <button
              onClick={handleSave}
              style={styles.saveButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ca8a04";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#eab308";
              }}
            >
              ���� Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
