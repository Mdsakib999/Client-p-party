import PropTypes from "prop-types";
import { useState } from "react";

const ControlPanel = ({
    onUploadPhoto,
    onZoomChange,
    onReset,
    onDownload,
    isUploading,
}) => {
    const [zoom, setZoom] = useState(0.8);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            onUploadPhoto(file);
        }
    };

    const handleZoom = (e) => {
        const val = parseFloat(e.target.value);
        setZoom(val);
        onZoomChange(val);
    }

    return (
        <div className="control-panel">
            <div className="control-section">
                <label htmlFor="photo-upload" className="action-btn upload-btn">
                    <span className="icon">📷</span>
                    <span>Upload Your Photo</span>
                </label>
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <div className="control-section">
                <label className="label">Zoom / Resize</label>
                <div className="zoom-control">
                    <span className="text-sm">➖</span>
                    <input
                        type="range"
                        min="0.1"
                        max="2.0"
                        step="0.05"
                        value={zoom}
                        onChange={handleZoom}
                        className="range-slider"
                    />
                    <span className="text-sm">➕</span>
                </div>
            </div>

            {/* Actions */}
            <div className="control-groups-row">
                <button onClick={onReset} className="action-btn secondary-btn">
                    <span>🔄 Reset</span>
                </button>
            </div>

            <div className="control-section mt-4">
                <button
                    onClick={onDownload}
                    disabled={isUploading}
                    className={`action-btn download-btn ${isUploading ? 'loading' : ''}`}
                >
                    {isUploading ? (
                        <>⏳ Processing...</>
                    ) : (
                        <>⬇️ Download Framed Photo</>
                    )}
                </button>
            </div>
        </div>
    );
};

ControlPanel.propTypes = {
    onUploadPhoto: PropTypes.func.isRequired,
    onZoomChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    isUploading: PropTypes.bool,
};

export default ControlPanel;
