import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const styles = {
    header: {
      width: "100%",
      height: "80px",
      backgroundColor: "#654321",
      borderBottom: "4px solid #8b4513",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      padding: "0 20px",
      position: "relative" as const,
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      width: "256px",
    },
    logo: {
      width: "62px",
      height: "62px",
      transition: "transform 0.2s",
    },
    nav: {
      display: "none",
      alignItems: "center",
      gap: "32px",
      justifyContent: "center",
      flex: 1,
    },
    navLink: {
      fontSize: "16px",
      fontWeight: "400",
      transition: "color 0.2s",
      textDecoration: "none",
      color: "white",
    },
    navLinkActive: {
      fontSize: "16px",
      fontWeight: "700",
      transition: "color 0.2s",
      textDecoration: "none",
      color: "#fef9c3",
    },
    rightContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      width: "256px",
      justifyContent: "flex-end",
    },
    desktopAuth: {
      display: "none",
      alignItems: "center",
    },
    authContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    loginLink: {
      color: "white",
      textDecoration: "none",
      transition: "color 0.2s",
    },
    registerButton: {
      background: "linear-gradient(to right, #facc15, #f97316)",
      color: "white",
      padding: "8px 24px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      transition: "all 0.2s",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    mobileMenuButton: {
      color: "white",
      background: "none",
      border: "none",
      padding: "8px",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    mobileOverlay: {
      position: "fixed" as const,
      inset: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 50,
    },
    mobileMenu: {
      backgroundColor: "white",
      width: "100%",
      maxWidth: "384px",
      height: "100%",
      boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      overflowY: "auto" as const,
      transform: "translateX(0)",
      transition: "transform 0.3s ease-in-out",
    },
    mobileHeader: {
      backgroundColor: "#654321",
      padding: "16px",
      borderBottom: "1px solid #8b4513",
    },
    mobileHeaderContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "16px",
    },
    mobileLogo: {
      width: "40px",
      height: "40px",
    },
    closeButton: {
      color: "white",
      background: "none",
      border: "none",
      padding: "8px",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      backgroundColor: "#8b4513",
      borderRadius: "8px",
      padding: "12px",
    },
    userAvatar: {
      width: "48px",
      height: "48px",
      backgroundColor: "#facc15",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontWeight: "700",
      color: "white",
      fontSize: "14px",
    },
    userLevel: {
      color: "#fef9c3",
      fontSize: "12px",
    },
    mobileNav: {
      padding: "16px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
    },
    mobileNavLink: {
      display: "block",
      fontSize: "18px",
      padding: "12px 16px",
      borderRadius: "8px",
      transition: "background-color 0.2s",
      textDecoration: "none",
      color: "#374151",
    },
    mobileNavLinkActive: {
      display: "block",
      fontSize: "18px",
      padding: "12px 16px",
      borderRadius: "8px",
      transition: "background-color 0.2s",
      textDecoration: "none",
      backgroundColor: "#facc15",
      color: "#654321",
      fontWeight: "700",
    },
    divider: {
      borderTop: "1px solid #d1d5db",
      margin: "16px 0",
    },
    logoutButton: {
      position: "absolute" as const,
      bottom: "16px",
      left: "16px",
      right: "16px",
      width: "calc(100% - 32px)",
      fontSize: "18px",
      padding: "12px 16px",
      borderRadius: "8px",
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
  };

  // Media queries simulation
  const isDesktop = window.innerWidth >= 1024;

  return (
    <>
      <header style={styles.header}>
        <div style={styles.container}>
          {/* Left side - Logo */}
          <div style={styles.logoContainer}>
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/507170e63ed72fa0abf94c821deabb0a1109b706?placeholderIfAbsent=true"
                alt="HISTORIC BLOCK"
                style={{
                  ...styles.logo,
                  ":hover": { transform: "scale(1.05)" },
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          {isDesktop && (
            <nav style={{ ...styles.nav, display: "flex" }}>
              <Link
                to="/"
                style={isActive("/") ? styles.navLinkActive : styles.navLink}
                onMouseEnter={(e) => {
                  if (!isActive("/")) e.currentTarget.style.color = "#fef9c3";
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/")) e.currentTarget.style.color = "white";
                }}
              >
                Beranda
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/kuis"
                    style={
                      isActive("/kuis") ? styles.navLinkActive : styles.navLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/kuis"))
                        e.currentTarget.style.color = "#fef9c3";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/kuis"))
                        e.currentTarget.style.color = "white";
                    }}
                  >
                    Kuis
                  </Link>
                  <Link
                    to="/leaderboard"
                    style={
                      isActive("/leaderboard")
                        ? styles.navLinkActive
                        : styles.navLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/leaderboard"))
                        e.currentTarget.style.color = "#fef9c3";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/leaderboard"))
                        e.currentTarget.style.color = "white";
                    }}
                  >
                    Leaderboard
                  </Link>
                  <Link
                    to="/tutorial"
                    style={
                      isActive("/tutorial")
                        ? styles.navLinkActive
                        : styles.navLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/tutorial"))
                        e.currentTarget.style.color = "#fef9c3";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/tutorial"))
                        e.currentTarget.style.color = "white";
                    }}
                  >
                    Tutorial Gameplay
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/tutorial"
                    style={
                      isActive("/tutorial")
                        ? styles.navLinkActive
                        : styles.navLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/tutorial"))
                        e.currentTarget.style.color = "#fef9c3";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/tutorial"))
                        e.currentTarget.style.color = "white";
                    }}
                  >
                    Tutorial Gameplay
                  </Link>
                  <Link
                    to="/login"
                    style={
                      isActive("/leaderboard")
                        ? styles.navLinkActive
                        : styles.navLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/leaderboard"))
                        e.currentTarget.style.color = "#fef9c3";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/leaderboard"))
                        e.currentTarget.style.color = "white";
                    }}
                  >
                    Leaderboard
                  </Link>
                </>
              )}
            </nav>
          )}

          {/* Right side - Auth Actions and Mobile Menu Button */}
          <div style={styles.rightContainer}>
            {/* Desktop Auth Actions */}
            {isDesktop && (
              <div style={{ ...styles.desktopAuth, display: "flex" }}>
                {isAuthenticated && user ? (
                  <UserDropdown userName={user.name} userLevel={user.level} />
                ) : (
                  <div style={styles.authContainer}>
                    <Link
                      to="/login"
                      style={styles.loginLink}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fef9c3";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "white";
                      }}
                    >
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      style={styles.registerButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #f97316, #facc15)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 15px -3px rgb(0 0 0 / 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #facc15, #f97316)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 6px -1px rgb(0 0 0 / 0.1)";
                      }}
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            {!isDesktop && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={styles.mobileMenuButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fef9c3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "white";
                }}
              >
                <svg
                  style={{ width: "24px", height: "24px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={styles.mobileOverlay} onClick={closeMobileMenu}>
          <div style={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            {/* Mobile Menu Header */}
            <div style={styles.mobileHeader}>
              <div style={styles.mobileHeaderContainer}>
                <Link to="/" onClick={closeMobileMenu}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/507170e63ed72fa0abf94c821deabb0a1109b706?placeholderIfAbsent=true"
                    alt="HISTORIC BLOCK"
                    style={styles.mobileLogo}
                  />
                </Link>
                <button
                  onClick={closeMobileMenu}
                  style={styles.closeButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fef9c3";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                >
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* User Profile Info in Mobile Menu */}
              {isAuthenticated && user && (
                <div style={styles.userProfile}>
                  <div style={styles.userAvatar}>
                    <span
                      style={{
                        fontWeight: "700",
                        color: "#654321",
                        fontSize: "18px",
                      }}
                    >
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div style={styles.userInfo}>
                    <div style={styles.userName}>{user.name}</div>
                    <div style={styles.userLevel}>{user.level}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Content */}
            <nav style={styles.mobileNav}>
              <Link
                to="/"
                onClick={closeMobileMenu}
                style={
                  isActive("/")
                    ? styles.mobileNavLinkActive
                    : styles.mobileNavLink
                }
                onMouseEnter={(e) => {
                  if (!isActive("/"))
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/"))
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                🏠 Beranda
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/kuis"
                    onClick={closeMobileMenu}
                    style={
                      isActive("/kuis")
                        ? styles.mobileNavLinkActive
                        : styles.mobileNavLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/kuis"))
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/kuis"))
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    🎯 Kuis
                  </Link>
                  <Link
                    to="/leaderboard"
                    onClick={closeMobileMenu}
                    style={
                      isActive("/leaderboard")
                        ? styles.mobileNavLinkActive
                        : styles.mobileNavLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/leaderboard"))
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/leaderboard"))
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    🏆 Leaderboard
                  </Link>
                  <Link
                    to="/tutorial"
                    onClick={closeMobileMenu}
                    style={
                      isActive("/tutorial")
                        ? styles.mobileNavLinkActive
                        : styles.mobileNavLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/tutorial"))
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/tutorial"))
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    📖 Tutorial Gameplay
                  </Link>

                  {/* Mobile Menu Divider */}
                  <div style={styles.divider}></div>

                  {/* User Menu Items for Mobile */}
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    style={styles.mobileNavLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    👤 Profil Saya
                  </Link>
                  <Link
                    to="/stats"
                    onClick={closeMobileMenu}
                    style={styles.mobileNavLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    📊 Statistik
                  </Link>
                  <Link
                    to="/achievements"
                    onClick={closeMobileMenu}
                    style={styles.mobileNavLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    🏆 Achievement
                  </Link>
                  <Link
                    to="/settings"
                    onClick={closeMobileMenu}
                    style={styles.mobileNavLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    ⚙️ Pengaturan
                  </Link>

                  {/* Admin Menu for Mobile */}
                  {user?.role === "admin" && (
                    <>
                      <div style={styles.divider}></div>
                      <Link
                        to="/admin"
                        onClick={closeMobileMenu}
                        style={{
                          ...styles.mobileNavLink,
                          backgroundColor: "#f7f3e9",
                          color: "#654321",
                          fontWeight: "600",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#facc15";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#f7f3e9";
                        }}
                      >
                        🛠️ Admin Dashboard
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/tutorial"
                    onClick={closeMobileMenu}
                    style={
                      isActive("/tutorial")
                        ? styles.mobileNavLinkActive
                        : styles.mobileNavLink
                    }
                    onMouseEnter={(e) => {
                      if (!isActive("/tutorial"))
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive("/tutorial"))
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    📖 Tutorial Gameplay
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    style={styles.mobileNavLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    🏆 Leaderboard
                  </Link>

                  {/* Mobile Auth Actions */}
                  <div style={styles.divider}></div>

                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    style={styles.mobileNavLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    🚪 Masuk
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    style={{
                      ...styles.mobileNavLink,
                      background: "linear-gradient(to right, #facc15, #f97316)",
                      color: "white",
                      fontWeight: "600",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(to right, #f97316, #facc15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(to right, #facc15, #f97316)";
                    }}
                  >
                    ✨ Daftar
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Footer */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  closeMobileMenu();
                  // logout(); // Add logout function call here
                }}
                style={styles.logoutButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#b91c1c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#dc2626";
                }}
              >
                🚪 Keluar
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
