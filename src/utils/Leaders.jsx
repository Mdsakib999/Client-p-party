import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import leader1 from "../assets/leader-1.jpg";
import leader2 from "../assets/leader-2.jpg";
import leader3 from "../assets/leader-3.jpg";

export default function Leaders() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    {
      id: 1,
      image: leader1,
      alt: "Ziaur Rahman",
    },
    {
      id: 2,
      image: leader2,
      alt: "Khaleda Zia",
    },
    {
      id: 3,
      image: leader3,
      alt: "Tarique Rahman",
    },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative max-w-7xl mx-auto mt-12">
      {/* Stacked Images */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => {
          // Calculate circular positions to always show 3 images: left, center, right
          const normalizedIndex =
            (index - currentSlide + slides.length) % slides.length;
          const isActive = normalizedIndex === 0;
          const isLeft = normalizedIndex === slides.length - 1;
          const isRight = normalizedIndex === 1;
          const offset = isLeft ? -1 : isRight ? 1 : 0;

          // Calculate position for circular layout (always 3 images visible)
          const getTransform = () => {
            if (isActive) return 0;
            // Position left and right images - closer on mobile, further on desktop
            const spread = isMobile ? 90 : 300;
            return offset * spread;
          };

          return (
            <div
              key={slide.id}
              className={`absolute transition-all duration-500 ease-out ${
                isActive
                  ? "z-30 scale-100 opacity-100"
                  : isLeft || isRight
                  ? "z-20 scale-75 md:scale-85 opacity-80 blur-[0.5px]"
                  : "z-10 scale-50 opacity-0 pointer-events-none"
              }`}
              style={{
                transform: `translateX(${getTransform()}px) scale(${
                  isActive ? 1 : isLeft || isRight ? 0.85 : 0.5
                })`,
              }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] h-[250px] sm:h-[300px] md:h-[360px] lg:h-[420px] object-cover rounded-3xl"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-12">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous slide"
        >
          <HiChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-green-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next slide"
        >
          <HiChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
