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

    // Load default frame on mount and when media type changes
    useEffect(() => {
        const defaultFrame = selectedMediaType === "profile"
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
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            handleUploadPhoto(file);
        }
    };

    const handleZoomChange = (value) => {
        if (canvasRef.current) {
            canvasRef.current.setZoom(value);
        }
    };

    const handleRotate = (angle) => {
        canvasRef.current?.rotate(angle);
    };

    const handleSelectFrame = (frameUrl) => {
        if (canvasRef.current) {
            canvasRef.current.changeFrame(frameUrl);
        }
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
    };

    const handleMediaTypeChange = (type) => {
        setSelectedMediaType(type);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                        Start Future Bangladesh
                        <br />
                        <span className="text-green-600">With One Click</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Transform your support into digital power with BNP frames
                    </p>
                </div>

                {/* Media Type Selector */}
                <MediaTypeSelector selectedType={selectedMediaType} onSelect={handleMediaTypeChange} />

                {/* Main Editor Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        {/* Canvas */}
                        <div className="flex justify-center mb-8">
                            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer" onClick={handleCanvasClick}>
                                <FrameCanvas ref={canvasRef} mediaType={selectedMediaType} onCanvasClick={handleCanvasClick} />
                                <div
                                    id="placeholder-text"
                                    className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-gray-400"
                                >
                                    <Upload className="w-20 h-20 mb-3 opacity-40" />
                                    <span className="font-medium">Click to upload your photo</span>
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

                        {/* Frame Selector */}
                        <div className="mb-8">
                            <h3 className="text-white text-center mb-4 font-medium text-lg">Choose Your Frame</h3>
                            <FrameSelector onSelectFrame={handleSelectFrame} mediaType={selectedMediaType} />
                        </div>

                        {/* Control Panel */}
                        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
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

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Show your support for BNP | Share on social media</p>
                </div>
            </div>
        </div>
    );
};

export default FrameEditor;