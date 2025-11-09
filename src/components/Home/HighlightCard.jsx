import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HighlightCard = ({ newsArticle, allArticles }) => {
  const featuredNews = newsArticle;
  const newsItems = allArticles?.slice(1, 6) || [];

  const getExcerpt = (htmlString) => {
    if (!htmlString) return "";
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  if (!featuredNews) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden">
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
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                {featuredNews?.title}
              </h3>
              <p className="text-gray-200 text-lg max-w-3xl">
                {featuredNews?.quote || getExcerpt(featuredNews?.description)}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Carousel */}
      <div className="pb-8">
        <Slider {...settings}>
          {newsItems.map((news) => (
            <div key={news._id} className="px-2">
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
        </Slider>
      </div>
    </div>
  );
};

export default HighlightCard;
