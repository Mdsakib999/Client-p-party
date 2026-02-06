import { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Desktop images
import tarak from "../../assets/tarak.png";
import tarak2 from "../../assets/tarak2.png";
import fakrul from "../../assets/fakhrul.png";
import salauddin from "../../assets/salauddin.png";

// Mobile images
import fakrulmobile from "../../assets/fafrulMobile.png";
import salauddinMobile from "../../assets/salauddinMobile.png";
import tarakMobile from "../../assets/tarakMobile.png";
import tarakMobile1 from "../../assets/tarakMobile1.png";

const Hero = () => {
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size (Tailwind sm = 640px)
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Hero slides
  const slides = [
    {
      id: 1,
      image: tarak,
      mobileImage: tarakMobile,
      quote: t("hero_quote_1"),
      objectPosition: "32% 40%",
    },
    {
      id: 2,
      image: fakrul,
      mobileImage: fakrulmobile,
      quote: t("hero_quote_2"),
      objectPosition: "32% 40%",
    },
    {
      id: 3,
      image: tarak2,
      mobileImage: tarakMobile1,
      quote: t("hero_quote_3"),
      objectPosition: "center",
    },
    {
      id: 5,
      image: salauddin,
      mobileImage: salauddinMobile,
      quote: t("hero_quote_4"),
      objectPosition: "center",
    },
  ];

  // Auto slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full h-[500px] md:h-[600px] lg:h-[550px] max-w-7xl mx-auto overflow-hidden pt-24 p-4 relative mb-12">
      <div className="relative w-full h-full rounded-md overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={isMobile ? slide.mobileImage : slide.image}
              alt={`Bangladesh National Party Hero Banner ${slide.id}`}
              className="w-full h-full object-cover"
              style={{ objectPosition: slide.objectPosition }}
            />

            {/* Quote Content */}
            <div className="absolute top-0 md:top-32 inset-0 flex items-end justify-end mb-2 ">
              <div className="text-center text-green-800 px-6 max-w-3xl">
                <blockquote className="text- md:text-3xl lg:text-3xl font-bold leading-tight tracking-tight mb-8 bg-white/60 p-4 rounded">
                  <FaQuoteLeft className="inline mr-2" />
                  {slide.quote}
                  <FaQuoteRight className="inline ml-2" />
                </blockquote>
              </div>
            </div>
          </div>
        ))}

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-8 h-2 bg-emerald-600"
                  : "w-2 h-2 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
