import { useEffect, useRef, useState, useMemo } from "react";

// const PROFILE_FRAMES = [
//   { id: 1, src: `/frames/profile/profile1.png`, name: "Profile Frame 1" },
//   { id: 2, src: `/frames/profile/profile2.png`, name: "Profile Frame 2" },
//   { id: 3, src: `/frames/profile/profile3.png`, name: "Profile Frame 3" },
//   { id: 4, src: `/frames/profile/profile4.png`, name: "Profile Frame 4" },
//   { id: 5, src: `/frames/profile/profile5.png`, name: "Profile Frame 5" },
//   { id: 6, src: `/frames/profile/profile6.png`, name: "Profile Frame 6" },
//   { id: 7, src: `/frames/profile/profile7.png`, name: "Profile Frame 7" },
//   { id: 8, src: `/frames/profile/profile8.png`, name: "Profile Frame 8" },
//   { id: 9, src: `/frames/profile/profile9.png`, name: "Profile Frame 9" },
//   { id: 10, src: `/frames/profile/profile10.png`, name: "Profile Frame 10" },
// ];

const PROFILE_FRAMES = [
  { id: 1, src: `/frames/profile/Congratulations.png`, name: "Profile Frame 1" },
  { id: 2, src: `/frames/profile/Congratulations-tarak-ban.png`, name: "Profile Frame 2" },
  { id: 3, src: `/frames/profile/Congratulations-tarak-eng.png`, name: "Profile Frame 3" },
  { id: 4, src: `/frames/profile/Congratulations-fakrul-eng.png`, name: "Profile Frame 4" },
  { id: 5, src: `/frames/profile/Congratulations-fakrul-ban.png`, name: "Profile Frame 5" },
];

const POST_FRAMES = [
  { id: 11, src: `/frames/posts/post1.png`, name: "Post Frame 1" },
  { id: 12, src: `/frames/posts/post2.png`, name: "Post Frame 2" },
  { id: 13, src: `/frames/posts/post3.png`, name: "Post Frame 3" },
];

const COVER_PHOTO_FRAMES = [
  { id: 14, src: `/frames/cover/cover1.png`, name: "Cover Frame 1" },
];

const FrameSelector = ({ onSelectFrame, mediaType }) => {
  const itemRefs = useRef({});
  const initializedRef = useRef(false);

  const frames = useMemo(() => {
    return mediaType === "profile"
      ? PROFILE_FRAMES
      : mediaType === "post"
        ? POST_FRAMES
        : COVER_PHOTO_FRAMES;
  }, [mediaType]);

  const [selectedId, setSelectedId] = useState(frames[0].id);

  useEffect(() => {
    frames.forEach((f) => {
      const img = new Image();
      img.src = f.src;
      img.decoding = "async";
      img.loading = "eager";
    });
  }, [frames]);

  useEffect(() => {
    if (!frames.length) return;

    if (!initializedRef.current) {
      const firstFrame = frames[0];
      setSelectedId(firstFrame.id);
      onSelectFrame(firstFrame.src);
      initializedRef.current = true;
    }
  }, [frames, onSelectFrame]);

  const handleSelect = (frame) => {
    setSelectedId(frame.id);

    onSelectFrame(frame.src);

    requestAnimationFrame(() => {
      itemRefs.current[frame.id]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  };

  const handleNext = () => {
    const currentIndex = frames.findIndex((f) => f.id === selectedId);
    handleSelect(frames[(currentIndex + 1) % frames.length]);
  };

  const handlePrev = () => {
    const currentIndex = frames.findIndex((f) => f.id === selectedId);
    handleSelect(frames[(currentIndex - 1 + frames.length) % frames.length]);
  };

  const handleKeyDown = (e, frame) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleSelect(frame);
        break;
      case "ArrowLeft":
        e.preventDefault();
        handlePrev();
        break;
      case "ArrowRight":
        e.preventDefault();
        handleNext();
        break;
    }
  };

  const showArrows = frames.length > 1;

  return (
    <div
      className="relative bg-white/80 rounded-2xl p-4 border border-emerald-100 shadow-lg flex justify-center"
      role="radiogroup"
      aria-label="Frame selection"
    >
      {showArrows && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                    w-10 h-10 rounded-full bg-white border border-emerald-200
                    shadow hover:bg-emerald-50 text-emerald-600 transition
                    flex items-center justify-center"
          aria-label="Previous frame"
        >
          ←
        </button>
      )}

      <div
        className={`flex gap-6 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-hide ${!showArrows ? "justify-center" : ""}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {frames.map((frame) => {
          const isProfile = mediaType === "profile";
          const isPost = mediaType === "post";
          const isCover = mediaType === "cover";
          const isSelected = selectedId === frame.id;

          return (
            <div
              key={frame.id}
              ref={(el) => (itemRefs.current[frame.id] = el)}
              onClick={() => handleSelect(frame)}
              onKeyDown={(e) => handleKeyDown(e, frame)}
              tabIndex={0}
              role="radio"
              aria-checked={isSelected}
              aria-label={frame.name}
              className={`snap-center shrink-0 cursor-pointer transition-all duration-300
                                ${isSelected
                  ? "scale-110"
                  : "opacity-60 hover:opacity-100"
                }
                                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-xl`}
            >
              <div
                className={`relative rounded-xl overflow-hidden border bg-gray-50
              ${isProfile && "w-20 h-20"}
              ${isPost && "w-20 h-24"}
              ${isCover && "w-36 h-20"}
              ${isSelected
                    ? "border-emerald-500 ring-4 ring-emerald-300/40 shadow-xl"
                    : "border-emerald-100"
                  }`}
              >
                <img
                  src={frame.src}
                  alt={frame.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Badge for cover photos */}
                {isCover && (
                  <span
                    className="absolute bottom-1 left-1
                                    text-[10px] px-2 py-0.5 rounded-full
                                    bg-black/70 text-white"
                  >
                    Cover
                  </span>
                )}

                {/* Selected checkmark */}
                {isSelected && (
                  <div
                    className="absolute top-1 right-1 w-5 h-5 rounded-full
                                    bg-emerald-500 text-white text-xs font-bold
                                    flex items-center justify-center shadow"
                  >
                    ✓
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      {showArrows && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                    w-10 h-10 rounded-full bg-white border border-emerald-200
                    shadow hover:bg-emerald-50 text-emerald-600 transition
                    flex items-center justify-center"
          aria-label="Next frame"
        >
          →
        </button>
      )}
    </div>
  );
};

export default FrameSelector;
