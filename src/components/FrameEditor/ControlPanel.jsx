import {
    Download,
    RefreshCw,
    RotateCcw,
    RotateCw,
    Upload,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import { useState } from "react";

const ControlPanel = ({
    onUploadPhoto,
    onZoomChange,
    onRotate,
    onReset,
    onDownload,
    hasPhoto,
}) => {
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
        <div className="space-y-6 rounded-2xl bg-white/90 p-5 shadow-xl border border-emerald-100">
            {/* Upload */}
            <div>
                <label
                    htmlFor="photo-upload"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl cursor-pointer 
          bg-emerald-50 hover:bg-emerald-100 border border-emerald-200
          text-emerald-700 font-semibold transition"
                >
                    <Upload className="w-5 h-5" />
                    {hasPhoto ? "Change Photo" : "Upload Photo"}
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
            <div className="space-y-2">
                <label className="text-sm font-semibold text-emerald-700">
                    Zoom / Resize
                </label>

                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <button
                        onClick={decreaseZoom}
                        className="p-2 rounded-full hover:bg-white transition text-emerald-600"
                    >
                        <ZoomOut className="w-5 h-5" />
                    </button>

                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.01"
                        value={zoom}
                        onChange={handleZoom}
                        className="flex-1 h-2 rounded-full appearance-none cursor-pointer
            bg-emerald-200
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-emerald-600
            [&::-webkit-slider-thumb]:shadow"
                    />

                    <button
                        onClick={increaseZoom}
                        className="p-2 rounded-full hover:bg-white transition text-emerald-600"
                    >
                        <ZoomIn className="w-5 h-5" />
                    </button>

                    <span className="text-sm font-mono text-emerald-700 bg-white px-3 py-1 rounded-full min-w-[64px] text-center border border-emerald-200">
                        {Math.round(zoom * 100)}%
                    </span>
                </div>
            </div>

            {/* Rotate */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => onRotate(-90)}
                    className="py-3 rounded-xl border border-emerald-200
          bg-emerald-50 hover:bg-emerald-100
          text-emerald-700 font-semibold transition
          flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-5 h-5" />
                    Rotate Left
                </button>

                <button
                    onClick={() => onRotate(90)}
                    className="py-3 rounded-xl border border-emerald-200
          bg-emerald-50 hover:bg-emerald-100
          text-emerald-700 font-semibold transition
          flex items-center justify-center gap-2"
                >
                    <RotateCw className="w-5 h-5" />
                    Rotate Right
                </button>
            </div>

            {/* Reset */}
            <button
                onClick={onReset}
                className="w-full py-3 rounded-xl border border-emerald-300
        bg-white hover:bg-emerald-50
        text-emerald-700 font-semibold transition
        flex items-center justify-center gap-2"
            >
                <RefreshCw className="w-5 h-5" />
                Reset Position
            </button>

            {/* Download */}
            <button
                onClick={onDownload}
                className="w-full py-4 rounded-xl
        bg-gradient-to-r from-emerald-500 to-emerald-600
        hover:from-emerald-600 hover:to-emerald-700
        text-white font-bold text-lg
        shadow-lg hover:shadow-xl transition
        flex items-center justify-center gap-2"
            >
                <Download className="w-6 h-6" />
                Download Framed Photo
            </button>
        </div>
    );
};

export default ControlPanel;