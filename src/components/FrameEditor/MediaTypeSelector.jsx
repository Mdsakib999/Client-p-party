import { Image, User, RectangleHorizontal } from "lucide-react";

const MediaTypeSelector = ({ selectedType, onSelect }) => {
    return (
        <div className="flex gap-5 justify-center mb-3 w-full max-w-5xl mx-auto">

            {/* PROFILE */}
            <div
                onClick={() => onSelect("profile")}
                className={`relative flex-1 cursor-pointer rounded-2xl border transition-all duration-300
                flex flex-col items-center gap-4 p-6
                ${selectedType === "profile"
                        ? "border-emerald-500 bg-emerald-50 shadow-2xl scale-[1.03]"
                        : "bg-white border-emerald-100 hover:border-emerald-300 hover:shadow-lg"
                    }`}
            >
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${selectedType === "profile"
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-emerald-50 text-emerald-400"
                        }`}
                >
                    <User className="w-5 h-5" />
                </div>

                <div className="text-center space-y-1">
                    <h3 className={`font-bold text-lg ${selectedType === "profile" ? "text-emerald-800" : "text-emerald-700"}`}>
                        Profile Frame
                    </h3>
                    <p className="text-sm text-emerald-600/80">
                        Facebook Profile Picture
                    </p>
                    <span className="text-xs text-emerald-500 block">
                        1080 × 1080
                    </span>
                </div>

                {selectedType === "profile" && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow">
                        ✓
                    </div>
                )}
            </div>

            {/* POST */}
            <div
                onClick={() => onSelect("post")}
                className={`relative flex-1 cursor-pointer rounded-2xl border transition-all duration-300
                flex flex-col items-center gap-4 p-6
                ${selectedType === "post"
                        ? "border-emerald-500 bg-emerald-50 shadow-2xl scale-[1.03]"
                        : "bg-white border-emerald-100 hover:border-emerald-300 hover:shadow-lg"
                    }`}
            >
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${selectedType === "post"
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-emerald-50 text-emerald-400"
                        }`}
                >
                    <Image className="w-5 h-5" />
                </div>

                <div className="text-center space-y-1">
                    <h3 className={`font-bold text-lg ${selectedType === "post" ? "text-emerald-800" : "text-emerald-700"}`}>
                        Post Frame
                    </h3>
                    <p className="text-sm text-emerald-600/80">
                        Facebook Post / Banner
                    </p>
                    <span className="text-xs text-emerald-500 block">
                        864 × 1080
                    </span>
                </div>

                {selectedType === "post" && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow">
                        ✓
                    </div>
                )}
            </div>

            {/* COVER PHOTO */}
            <div
                onClick={() => onSelect("cover")}
                className={`relative flex-1 cursor-pointer rounded-2xl border transition-all duration-300
                flex flex-col items-center gap-4 p-6
                ${selectedType === "cover"
                        ? "border-emerald-500 bg-emerald-50 shadow-2xl scale-[1.03]"
                        : "bg-white border-emerald-100 hover:border-emerald-300 hover:shadow-lg"
                    }`}
            >
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${selectedType === "cover"
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-emerald-50 text-emerald-400"
                        }`}
                >
                    <RectangleHorizontal className="w-5 h-5" />
                </div>

                <div className="text-center space-y-1">
                    <h3 className={`font-bold text-lg ${selectedType === "cover" ? "text-emerald-800" : "text-emerald-700"}`}>
                        Cover Photo
                    </h3>
                    <p className="text-sm text-emerald-600/80">
                        Facebook Cover Photo
                    </p>
                    <span className="text-xs text-emerald-500 block">
                        820 × 312
                    </span>
                </div>

                {selectedType === "cover" && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow">
                        ✓
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaTypeSelector;