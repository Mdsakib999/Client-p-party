import { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import tarak from "../../assets/tarak.png";
import tarak2 from "../../assets/tarak2.png";
import fakrul from "../../assets/fakhrul.png";
import salauddin from "../../assets/salauddin.png";

const Hero = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides data
  const slides = [
    {
      id: 1,
      image: tarak,
      quote: t('hero_quote_1'),
      objectPosition: "32% 40%",
    },
    {
      id: 2,
      image: fakrul,
      quote: t('hero_quote_2'),
      objectPosition: "32% 40%",
    },
    {
      id: 3,
      image: tarak2,
      quote: t('hero_quote_3'),
      objectPosition: "center",
    },
    // {
    //   id: 4,
    //   image: bnpBanner,
    //   // image: "https://thediplomat.com/wp-content/uploads/2025/12/sizes/medium_large/thediplomat_2025-12-26-163515.jpg",
    //   quote:
    //     "Empowering citizens, strengthening democracy, ensuring prosperity for all",
    //   objectPosition: "center",
    // },
    {
      id: 5,
      image: salauddin,
      // image: "https://thediplomat.com/wp-content/uploads/2025/12/sizes/medium_large/thediplomat_2025-12-26-163515.jpg",
      quote: t('hero_quote_4'),
      objectPosition: "center",
    },
  ];

  // Auto-slide every 5 seconds
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
      {/* Slides Container */}
      <div className="relative w-full h-full rounded-md overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={`Bangladesh National Party Hero Banner ${slide.id}`}
              className="w-full h-full object-cover"
              style={{ objectPosition: slide.objectPosition }}
            />

            {/* Content */}
            <div className="absolute top-0 md:top-32 inset-0 flex flex-col md:flex-row items-center justify-end md:justify-end mb-12 ">
              <div className="text-center text-green-800 px-6 max-w-3xl ">
                <blockquote className="text-lg md:text-4xl lg:text-4xl font-bold leading-tight tracking-tight mb-8 bg-white/60 p-4 rounded t-10 md:mt-42">
                  <FaQuoteLeft className="inline mr-2 " />
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
              className={`transition-all duration-300 rounded-full ${index === currentSlide
                ? "w-8 h-2 bg-emerald-600"
                : "w-2 h-2 bg-white/60 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Join Us Button */}
      {/* <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2">
        <Link to="/login">
          <button className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors">
            Join Us
          </button>
        </Link>
      </div> */}
    </section>
  );
};

export default Hero;
