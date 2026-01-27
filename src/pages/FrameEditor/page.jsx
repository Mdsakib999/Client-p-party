import { useCallback, useEffect, useRef, useState } from "react";
import MediaTypeSelector from "../../components/FrameEditor/MediaTypeSelector";
import FrameCanvas from "../../components/FrameEditor/FrameCanvas";
import FrameSelector from "../../components/FrameEditor/FrameSelector";
import ControlPanel from "../../components/FrameEditor/ControlPanel";
import { Upload } from "lucide-react";

const FrameEditor = () => {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [selectedMediaType, setSelectedMediaType] = useState("profile");
    const [hasPhoto, setHasPhoto] = useState(false);

    useEffect(() => {
        const defaultFrame =
            selectedMediaType === "profile"
                ? "/frames/profile/profile2.png"
                : "/frames/posts/post1.png";

        if (canvasRef.current) {
            canvasRef.current.changeFrame(defaultFrame);
        }
    }, [selectedMediaType]);

    const handleUploadPhoto = (file) => {
        if (canvasRef.current) {
            canvasRef.current.uploadPhoto(file);
            setHasPhoto(true);
        }
    };

    const handleCanvasClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            handleUploadPhoto(file);
        }
    };

    const handleZoomChange = (value) => {
        canvasRef.current?.setZoom(value);
    };

    const handleRotate = (angle) => {
        canvasRef.current?.rotate(angle);
    };

    const handleSelectFrame = (frameUrl) => {
        canvasRef.current?.changeFrame(frameUrl);
    };

    const handleReset = () => {
        canvasRef.current?.reset();
    };

    const handleDownload = () => {
        const imageData = canvasRef.current?.exportImage();
        if (!imageData) {
            alert("Please upload a photo first!");
            return;
        }

        const link = document.createElement("a");
        link.href = imageData;
        link.download = `bnp-${selectedMediaType}-frame-${Date.now()}.png`;
        link.click();

        // Reset after download
        setTimeout(() => {
            canvasRef.current?.clearPhoto();
            setHasPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }, 1000); // Small delay to ensure download starts
    };

    const handleMediaTypeChange = (type) => {
        setSelectedMediaType(type);
    };

    return (
        <div className="min-h-screen bg-white py-8 px-4 flex flex-col items-center">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Create Your Photo Frame
                    </h1>
                    <p className="text-green-600 font-medium">With One Click</p>
                </div>

                <div className="mb-6">
                    <MediaTypeSelector
                        selectedType={selectedMediaType}
                        onSelect={handleMediaTypeChange}
                    />
                </div>

                {/* MAIN CONTENT */}
                <div className="w-full flex flex-col lg:flex-row items-center lg:justify-center gap-10 my-12 ">
                    <div className="flex flex-col items-center space-y-8">
                        <div className="relative shadow-2xl rounded-2xl overflow-hidden group">
                            <div
                                className={`relative ${!hasPhoto ? "cursor-pointer" : "cursor-default"
                                    }`}
                                style={{
                                    width: selectedMediaType === "cover" ? "500px" : "300px",
                                    height: selectedMediaType === "profile"
                                        ? "300px"
                                        : selectedMediaType === "post"
                                            ? "375px"
                                            : "185px", // 500 * (315/851) ≈ 185
                                }}
                            >
                                <FrameCanvas
                                    ref={canvasRef}
                                    mediaType={selectedMediaType}
                                    onCanvasClick={handleCanvasClick}
                                />

                                {!hasPhoto && (
                                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-gray-50/50">
                                        <Upload className="w-12 h-12 mb-3 opacity-40 text-green-500" />
                                        <span className="text-xs text-green-600 px-4 text-center">
                                            Click to upload your photo
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full max-w-xs md:max-w-md p-2 md:p-6 rounded-3xl shadow-lg border border-green-100 bg-green-100">
                            <h3 className="text-gray-800 text-xs md:text-sm text-center mb-2 font-semibold">
                                Choose Your Frame
                            </h3>
                            <FrameSelector
                                onSelectFrame={handleSelectFrame}
                                mediaType={selectedMediaType}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-md p-6 rounded-3xl shadow-lg border border-green-100 bg-green-50">
                            <ControlPanel
                                onUploadPhoto={handleUploadPhoto}
                                onZoomChange={handleZoomChange}
                                onRotate={handleRotate}
                                onReset={handleReset}
                                onDownload={handleDownload}
                                hasPhoto={hasPhoto}
                            />
                        </div>
                    </div>
                </div>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Footer */}
                <div className="text-center text-gray-400 text-xs px-4">
                    <p>Show your support for BNP | Share on social media</p>
                </div>
            </div>
        </div>
    );
};

export default FrameEditor;