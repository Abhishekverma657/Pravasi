import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ collapsed, setCollapsed }) {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Hero Slider", path: "/hero-slider" },
    { name: "Mission", path: "/mission" },
    { name: "People List", path: "/people" },
    { name: "Featured Events", path: "/featured-events" },
    { name: "Benefits", path: "/benefits" },
    { name: "News & Updates", path: "/news" },
    { name: "Featured Business ", path: "/business" },
    { name: "Gallery", path: "/gallery" },
    { name: "Media & Blogs", path: "/media-blogs" },
    { name: "Our Root", path: "/our-root" },
    { name: "Advertise", path: "/advertise" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Notifications", path: "/notifications" },
    {name:"Chapters", path:"/chapters" },
    {name:"Activity",path:"/activity"}
  ];

  const [scrollY, setScrollY] = useState(0);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext) || {};

  // Track sidebar scroll
  const handleScroll = (e) => setScrollY(e.target.scrollTop);

  return (
    <>
      {/* Mobile Toggle Button */}
      {collapsed && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-[#97479D] text-white rounded md:hidden shadow-lg"
          onClick={() => setCollapsed(false)}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-56 bg-[#97479D] text-white z-40
          transition-transform duration-300 ease-in-out
          ${collapsed ? "-translate-x-full" : "translate-x-0"}
          md:translate-x-0 md:static
          overflow-y-auto
          ${scrollY > 0 ? "shadow-lg" : ""}
        `}
        onScroll={handleScroll}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4  sticky top-0 bg-[#97479D] z-10">
          <h1 className="text-xl font-bold">Pravasi Admin</h1>
          <button
            className="md:hidden text-2xl"
            onClick={() => setCollapsed(true)}
          >
            ×
          </button>
        </div>

        {/* Menu */}
        <ul className="p-4 space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-all duration-300
                  ${isActive ? "bg-[#EBA832] text-white font-semibold scale-105" : "hover:bg-gray-600 hover:scale-105"}`
                }
                onClick={() => setCollapsed(true)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* Logout button at bottom of menu */}
          <li className="mt-4">
            <button
              onClick={() => {
                // clear auth and navigate to login
                try { localStorage.removeItem('isAuthenticated'); } catch (e) {}
                if (setIsAuthenticated) setIsAuthenticated(false);
                setCollapsed(true);
                navigate('/login');
              }}
              className="w-full text-left flex items-center gap-3 px-4 py-2 rounded bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4.5A1.5 1.5 0 014.5 3h6A1.5 1.5 0 0122 4.5v11A1.5 1.5 0 0120.5 17H4.5A1.5 1.5 0 013 15.5v-11zM10 9a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 9z" clipRule="evenodd" />
              </svg>
              <span className="text-black">Log out</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Overlay - subtle translucent + blur, not solid black */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-white bg-opacity-6 backdrop-blur-sm z-30 md:hidden transition-opacity duration-200"
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
