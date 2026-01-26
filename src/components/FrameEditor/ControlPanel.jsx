import { Download, RefreshCw, RotateCcw, RotateCw, Upload, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

const ControlPanel = ({ onUploadPhoto, onZoomChange, onRotate, onReset, onDownload, hasPhoto }) => {
    const [zoom, setZoom] = useState(1);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            onUploadPhoto(file);
            setZoom(1);
        }
    };

    const handleZoom = (e) => {
        const val = parseFloat(e.target.value);
        setZoom(val);
        onZoomChange(val);
    };

    const increaseZoom = () => {
        const newZoom = Math.min(zoom + 0.1, 3);
        setZoom(newZoom);
        onZoomChange(newZoom);
    };

    const decreaseZoom = () => {
        const newZoom = Math.max(zoom - 0.1, 0.1);
        setZoom(newZoom);
        onZoomChange(newZoom);
    };

    return (
        <div className="space-y-4">
            {/* Upload */}
            <div>
                <label htmlFor="photo-upload" className="block w-full py-3 px-4 bg-white/20 hover:bg-white/30 border-2 border-dashed border-white/50 rounded-xl cursor-pointer transition text-white text-center font-medium">
                    <Upload className="inline-block w-5 h-5 mr-2" />
                    {hasPhoto ? "Change Photo" : "Upload Your Photo"}
                </label>
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Zoom */}
            <div>
                <label className="text-white text-sm font-medium mb-2 block opacity-90">Zoom / Resize</label>
                <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-3">
                    <button onClick={decreaseZoom} className="text-white hover:text-green-200 transition">
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.01"
                        value={zoom}
                        onChange={handleZoom}
                        className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                    />
                    <button onClick={increaseZoom} className="text-white hover:text-green-200 transition">
                        <ZoomIn className="w-5 h-5" />
                    </button>
                    <span className="text-white text-sm font-mono bg-white/20 px-3 py-1 rounded-full min-w-[60px] text-center">
                        {Math.round(zoom * 100)}%
                    </span>
                </div>
            </div>

            {/* Rotate & Reset */}
            <div className="flex gap-3">
                <button
                    onClick={() => onRotate(-90)}
                    className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-medium transition flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-5 h-5" />
                    Rotate Left
                </button>
                <button
                    onClick={() => onRotate(90)}
                    className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-medium transition flex items-center justify-center gap-2"
                >
                    <RotateCw className="w-5 h-5" />
                    Rotate Right
                </button>
            </div>

            <button
                onClick={onReset}
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-medium transition flex items-center justify-center gap-2"
            >
                <RefreshCw className="w-5 h-5" />
                Reset Position
            </button>

            {/* Download */}
            <button
                onClick={onDownload}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
                <Download className="w-6 h-6" />
                Download Framed Photo
            </button>
        </div>
    );
};

export default ControlPanel;