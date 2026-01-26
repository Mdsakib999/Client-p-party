import { useEffect, useRef, useState } from "react";

const FrameSelector = ({ onSelectFrame, mediaType }) => {
    const profileFrames = [
        { id: 1, src: "/frames/profile/profile2.png", name: "Profile Frame 2" },
        { id: 2, src: "/frames/profile/profile3.png", name: "Profile Frame 3" },
        { id: 3, src: "/frames/profile/profile4.png", name: "Profile Frame 4" },
        { id: 4, src: "/frames/profile/profile5.png", name: "Profile Frame 5" },
    ];

    const postFrames = [
        { id: 6, src: "/frames/posts/post1.png", name: "Post Frame 1" },
        { id: 7, src: "/frames/posts/post2.png", name: "Post Frame 2" },
    ];

    const frames = mediaType === "profile" ? profileFrames : postFrames;
    const [selectedId, setSelectedId] = useState(frames[0].id);
    const scrollRef = useRef(null);

    // Update selected frame when media type changes
    useEffect(() => {
        const firstFrame = frames[0];
        setSelectedId(firstFrame.id);
        onSelectFrame(firstFrame.src);
    }, [mediaType]);

    const handleSelect = (frame) => {
        setSelectedId(frame.id);
        onSelectFrame(frame.src);
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 120;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-green-700 transition"
            >
                ←
            </button>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 px-12 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {frames.map((frame) => (
                    <div
                        key={frame.id}
                        onClick={() => handleSelect(frame)}
                        className={`snap-center flex-shrink-0 cursor-pointer transition-all duration-300 ${selectedId === frame.id ? "scale-110" : "opacity-60 hover:opacity-100"
                            }`}
                    >
                        <div
                            className={`w-20 h-${mediaType === "profile" ? "20" : "24"} rounded-xl overflow-hidden border-4 ${selectedId === frame.id
                                ? "border-white shadow-xl ring-4 ring-white/30"
                                : "border-white/30"
                                }`}
                        >
                            <img src={frame.src} alt={frame.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-green-700 transition"
            >
                →
            </button>
        </div>
    );
};

export default FrameSelector;