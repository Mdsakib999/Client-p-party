import { useTranslation } from "react-i18next";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

const Highlights = () => {
  const { t } = useTranslation();
  return (
    <section className="relative py-44 px-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat object-contain"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dvwhbp6vw/image/upload/v1769676535/tr_q6fsmz.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-green-900/70" />

      <div className="relative max-w-7xl mx-auto text-center text-white">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          {t('highlights_title')}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-10">
          {t('highlights_desc')}
        </p>

        {/* CTA */}
        <Link
          to="/contact"
          className="
            inline-flex items-center gap-3
            px-10 py-4
            rounded-full
            bg-white text-green-800
            text-lg font-semibold
            shadow-lg
            transition-all duration-300
            hover:bg-gradient-to-r from-green-600 via-green-700 to-green-700 hover:text-white
            transform
            hover:-translate-y-0.5
            focus:ring-4 focus:ring-white/40
          "
        >
          {t('highlights_cta')}
          <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        {/* Subtext */}
        <p className="mt-8 text-sm text-green-50">
          {t('highlights_subtext')}
        </p>
      </div>
    </section>
  );
};

export default Highlights;
