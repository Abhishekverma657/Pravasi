// import { NavLink } from "react-router-dom";
// import { useState } from "react";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const menuItems = [
//     { name: "Dashboard", path: "/" },
//     { name: "Hero Slider", path: "/hero-slider" },
//         { name: "Mission", path: "/mission" },
//   ];

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="md:hidden p-2 m-2 bg-gray-700 text-white rounded"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static top-0 left-0 h-full w-60 bg-gray-800 text-white transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 md:translate-x-0 z-50`}
//       >
//         <h1 className="text-xl font-bold p-4 border-b border-gray-700">
//           Pravasi Admin
//         </h1>
//         <ul className="p-4 space-y-2">
//           {menuItems.map((item) => (
//             <li key={item.path}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `block px-4 py-2 rounded ${
//                     isActive
//                       ? "bg-[#D90165] text-white"
//                       : "hover:bg-gray-700"
//                   }`
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

// import { NavLink } from "react-router-dom";

// export default function Sidebar({ collapsed, setCollapsed }) {
//   const menuItems = [
//     { name: "Dashboard", path: "/" },
//     { name: "Hero Slider", path: "/hero-slider" },
//     { name: "Mission", path: "/mission" },
//   ];

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       {collapsed && (                     // ✅ Show only if sidebar is closed
//         <button
//           className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded md:hidden"
//           onClick={() => setCollapsed(false)}
//         >
//           ☰
//         </button>
//       )}
//       {/* Sidebar */}
//       <div
//         className={`
//           fixed top-0 left-0 h-screen w-56 bg-gray-800 text-white z-40
//           transition-transform duration-300 ease-in-out
//           ${collapsed ? "-translate-x-full" : "translate-x-0"}
//           md:translate-x-0 md:static
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <h1 className="text-xl font-bold">Pravasi Admin</h1>
//           <button
//             className="md:hidden text-2xl"
//             onClick={() => setCollapsed(true)}
//           >
//             ×
//           </button>
//         </div>

//         {/* Menu */}
//         <ul className="p-4 space-y-1">
//           {menuItems.map((item) => (
//             <li key={item.path}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `block px-4 py-2 rounded transition-colors
//                   ${isActive ? "bg-[#D90165]" : "hover:bg-gray-700"}`
//                 }
//                 onClick={() => setCollapsed(true)} // close on mobile
//               >
//                 {item.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Mobile Overlay */}
//       {!collapsed && (
//         <div
//           className="fixed inset-0 bg-transparent bg-opacity-40 z-30 md:hidden"
//           onClick={() => setCollapsed(true)}
//         />
//       )}
//     </>
//   );
// }

import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Hero Slider", path: "/hero-slider" },
    { name: "Mission", path: "/mission" },
    { name: "People List", path: "/people" },
    { name: "Featured Events", path: "/featured-events" },
    { name: "Benefits", path: "/benefits" },
    { name: "News & Updates", path: "/news" },  
    { name: "Gallery", path: "/gallery" },
    { name: "Media & Blogs", path: "/media-blogs" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },

    

  ];

  const [scrollY, setScrollY] = useState(0);

  // Track sidebar scroll
  const handleScroll = (e) => setScrollY(e.target.scrollTop);

  return (
    <>
      {/* Mobile Toggle Button */}
      {collapsed && (
        <button
          className="fixed top-4 left-4 z-50 p-2bg-[#97479D] text-white rounded md:hidden shadow-lg"
          onClick={() => setCollapsed(false)}
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
        </ul>
      </div>

      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
