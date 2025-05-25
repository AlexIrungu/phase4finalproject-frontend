import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// import all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

// Mock hero texture imports for demo
const heroTextureImports = {
  "hero1.jpg": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "hero2.jpg": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "hero3.jpg": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
};

const MainCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = Object.values(heroTextureImports);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Carousel Images */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((texture, index) => (
          <div key={`carousel-image-${index}`} className="relative w-full h-full flex-shrink-0">
            <img
              src={texture}
              alt={`carousel-${index}`}
              className="w-full h-full object-cover"
              style={{ backgroundAttachment: "fixed" }}
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <div className="text-white p-5 rounded text-left max-w-xs sm:max-w-md md:max-w-lg ml-4 sm:ml-8 md:ml-16">
                <p className="text-purple-400 font-bold mb-2">-- NEW ITEMS</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  This Month's Newest Releases
                </h1>
                <p className="font-bold text-purple-400 underline cursor-pointer hover:text-purple-300 transition-colors">
                  Discover More
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 z-10 hover:bg-black hover:bg-opacity-30 transition-all duration-200 rounded-r"
        aria-label="Previous image"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 z-10 hover:bg-black hover:bg-opacity-30 transition-all duration-200 rounded-l"
        aria-label="Next image"
      >
        <ChevronRight size={40} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCarousel;