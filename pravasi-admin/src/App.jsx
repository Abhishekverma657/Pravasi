// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import HeroSlider from "./pages/HeroSlider";
// // import MissionPage from "./pages/MissionPage";
// // import Sidebar from "./components/Sidebar";
// // import { useState } from "react";

// // function App() {
// //   const [collapsed, setCollapsed] = useState(true);

// //   return (
// //     <Router>
// //       <div className="flex min-h-screen bg-gray-100">
// //         <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
// //         <div
// //           className={`flex-1 p-4 transition-all duration-300 ${
// //             // md:ml-56 means margin-left on desktop, 0 on mobile
// //             "md:ml-56"
// //           }`}
// //         >
// //           <Routes>
// //             <Route path="/" element={<HeroSlider />} />
// //             <Route path="/hero-slider" element={<HeroSlider />} />
// //             <Route path="/mission" element={<MissionPage />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import HeroSlider from "./pages/HeroSlider";
// import MissionPage from "./pages/MissionPage";

// function App() {
//   const [collapsed, setCollapsed] = useState(true);

//   return (
//     <Router>
//       <div className="flex min-h-screen bg-gray-100">
//         {/* Sidebar */}
//         <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//         {/* Page Content */}
//         <div
//           className={`
//             flex-1 p-1 transition-all duration-300
//             md:ml-0            /* desktop left margin for sidebar */
//             ${collapsed ? "ml-0" : ""}
//           `}
//         >
//           <Routes>
//             <Route path="/" element={<HeroSlider />} />
//             <Route path="/hero-slider" element={<HeroSlider />} />
//             <Route path="/mission" element={<MissionPage />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import HeroSlider from "./pages/HeroSlider";
import MissionPage from "./pages/MissionPage";
import PeoplePage from "./pages/PeoplePage";
import FeaturedEventsPage from "./pages/FeaturedEventsPage";
import BenefitsPage from "./pages/BenefitsPage";
import NewsPage from "./pages/NewsPage";
import GalleryPage from "./pages/GalleryPage";
import MediaBlogs from "./pages/MediaBlogs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";   


function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Page Content */}
        <div
          className={`
            flex-1 transition-all duration-300
            ${collapsed ? "ml-0" : "ml-56"} 
            overflow-y-auto h-screen
            p-4
          `}
        >
          <Routes>
            <Route path="/" element={<HeroSlider />} />
            <Route path="/hero-slider" element={<HeroSlider />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/people" element={<PeoplePage />} />
             <Route path="/featured-events" element={<FeaturedEventsPage />} />
            
            <Route path="/benefits" element={<BenefitsPage />} />
            
            <Route path="/news" element={<NewsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
           
            <Route path="/media-blogs" element={<MediaBlogs />} />
           
            <Route path="/contact" element={<Contact />} />

            <Route path="/faq" element={<FAQ />} />



             
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
