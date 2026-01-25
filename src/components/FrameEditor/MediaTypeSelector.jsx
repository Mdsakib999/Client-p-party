import { FaUserCircle, FaImage } from "react-icons/fa";

const MediaTypeSelector = ({ selectedType, onSelect }) => {
    return (
        <div className="flex gap-4 justify-center mb-8 w-full max-w-4xl mx-auto">
            {/* Profile Frame Card */}
            <div
                onClick={() => onSelect("profile")}
                className={`flex-1 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-3 bg-white hover:shadow-lg ${selectedType === "profile"
                    ? "border-green-600 bg-green-50 shadow-md transform scale-105"
                    : "border-gray-200 hover:border-green-300"
                    }`}
            >
                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${selectedType === "profile"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-500"
                        }`}
                >
                    <FaUserCircle />
                </div>
                <div className="text-center">
                    <h3
                        className={`font-bold text-lg ${selectedType === "profile" ? "text-green-800" : "text-gray-700"
                            }`}
                    >
                        Profile Frame
                    </h3>
                    <p className="text-sm text-gray-500">For Facebook Profile Picture</p>
                    <span className="text-xs text-gray-400 mt-1 block">1080 x 1080</span>
                </div>
                {selectedType === "profile" && (
                    <div className="absolute top-3 right-3 text-green-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                )}
            </div>

            {/* Post Frame Card */}
            <div
                onClick={() => onSelect("post")}
                className={`flex-1 p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-3 bg-white hover:shadow-lg ${selectedType === "post"
                    ? "border-green-600 bg-green-50 shadow-md transform scale-105"
                    : "border-gray-200 hover:border-green-300"
                    }`}
            >
                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${selectedType === "post"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-500"
                        }`}
                >
                    <FaImage />
                </div>
                <div className="text-center">
                    <h3
                        className={`font-bold text-lg ${selectedType === "post" ? "text-green-800" : "text-gray-700"
                            }`}
                    >
                        Post Frame
                    </h3>
                    <p className="text-sm text-gray-500">For Facebook Banner/Post</p>
                    <span className="text-xs text-gray-400 mt-1 block">1500 x 1875</span>
                </div>
                {selectedType === "post" && (
                    <div className="absolute top-3 right-3 text-green-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaTypeSelector;
