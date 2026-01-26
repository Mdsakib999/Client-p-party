const MediaTypeSelector = ({ selectedType, onSelect }) => {
    return (
        <div className="flex gap-4 justify-center mb-8 w-full max-w-4xl mx-auto">
            <div
                onClick={() => onSelect("profile")}
                className={`relative flex-1 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-3 ${selectedType === "profile"
                    ? "border-green-600 bg-green-50 shadow-xl scale-105"
                    : "bg-white border-gray-200 hover:border-green-300 hover:shadow-lg"
                    }`}
            >
                <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl transition ${selectedType === "profile" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                >
                    👤
                </div>
                <div className="text-center">
                    <h3 className={`font-bold text-lg ${selectedType === "profile" ? "text-green-800" : "text-gray-700"}`}>
                        Profile Frame
                    </h3>
                    <p className="text-sm text-gray-500">For Facebook Profile Picture</p>
                    <span className="text-xs text-gray-400 mt-1 block">1080 x 1080</span>
                </div>
                {selectedType === "profile" && (
                    <div className="absolute top-3 right-3 text-green-600 text-2xl">✓</div>
                )}
            </div>

            <div
                onClick={() => onSelect("post")}
                className={`relative flex-1 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-3 ${selectedType === "post"
                    ? "border-green-600 bg-green-50 shadow-xl scale-105"
                    : "bg-white border-gray-200 hover:border-green-300 hover:shadow-lg"
                    }`}
            >
                <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl transition ${selectedType === "post" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                >
                    🖼️
                </div>
                <div className="text-center">
                    <h3 className={`font-bold text-lg ${selectedType === "post" ? "text-green-800" : "text-gray-700"}`}>
                        Post Frame
                    </h3>
                    <p className="text-sm text-gray-500">For Facebook Banner/Post</p>
                    <span className="text-xs text-gray-400 mt-1 block">1500 x 1875</span>
                </div>
                {selectedType === "post" && (
                    <div className="absolute top-3 right-3 text-green-600 text-2xl">✓</div>
                )}
            </div>
        </div>
    );
};

export default MediaTypeSelector;
