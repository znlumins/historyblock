import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface UserDropdownProps {
  userName: string;
  userLevel: string;
}

const UserDropdown = ({ userName, userLevel }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { icon: "👤", label: "Profil Saya", href: "/profile" },
    { icon: "📊", label: "Statistik", href: "/stats" },
    { icon: "🏆", label: "Achievement", href: "/achievements" },
    { icon: "⚙️", label: "Pengaturan", href: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const styles = {
    container: {
      position: "relative" as const,
    },
    button: {
      background: "linear-gradient(to right, #facc15, #f97316)",
      borderRadius: "8px",
      padding: "8px 16px",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      transition: "all 0.2s",
      border: "none",
      cursor: "pointer",
    },
    avatar: {
      width: "32px",
      height: "32px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      color: "white",
      fontWeight: "700",
      fontSize: "14px",
    },
    userInfo: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "flex-start",
    },
    userName: {
      color: "white",
      fontWeight: "700",
      fontSize: "14px",
      lineHeight: "1.2",
    },
    userLevel: {
      color: "#fef9c3",
      fontSize: "12px",
      lineHeight: "1.2",
    },
    arrow: {
      width: "16px",
      height: "16px",
      color: "white",
      transition: "transform 0.2s",
    },
    dropdown: {
      position: "absolute" as const,
      right: "0",
      top: "56px",
      width: "256px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      border: "1px solid #e5e7eb",
      padding: "8px 0",
      zIndex: 50,
    },
    dropdownHeader: {
      padding: "12px 16px",
      borderBottom: "1px solid #f3f4f6",
    },
    dropdownHeaderContent: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    dropdownAvatar: {
      width: "40px",
      height: "40px",
      backgroundColor: "#6b7280",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dropdownAvatarText: {
      color: "white",
      fontWeight: "700",
    },
    dropdownUserInfo: {
      flex: 1,
    },
    dropdownUserName: {
      fontWeight: "700",
      color: "#1f2937",
      fontSize: "14px",
    },
    dropdownUserLevel: {
      fontSize: "12px",
      color: "#6b7280",
    },
    menuContent: {
      padding: "8px 0",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px",
      transition: "background-color 0.2s",
      textDecoration: "none",
      color: "#374151",
    },
    menuItemIcon: {
      fontSize: "18px",
    },
    adminItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px",
      transition: "background-color 0.2s",
      textDecoration: "none",
      backgroundColor: "#fef9c3",
      color: "#654321",
      fontWeight: "600",
    },
    divider: {
      borderTop: "1px solid #f3f4f6",
      margin: "8px 0",
    },
    logoutButton: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px",
      width: "100%",
      textAlign: "left" as const,
      transition: "background-color 0.2s",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      color: "#dc2626",
    },
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.button}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(to right, #f97316, #facc15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(to right, #facc15, #f97316)";
        }}
      >
        {/* User Avatar */}
        <div style={styles.avatar}>
          <span style={styles.avatarText}>{getInitials(userName)}</span>
        </div>

        {/* User Info */}
        <div style={styles.userInfo}>
          <div style={styles.userName}>{userName}</div>
          <div style={styles.userLevel}>{userLevel}</div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          style={{
            ...styles.arrow,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={styles.dropdown}>
          {/* User Info Header */}
          <div style={styles.dropdownHeader}>
            <div style={styles.dropdownHeaderContent}>
              <div style={styles.dropdownAvatar}>
                <span style={styles.dropdownAvatarText}>
                  {getInitials(userName)}
                </span>
              </div>
              <div style={styles.dropdownUserInfo}>
                <div style={styles.dropdownUserName}>{userName}</div>
                <div style={styles.dropdownUserLevel}>{userLevel}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div style={styles.menuContent}>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                style={styles.menuItem}
                onClick={() => setIsOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span style={styles.menuItemIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Admin Menu (only for admin users) */}
            {user?.role === "admin" && (
              <>
                <div style={styles.divider}></div>
                <Link
                  to="/admin"
                  style={styles.adminItem}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#facc15";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fef9c3";
                  }}
                >
                  <span style={styles.menuItemIcon}>🛠️</span>
                  <span>Admin Dashboard</span>
                </Link>
              </>
            )}
          </div>

          {/* Separator */}
          <div style={styles.divider}></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fef2f2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span style={styles.menuItemIcon}>🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
