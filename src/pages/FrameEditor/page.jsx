import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MediaTypeSelector from "../../components/FrameEditor/MediaTypeSelector";
import FrameCanvas from "../../components/FrameEditor/FrameCanvas";
import FrameSelector from "../../components/FrameEditor/FrameSelector";
import ControlPanel from "../../components/FrameEditor/ControlPanel";
import { Upload } from "lucide-react";
import CountingNumber from "../../components/FrameEditor/CountingNumber";

const FrameEditor = () => {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedMediaType, setSelectedMediaType] = useState("post");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFrame, setActiveFrame] = useState(null);

  useEffect(() => {
    setError(null);

    const defaultFrame =
      selectedMediaType === "profile"
        ? "/frames/profile/Congratulations.png"
        : selectedMediaType === "post"
          ? "/frames/posts/Congrets-post.png"
          : "/frames/cover/cover1.png";

    setActiveFrame(defaultFrame);
  }, [selectedMediaType]);

  useEffect(() => {
    if (!activeFrame) return;
    canvasRef.current?.changeFrame(activeFrame);
  }, [activeFrame]);

  const handleUploadPhoto = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(t('frame_error_invalid_file'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t('frame_error_file_size'));
      return;
    }

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
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

  const handleSelectFrame = useCallback((frameUrl) => {
    setActiveFrame(frameUrl);
  }, []);

  const handleReset = () => {
    canvasRef.current?.reset();
  };

  const handleDownload = async () => {
  try {
    const blob = await canvasRef.current?.exportImage();
    if (!blob) {
      setError("Please upload a photo first!");
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bnp-${selectedMediaType}-frame-${Date.now()}.png`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (err) {
    console.error(err);
    setError("Failed to download the image. Please try again.");
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
    <div className="min-h-screen bg-white pt-36 pb-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('frame_title')}
          </h1>
          <p className="text-green-600 font-medium">
            {t('frame_subtitle')}
          </p>{" "}
        </div>

        <div className="mb-6 w-full">
          <MediaTypeSelector
            selectedType={selectedMediaType}
            onSelect={handleMediaTypeChange}
          />
        </div>

        {error && (
          <div className="w-full max-w-2xl mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 my-8 lg:my-12">
          <div className="flex flex-col items-center space-y-6 lg:space-y-8 w-full lg:w-auto">
            <div className="relative shadow-2xl rounded-2xl group w-full max-w-md lg:max-w-none">
              <FrameCanvas
                ref={canvasRef}
                mediaType={selectedMediaType}
                imageSrc={imageSrc}
                onCanvasClick={handleCanvasClick}
                onLoadError={handleImageLoadError}
                onPhotoLoaded={() => {
                  setHasPhoto(true);
                  setIsLoading(false);
                }}
              />

              {!hasPhoto && !isLoading && (
                <div
                  onClick={handleCanvasClick}
                  className={`absolute cursor-pointer z-10
                      ${selectedMediaType === "profile"
                      ? "inset-[15%] rounded-full"
                      : selectedMediaType === "post"
                        ? "top-[12%] left-[25%] right-[25%] aspect-square rounded-full"
                        : "top-[25%] bottom-[25%] left-[35%] right-[35%] rounded-full"
                    }`}
                  style={{
                    background: 'transparent',
                  }}
                  aria-label="Click to upload photo"
                />
              )}

              {!hasPhoto && !isLoading && (
                <div
                  className={`absolute pointer-events-none flex flex-col items-center justify-center 
                    ${selectedMediaType === "profile"
                      ? "inset-0"
                      : selectedMediaType === "post"
                        ? "top-[30%] left-[25%] right-[25%] h-[30%] "
                        : "top-0 bottom-0 left-[20%] right-[20%]"
                    }`}
                >
                  {selectedMediaType !== "cover" && (
                    <Upload
                      className={`${selectedMediaType === "profile"
                        ? "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 md:mb-3"
                        : "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 md:mb-3 "
                        } text-green-600 drop-shadow-lg`}
                    />
                  )}
                  <span
                    className={`${selectedMediaType === "cover"
                      ? "text-[10px] sm:text-xs"
                      : selectedMediaType === "post"
                        ? "text-xs sm:text-sm md:text-base"
                        : "text-sm sm:text-base md:text-lg"
                      } font-semibold text-green-600 text-center px-2 sm:px-4 leading-tight`}
                    style={{
                      textShadow: '0 0 10px rgba(255,255,255,0.95), 0 0 6px rgba(255,255,255,0.9), 0 2px 4px rgba(255,255,255,0.8)'
                    }}
                  >
                    {selectedMediaType === "cover"
                      ? "Click to upload"
                      : "Click to upload your photo"
                    }
                  </span>
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-white/50">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                  <span className="text-xs text-green-600 mt-3">
                    Loading...
                  </span>
                </div>
              )}
            </div>

            <div className="w-full max-w-md p-3 md:p-6 rounded-3xl shadow-lg border border-green-100 bg-green-100">
              <h3 className="text-gray-800 text-xs md:text-sm text-center mb-3 font-semibold">
                {t('frame_choose')}
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

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload photo"
          disabled={isLoading}
        />

        {/* counting div */}
        <CountingNumber></CountingNumber>

        <div className="text-center text-gray-400 text-xs px-4">
          <p>{t('frame_footer')}</p>
        </div>
      </div>
    </div>
  );
};

export default FrameEditor;
