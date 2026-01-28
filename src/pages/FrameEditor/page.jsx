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
    const [imageSrc, setImageSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // DON'T clear photo when changing media type - just change the frame
        setError(null);

        const defaultFrame =
            selectedMediaType === "profile"
                ? "/frames/profile/profile2.png"
                : selectedMediaType === "post"
                    ? "/frames/posts/post1.png"
                    : "/frames/cover/cover1.png";

        canvasRef.current?.changeFrame(defaultFrame);
    }, [selectedMediaType]);

    const handleUploadPhoto = (file) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please upload a valid image file (JPG, PNG, etc.)");
            return;
        }

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("Image file is too large. Please upload an image smaller than 10MB.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const reader = new FileReader();

        reader.onload = (e) => {
            // Clear the existing photo first to allow new photo to load
            canvasRef.current?.clearPhoto();

            // Small delay to ensure clearPhoto completes before setting new image
            setTimeout(() => {
                setImageSrc(e.target.result);
                setHasPhoto(true);
                setIsLoading(false);
            }, 50);
        };

        reader.onerror = () => {
            setError("Failed to read the image file. Please try again.");
            setIsLoading(false);
        };

        reader.readAsDataURL(file);
    };

    const handleCanvasClick = useCallback(() => {
        if (!isLoading) {
            fileInputRef.current?.click();
        }
    }, [isLoading]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
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
            setError("Please upload a photo first!");
            return;
        }

        try {
            const link = document.createElement("a");
            link.href = imageData;
            link.download = `bnp-${selectedMediaType}-frame-${Date.now()}.png`;

            // Add event listener for successful download
            link.addEventListener('click', () => {
                // Reset after a delay to ensure download starts
                setTimeout(() => {
                    canvasRef.current?.clearPhoto();
                    setHasPhoto(false);
                    setImageSrc(null);
                    setError(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                }, 1500);
            });

            link.click();
        } catch (err) {
            setError("Failed to download the image. Please try again.");
            console.error("Download error:", err);
        }
    };

    const handleMediaTypeChange = (type) => {
        setSelectedMediaType(type);
        setError(null);
    };

    const handleImageLoadError = (errorMessage) => {
        setError(errorMessage);
        setIsLoading(false);
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

                <div className="mb-6 w-full">
                    <MediaTypeSelector
                        selectedType={selectedMediaType}
                        onSelect={handleMediaTypeChange}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="w-full max-w-2xl mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* MAIN CONTENT */}
                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 my-8 lg:my-12">
                    <div className="flex flex-col items-center space-y-6 lg:space-y-8 w-full lg:w-auto">
                        <div className="relative shadow-2xl rounded-2xl group w-full max-w-md lg:max-w-none">
                            <FrameCanvas
                                ref={canvasRef}
                                mediaType={selectedMediaType}
                                imageSrc={imageSrc}
                                onCanvasClick={handleCanvasClick}
                                onLoadError={handleImageLoadError}
                            />

                            {!hasPhoto && !isLoading && (
                                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                                    <Upload className="w-12 h-12 mb-3 opacity-40 text-green-500" />
                                    <span className="text-xs text-green-600 px-4 text-center">
                                        Click to upload your photo
                                    </span>
                                </div>
                            )}

                            {isLoading && (
                                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-white/50">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                                    <span className="text-xs text-green-600 mt-3">Loading...</span>
                                </div>
                            )}
                        </div>

                        <div className="w-full max-w-md p-3 md:p-6 rounded-3xl shadow-lg border border-green-100 bg-green-100">
                            <h3 className="text-gray-800 text-xs md:text-sm text-center mb-3 font-semibold">
                                Choose Your Frame
                            </h3>
                            <FrameSelector
                                onSelectFrame={handleSelectFrame}
                                mediaType={selectedMediaType}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center w-full lg:w-auto">
                        <div className="w-full max-w-md p-4 md:p-6 rounded-3xl shadow-lg border border-green-100 bg-green-50">
                            <ControlPanel
                                onUploadPhoto={handleUploadPhoto}
                                onZoomChange={handleZoomChange}
                                onRotate={handleRotate}
                                onReset={handleReset}
                                onDownload={handleDownload}
                                hasPhoto={hasPhoto}
                                isLoading={isLoading}
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
                    aria-label="Upload photo"
                    disabled={isLoading}
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