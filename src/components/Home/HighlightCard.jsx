import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";

const HighlightCard = ({ newsArticle, allArticles }) => {
  const featuredNews = newsArticle;
  const newsItems = allArticles || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  const getExcerpt = (htmlString) => {
    if (!htmlString) return "";
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow, newsItems.length]);

  const maxIndex = Math.max(0, newsItems.length - slidesToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!featuredNews) return null;

  const translateValue = -(currentIndex * (100 / slidesToShow));
  const dotsCount = maxIndex + 1;

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-6">
        <Link to={`/news/${featuredNews?.slug}`} className="block">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
            <img
              src={featuredNews?.images[0]?.url}
              alt={featuredNews?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="uppercase inline-block bg-white text-black px-3 py-1 rounded-full text-sm font-medium mb-4">
                {featuredNews?.tags?.[0] || "News"}
              </span>
              <h3 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
                {featuredNews?.title}
              </h3>
              <p className="text-gray-200 text-lg max-w-3xl">
                {featuredNews?.quote || getExcerpt(featuredNews?.description)}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {newsItems.length > 0 && (
        <div className="pb-8 w-full relative">
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${translateValue}%)`,
              }}
            >
              {newsItems.map((news) => (
                <div
                  key={news._id}
                  className="px-2 flex-shrink-0"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <Link to={`/news/${news.slug}`} className="block group">
                    <div className="relative h-[200px] rounded-2xl overflow-hidden">
                      <img
                        src={news?.images?.[0]?.url}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-bold text-sm leading-tight">
                          {news.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: dotsCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                  ? "w-8 h-2 bg-black"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightCard;
