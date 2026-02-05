import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div className="relative order-1 lg:order-1">
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-2xl">
              <img
                src="https://morenewsbd.com/storage/posts/2025/12/8287c938ebae1b6e5eff99f98e6f62fd13e0.jpg"
                alt="Champion of Democracy in Bangladesh"
                className="w-full h-[280px] sm:h-[400px] md:h-[480px] lg:h-[520px] object-cover object-center transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-2 lg:order-2 space-y-4 sm:space-y-6">
            <div className="inline-flex">
              <span className="bg-green-700 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-md">
                {t('about_badge')}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              {t('about_title')}
            </h2>

            <div className="w-16 sm:w-20 h-1 bg-green-700 rounded-full"></div>

            <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-relaxed lg:leading-relaxed">
              {t('about_desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;