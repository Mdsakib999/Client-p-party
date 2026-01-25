import { useRef, useState } from "react";
import FrameCanvas from "../../components/FrameEditor/FrameCanvas";
import ControlPanel from "../../components/FrameEditor/ControlPanel";
import FrameSelector from "../../components/FrameEditor/FrameSelector";
import MediaTypeSelector from "../../components/FrameEditor/MediaTypeSelector";
import { useUploadFramedImageMutation } from "../../redux/features/frameEditor/frameEditor.api";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router";
import "./FrameEditor.css";

/**
 * FrameEditor Page
 * Main page for photo frame editor
 */
const FrameEditor = () => {
    const canvasRef = useRef(null);
    const [uploadFramedImage, { isLoading }] = useUploadFramedImageMutation();
    const [selectedMediaType, setSelectedMediaType] = useState("profile"); // profile | post

    // Handle photo upload
    const handleUploadPhoto = (file) => {
        if (canvasRef.current) {
            canvasRef.current.uploadPhoto(file);
            toast.success("Photo uploaded! Adjust position to fit.");
        }
    };

    // Handle zoom change
    const handleZoomChange = (value) => {
        if (canvasRef.current) {
            canvasRef.current.setZoom(value);
        }
    }

    // Handle frame selection
    const handleSelectFrame = (frameUrl) => {
        if (canvasRef.current) {
            canvasRef.current.changeFrame(frameUrl);
        }
    }

    // Handle reset position
    const handleReset = () => {
        canvasRef.current?.reset();
        toast.success("Position reset!");
    };

    // Handle download
    const handleDownload = async () => {
        try {
            // Export canvas as base64
            const imageData = canvasRef.current?.exportImage();

            if (!imageData) {
                toast.error("Failed to export image");
                return;
            }

            // Upload to backend for processing
            const result = await uploadFramedImage({ imageData }).unwrap();

            if (result.success && result.data?.url) {
                // Download the processed image
                const link = document.createElement("a");
                link.href = result.data.url;
                link.download = `bnp-frame-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast.success("Image downloaded successfully!");
            } else {
                toast.error("Failed to process image");
            }
        } catch (error) {
            console.error("Download error:", error);
            toast.error("Failed to download image. Please try again.");
        }
    };

    return (
        <div className="frame-editor-page">
            <div className="frame-editor-container">
                <div className="mb-6">
                    <Link to="/" className="flex items-center text-gray-500 hover:text-green-700 transition">
                        <HiArrowLeft className="mr-1" /> Back to Home
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
                        Start Future Bangladesh <br />
                        <span className="text-green-600">With One Click</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Transform your support into digital power with the scale symbol
                    </p>
                </div>

                {/* Media Type Selector (Profile vs Post) */}
                <MediaTypeSelector
                    selectedType={selectedMediaType}
                    onSelect={setSelectedMediaType}
                />

                <div className="editor-card-container">
                    {/* Main Editor Card (Green Background) */}
                    <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                        <div className="flex flex-col items-center">
                            {/* Canvas Wrapper */}
                            <div className="canvas-wrapper relative z-10 w-full max-w-[500px] aspect-square shadow-2xl rounded-xl border-4 border-white/20">
                                <FrameCanvas ref={canvasRef} />

                                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-white/50 z-0" id="placeholder-text">
                                    <svg className="w-16 h-16 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span className="text-sm font-medium">Photo will appear here</span>
                                </div>
                            </div>

                            {/* Frame Carousel */}
                            <div className="w-full max-w-2xl mt-8">
                                <h3 className="text-white text-center mb-4 font-medium opacity-90">Select a Frame Style</h3>
                                <FrameSelector onSelectFrame={handleSelectFrame} />
                            </div>

                            {/* Controls Panel */}
                            <div className="w-full max-w-2xl mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <ControlPanel
                                    onUploadPhoto={handleUploadPhoto}
                                    onZoomChange={handleZoomChange}
                                    onReset={handleReset}
                                    onDownload={handleDownload}
                                    isUploading={isLoading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer / Share Section */}
                    <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-gray-500 text-sm">
                        <div className="flex gap-4">
                            <span className="px-4 py-2 bg-white border rounded-full">0.0 Link Copy</span>
                            <span className="px-4 py-2 bg-white border rounded-full">Share</span>
                        </div>
                        <div className="flex gap-2">
                            {/* Names removed as requested */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrameEditor;

