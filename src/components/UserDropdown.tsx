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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-500 hover:bg-yellow-600 rounded-lg px-4 py-2 text-white flex items-center gap-3 transition-colors"
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {getInitials(userName)}
          </span>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start">
          <div className="text-white font-bold text-sm">
            {userName}
          </div>
          <div className="text-yellow-100 text-xs">
            {userLevel}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-white transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
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
        <div className="absolute right-0 top-14 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {getInitials(userName)}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-sm">
                  {userName}
                </div>
                <div className="text-xs text-gray-600">
                  {userLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">
                  {item.icon}
                </span>
                <span className="text-gray-700">
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Admin Menu (only for admin users) */}
            {user?.role === "admin" && (
              <>
                <div className="border-t border-gray-100 my-2"></div>
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-yellow-50 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">🛠️</span>
                  <span className="text-yellow-600 font-semibold">
                    Admin Dashboard
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100 my-2"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-50 transition-colors group"
          >
            <span className="text-lg">🚪</span>
            <span className="text-red-600">Keluar</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
