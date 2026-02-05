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
import { useTranslation } from "react-i18next";

const ControlPanel = ({
    onUploadPhoto,
    onZoomChange,
    onRotate,
    onReset,
    onDownload,
    hasPhoto,
    isLoading = false,
}) => {
    const { t } = useTranslation();
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
        <div className="space-y-6 rounded-2xl p-5 shadow-xl border border-emerald-100 bg-white">
            {/* Upload */}
            <div>
                <label
                    htmlFor="photo-upload"
                    className={`flex items-center justify-center text-xs md:text-md gap-2 w-full py-3 px-4 rounded-xl cursor-pointer 
          bg-emerald-50 hover:bg-emerald-100 border border-emerald-200
          text-emerald-700 font-semibold transition
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-disabled={isLoading}
                >
                    <Upload className="w-5 h-5" />
                    {isLoading ? t('frame_loading') : hasPhoto ? t('frame_change_btn') : t('frame_upload_btn')}
                </label>
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isLoading}
                    aria-label="Upload photo file"
                />
            </div>

            {/* Zoom */}
            <div className="space-y-2">
                <label
                    htmlFor="zoom-slider"
                    className="text-sm mb-2 md:mb-0 font-semibold text-emerald-700"
                >
                    Zoom / Resize
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 sm:px-4 py-3">
                    <div className="flex items-center gap-3 w-full">
                        <button
                            onClick={decreaseZoom}
                            className="p-2 rounded-full hover:bg-white transition text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            disabled={!hasPhoto || isLoading}
                            aria-label="Decrease zoom"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>

                        <input
                            id="zoom-slider"
                            type="range"
                            min="0.1"
                            max="3"
                            step="0.01"
                            value={zoom}
                            onChange={handleZoom}
                            disabled={!hasPhoto || isLoading}
                            className="flex-1 h-2 rounded-full appearance-none cursor-pointer
                bg-emerald-200
                disabled:opacity-50 disabled:cursor-not-allowed
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-emerald-600
                [&::-webkit-slider-thumb]:shadow
                [&::-webkit-slider-thumb]:disabled:bg-gray-400
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-emerald-600
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow"
                            aria-label="Zoom level"
                            aria-valuemin="0.1"
                            aria-valuemax="3"
                            aria-valuenow={zoom}
                        />

                        <button
                            onClick={increaseZoom}
                            className="p-2 rounded-full hover:bg-white transition text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            disabled={!hasPhoto || isLoading}
                            aria-label="Increase zoom"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                    </div>

                    <span className="text-sm font-mono text-emerald-700 bg-white px-3 py-1 rounded-full min-w-[64px] text-center border border-emerald-200 flex-shrink-0">
                        {Math.round(zoom * 100)}%
                    </span>
                </div>
            </div>

            {/* Rotate */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => onRotate(-90)}
                    className="py-3 text-xs md:text-md rounded-xl border border-emerald-200
          bg-emerald-50 hover:bg-emerald-100
          text-emerald-700 font-semibold transition
          flex items-center justify-center gap-2
          disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!hasPhoto || isLoading}
                    aria-label="Rotate left 90 degrees"
                >
                    <RotateCcw className="w-5 h-5" />
                    Rotate Left
                </button>

                <button
                    onClick={() => onRotate(90)}
                    className="py-3 text-xs md:text-md rounded-xl border border-emerald-200
          bg-emerald-50 hover:bg-emerald-100
          text-emerald-700 font-semibold transition
          flex items-center justify-center gap-2
          disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!hasPhoto || isLoading}
                    aria-label="Rotate right 90 degrees"
                >
                    <RotateCw className="w-5 h-5" />
                    Rotate Right
                </button>
            </div>

            {/* Reset */}
            <button
                onClick={onReset}
                className="w-full py-3 text-xs md:text-md rounded-xl border border-emerald-300
        bg-white hover:bg-emerald-50
        text-emerald-700 font-semibold transition
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasPhoto || isLoading}
                aria-label="Reset photo position and zoom"
            >
                <RefreshCw className="w-5 h-5" />
                Reset Position
            </button>

            {/* Download */}
            <button
                onClick={onDownload}
                className="w-full py-4 text-xs md:text-md rounded-xl
        bg-gradient-to-r from-emerald-500 to-emerald-600
        hover:from-emerald-600 hover:to-emerald-700
        text-white font-bold
        shadow-lg hover:shadow-xl transition
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasPhoto || isLoading}
                aria-label="Download framed photo"
            >
                <Download className="w-6 h-6" />
                {isLoading ? "Processing..." : "Download Framed Photo"}
            </button>
        </div>
    );
};

export default ControlPanel;