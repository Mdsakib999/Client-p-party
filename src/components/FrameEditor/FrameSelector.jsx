import { useEffect, useRef, useState } from "react";

const FrameSelector = ({ onSelectFrame, mediaType }) => {
    const itemRefs = useRef({});

    const profileFrames = [
        { id: 1, src: "/frames/profile/profile2.png", name: "Profile Frame 2" },
        { id: 2, src: "/frames/profile/profile3.png", name: "Profile Frame 3" },
        { id: 3, src: "/frames/profile/profile4.png", name: "Profile Frame 4" },
        { id: 4, src: "/frames/profile/profile5.png", name: "Profile Frame 5" },
        { id: 5, src: "/frames/profile/profile6.png", name: "Profile Frame 6" },
    ];

    const postFrames = [
        { id: 6, src: "/frames/posts/post1.png", name: "Post Frame 1" },
        { id: 7, src: "/frames/posts/post2.png", name: "Post Frame 2" },
    ];

    const coverPhotoFrames = [
        { id: 8, src: "/frames/cover/cover1.png", name: "Cover Frame 1" },
    ];

    const frames =
        mediaType === "profile"
            ? profileFrames
            : mediaType === "post"
                ? postFrames
                : coverPhotoFrames;

    const [selectedId, setSelectedId] = useState(frames[0].id);

    useEffect(() => {
        const firstFrame = frames[0];
        setSelectedId(firstFrame.id);
        onSelectFrame(firstFrame.src);
    }, [mediaType]);

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

    const showArrows = frames.length > 1;

    return (
        <div className="relative bg-white/80 rounded-2xl p-4 border border-emerald-100 shadow-lg flex justify-center">
            {/* Left Arrow */}
            {showArrows && (
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                    w-10 h-10 rounded-full bg-white border border-emerald-200
                    shadow hover:bg-emerald-50 text-emerald-600 transition
                    flex items-center justify-center"
                >
                    ←
                </button>
            )}

            <div
                className={`flex gap-6 overflow-x-auto py-3 snap-x snap-mandatory scrollbar-hide ${!showArrows ? "justify-center" : ""}`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {frames.map((frame) => {
                    const isProfile = mediaType === "profile";
                    const isPost = mediaType === "post";
                    const isCover = mediaType === "cover";

                    return (
                        <div
                            key={frame.id}
                            ref={(el) => (itemRefs.current[frame.id] = el)}
                            onClick={() => handleSelect(frame)}
                            className={`snap-center flex-shrink-0 cursor-pointer transition-all duration-300
                                ${selectedId === frame.id
                                    ? "scale-110"
                                    : "opacity-60 hover:opacity-100"
                                }`}
                        >
                            <div
                                className={`relative rounded-xl overflow-hidden border
                                ${isProfile && "w-20 h-20"}
                                ${isPost && "w-20 h-24"}
                                ${isCover && "w-36 h-20"}
                                ${selectedId === frame.id
                                        ? "border-emerald-500 ring-4 ring-emerald-300/40 shadow-xl"
                                        : "border-emerald-100"
                                    }`}
                            >
                                <img
                                    src={frame.src}
                                    alt={frame.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Badge */}
                                {isCover && (
                                    <span className="absolute bottom-1 left-1
                                    text-[10px] px-2 py-0.5 rounded-full
                                    bg-black/70 text-white">
                                        Cover
                                    </span>
                                )}

                                {selectedId === frame.id && (
                                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full
                                    bg-emerald-500 text-white text-xs font-bold
                                    flex items-center justify-center shadow">
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
                >
                    →
                </button>
            )}
        </div>
    );
};

export default FrameSelector;