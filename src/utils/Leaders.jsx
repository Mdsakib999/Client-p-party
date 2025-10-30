import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Leaders() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "./src/assets/leader-1.jpg",
      alt: "Ziaur Rahman",
    },
    {
      id: 2,
      image: "./src/assets/leader-2.jpg",
      alt: "Khaleda Zia",
    },
    {
      id: 3,
      image: "./src/assets/leader-3.jpg",
      alt: "Tarique Rahman",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
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
    <div className="relative max-w-6xl mx-auto mt-12">
      {/* Stacked Images */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => {
          const offset = index - currentSlide;
          const isActive = index === currentSlide;

          // Calculate position for desktop (both sides visible)
          const getTransform = () => {
            if (isActive) return 0;
            // On larger screens, spread images on both sides
            return offset * 90;
          };

          return (
            <div
              key={slide.id}
              className={`absolute transition-all duration-500 ease-out ${
                isActive
                  ? "z-30 scale-100 opacity-100"
                  : Math.abs(offset) === 1
                  ? "z-20 md:scale-90 scale-75 opacity-60 md:opacity-70 blur-[1px]"
                  : "z-10 scale-75 opacity-0 md:opacity-40 blur-sm pointer-events-none"
              }`}
              style={{
                transform: `translateX(${getTransform()}px) scale(${
                  isActive ? 1 : Math.abs(offset) === 1 ? 0.9 : 0.75
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
