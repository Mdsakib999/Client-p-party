import { Image, User, RectangleHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

const MediaTypeSelector = ({ selectedType, onSelect }) => {
  const { t } = useTranslation();
  const mediaTypes = [
    {
      id: "post",
      icon: Image,
      title: t('frame_type_post_title'),
      description: t('frame_type_post_desc'),
      dimensions: "1500 × 1875",
    },
    {
      id: "profile",
      icon: User,
      title: t('frame_type_profile_title'),
      description: t('frame_type_profile_desc'),
      dimensions: "1080 × 1080",
    },
    {
      id: "cover",
      icon: RectangleHorizontal,
      title: t('frame_type_cover_title'),
      description: t('frame_type_cover_desc'),
      dimensions: "851 × 315",
    },
  ];

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(type);
    }
  };

  return (
    <div
      className="flex gap-5 justify-center w-full max-w-5xl mx-auto"
      role="radiogroup"
      aria-label="Select media type"
    >
      {mediaTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;

        return (
          <div
            key={type.id}
            onClick={() => onSelect(type.id)}
            onKeyDown={(e) => handleKeyDown(e, type.id)}
            tabIndex={0}
            role="radio"
            aria-checked={isSelected}
            aria-label={`${type.title} - ${type.dimensions}`}
            className={`relative flex-1 cursor-pointer rounded-2xl border transition-all duration-300
                        flex flex-col items-center gap-4 p-6
                        ${isSelected
                ? "border-emerald-500 bg-emerald-50 shadow-2xl scale-[1.03]"
                : "bg-white border-emerald-100 hover:border-emerald-300 hover:shadow-lg"
              }
                        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
                            ${isSelected
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-emerald-50 text-emerald-400"
                }`}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1">
              <h3
                className={`font-bold text-sm md:text-lg ${isSelected ? "text-emerald-800" : "text-emerald-700"}`}
              >
                {type.title}
              </h3>
              <p className="hidden md:block text-sm text-emerald-600/80">
                {type.description}
              </p>
              <span className="hidden text-xs text-emerald-500 md:block font-mono">
                {type.dimensions}
              </span>
            </div>

            {isSelected && (
              <div
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow"
                aria-hidden="true"
              >
                ✓
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaTypeSelector;
