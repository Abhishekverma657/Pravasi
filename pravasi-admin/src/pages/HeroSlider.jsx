// import { useState } from "react";
// import HeroSliderTable from "../components/hero/HeroSliderTable";
// import HeroSliderModal from "../components/hero/HeroSliderModal";
// import AnimatedButton from "../components/Common/button";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function HeroSlider() {
//   const [slides, setSlides] = useState([
//     {
//       id: 1,
//       title: "Welcome to Pravasi",
//       subtitle: "Empowering communities",
//       image: "https://via.placeholder.com/1200x500",
//     },
//   ]);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   // Move slide up/down
//   const moveSlide = (index, direction) => {
//     if (
//       (direction === "up" && index === 0) ||
//       (direction === "down" && index === slides.length - 1)
//     )
//       return;
//     const newSlides = [...slides];
//     const swapWith = direction === "up" ? index - 1 : index + 1;
//     [newSlides[index], newSlides[swapWith]] = [newSlides[swapWith], newSlides[index]];
//     setSlides(newSlides);
//   };

//   const handleSave = (slide) => {
//     if (editing) {
//       setSlides(slides.map((s) => (s.id === slide.id ? slide : s)));
//     } else {
//       setSlides([...slides, { ...slide, id: Date.now() }]);
//     }
//     setModalOpen(false);
//     setEditing(null);
//   };

//   const handleDelete = (id) => {
//     setSlides(slides.filter((s) => s.id !== id));
//   };

//   // Slider settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 400,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3500,
//     adaptiveHeight: true,
//     pauseOnHover: true,
//   };

//   return (
//     <div className="p-6">
//       {/* Table (Order Control) */}
//       <div className="mb-10">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Hero Slider</h1>
//           <AnimatedButton
//             text="+ Add Slide"
//             onClick={() => setModalOpen(true)}
//           />
//         </div>
//         <HeroSliderTable
//           slides={slides}
//           onEdit={(slide) => {
//             setEditing(slide);
//             setModalOpen(true);
//           }}
//           onDelete={handleDelete}
//           onMove={moveSlide}
//         />
//       </div>

//       {/* Live Preview */}
//       <div>
//         <h2 className="text-xl font-bold mb-3">Live Slider Preview</h2>
//         <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
//           <Slider {...sliderSettings}>
//             {slides.map((slide) => (
//               <div key={slide.id}>
//                 <div
//                   className="w-full h-[350px] md:h-[450px] flex items-center justify-center relative"
//                   style={{
//                     backgroundImage: `url(${slide.image})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                 >
//                   <div className="absolute p-2 inset-0 bg-transparent " />
//                   <div className="relative  z-10 w-full flex flex-col items-center justify-center text-center">
//                     <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-3">
//                       {slide.title}
//                     </h2>
//                     <p className="text-lg md:text-2xl text-white font-medium drop-shadow">
//                       {slide.subtitle}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <HeroSliderModal
//           open={modalOpen}
//           slide={editing}
//           onSave={handleSave}
//           onClose={() => {
//             setModalOpen(false);
//             setEditing(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  getHeroSlides,
  addHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "../api/heroSliderApi";
import HeroSliderTable from "../components/hero/HeroSliderTable";
import HeroSliderModal from "../components/hero/HeroSliderModal";
import AnimatedButton from "../components/Common/button";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import Loader from "../components/Common/Loader";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fetch all slides
  const fetchSlides = async () => {
    try {
      setLoading(true);
      const data = await getHeroSlides();
      setSlides(data);
    } catch (err) {
      toast.error("Failed to load slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleSave = async (form) => {
    try {
      setLoading(true);
      if (editing) {
        await updateHeroSlide(editing._id, form);
        toast.success("Slide updated successfully");
      } else {
        await addHeroSlide(form);
        toast.success("Slide added successfully");
      }
      fetchSlides();
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      toast.error("Error saving slide");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteHeroSlide(id);
      toast.success("Slide deleted successfully");
      fetchSlides();
    } catch (err) {
      toast.error("Error deleting slide");
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
    adaptiveHeight: true,
    pauseOnHover: true,
  };

  return (
    <div className="p-6">
      {loading && <Loader text="Please wait..." />}

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Hero Slider</h1>
          <AnimatedButton text="+ Add Slide" onClick={() => setModalOpen(true)} />
        </div>

        <HeroSliderTable
          slides={slides}
          onEdit={(slide) => {
            setEditing(slide);
            setModalOpen(true);
          }}
          onDelete={(slide) => setConfirmDelete(slide)}
        />
      </div>

      {/* Live Preview */}
      <div>
        <h2 className="text-xl font-bold mb-3">Live Slider Preview</h2>
        <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <Slider {...sliderSettings}>
            {slides.map((slide) => (
              <div key={slide._id}>
                <div
                  className="w-full h-[350px] md:h-[450px] flex items-center justify-center relative"
                  style={{
                    backgroundImage: `url(http://31.97.231.85:2700${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-3">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-2xl text-white font-medium drop-shadow">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {modalOpen && (
        <HeroSliderModal
          open={modalOpen}
          slide={editing}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          open={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete._id)}
        />
      )}
    </div>
  );
}
