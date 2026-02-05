import { useTranslation } from "react-i18next";
import Leaders from "../../utils/Leaders";

const Legacy = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 tracking-tight">
          {t('legacy_title')}
        </h2>

        {/* Description */}
        <p className="text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t('legacy_desc')}
        </p>

        {/* Carousel */}
        <Leaders />
      </div>
    </section>
  );
};

export default Legacy;
