import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const frames = [
    { id: 1, src: "src/assets/frame1.png", name: "Classic BN" },
    { id: 2, src: "src/assets/frame2.png", name: "Golden" },
    { id: 3, src: "src/assets/frame3.png", name: "Circle Wheat" },
    { id: 4, src: "src/assets/frame4.png", name: "Modern Flat" },
    { id: 5, src: "src/assets/frame5.png", name: "Artistic" },
];

const FrameSelector = ({ onSelectFrame }) => {
    const [selectedId, setSelectedId] = useState(1);

    const handleSelect = (frame) => {
        setSelectedId(frame.id);
        onSelectFrame(frame.src);
    };

    return (
        <div className="w-full mt-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-700 font-semibold text-center w-full">Select Frame</h3>
            </div>

            <div className="relative flex items-center justify-center gap-2 px-2">
                <button className="p-2 rounded-full bg-gray-200 hover:bg-green-100 text-gray-600 hover:text-green-700 transition">
                    <FaChevronLeft />
                </button>

                <div className="flex gap-3 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide snap-x justify-center flex-wrap">
                    {frames.map((frame) => (
                        <div
                            key={frame.id}
                            className={`snap-center flex-shrink-0 cursor-pointer transition-all duration-300 relative group ${selectedId === frame.id ? "transform scale-110" : "opacity-70 hover:opacity-100"
                                }`}
                            onClick={() => handleSelect(frame)}
                        >
                            <div className={`w-20 h-20 rounded-lg overflow-hidden border-2 bg-white ${selectedId === frame.id ? "border-green-600 shadow-md ring-2 ring-green-100" : "border-gray-200"
                                }`}>
                                <img src={frame.src} alt={frame.name} className="w-full h-full object-cover" />
                            </div>
                            {selectedId === frame.id && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>

                <button className="p-2 rounded-full bg-gray-200 hover:bg-green-100 text-gray-600 hover:text-green-700 transition">
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default FrameSelector;
