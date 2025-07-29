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
        className="bg-gradient-to-r from-historic-yellow to-historic-orange rounded-lg border-0 h-12 px-4 relative hover:from-historic-orange hover:to-historic-yellow transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-3 min-w-[200px]"
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-white font-quicksand font-bold text-sm">
            {getInitials(userName)}
          </span>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start flex-1">
          <div className="text-white font-quicksand font-bold text-sm leading-tight truncate max-w-[120px]">
            {userName}
          </div>
          <div className="text-historic-yellow-light font-quicksand text-xs leading-tight">
            {userLevel}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${
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
        <div className="absolute right-0 top-14 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-historic-brown rounded-full flex items-center justify-center">
                <span className="text-white font-quicksand font-bold">
                  {getInitials(userName)}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-quicksand font-bold text-gray-800 dark:text-gray-200 text-sm">
                  {userName}
                </div>
                <div className="font-quicksand text-xs text-gray-600 dark:text-gray-400">
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
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-quicksand text-gray-700 dark:text-gray-300 group-hover:text-historic-brown dark:group-hover:text-historic-yellow">
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Admin Menu (only for admin users) */}
            {user?.role === "admin" && (
              <>
                <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-historic-cream dark:hover:bg-gray-700 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    🛠️
                  </span>
                  <span className="font-quicksand text-historic-brown dark:text-historic-yellow font-semibold">
                    Admin Dashboard
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">
              🚪
            </span>
            <span className="font-quicksand text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
              Keluar
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
