import { useState, useRef, useEffect, useMemo } from "react";
import {
  Upload,
  Download,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import { useGetPhotoFramesQuery } from "../redux/features/photoFrame/photoFrame.api";

const divisions = [
  "Dhaka",
  "Chattogram",
  "Barishal",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
];

const PhotoFrame = () => {
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(465 / 620);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const containerRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const { data: framesData, isLoading: isFramesLoading } =
    useGetPhotoFramesQuery({ division: selectedDivision });

  const frames = useMemo(() => {
    const grouped = {};
    divisions.forEach((div) => (grouped[div] = []));

    if (framesData?.data) {
      framesData.data.forEach((frame, index) => {
        if (grouped[frame.division]) {
          grouped[frame.division].push({
            id: frame._id,
            name: `Frame ${index + 1}`,
            url: frame.url,
            ...frame,
          });
        }
      });
    }
    return grouped;
  }, [framesData]);

  useEffect(() => {
    setCurrentFrameIndex(0);
  }, [selectedDivision]);

  useEffect(() => {
    if (window.fabric) {
      setFabricLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js";
    script.async = true;
    script.onload = () => setFabricLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (fabricCanvasRef.current && containerRef.current) {
        const canvas = fabricCanvasRef.current;
        const containerWidth = containerRef.current.clientWidth;
        const newWidth = Math.min(465, containerWidth);
        const newHeight = Math.round(newWidth * (620 / 465));

        if (canvas.width !== newWidth) {
          canvas.setDimensions({ width: newWidth, height: newHeight });
          canvas.renderAll();
        }
      }
    };

    if (fabricLoaded && !isFramesLoading) {
      initializeFabric();
      window.addEventListener("resize", handleResize);
      // Force initial resize check
      setTimeout(() => {
        handleResize();
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }

    const handleScreenResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleScreenResize);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [fabricLoaded, isFramesLoading]);

  // Persistent image rendering
  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      if (uploadedImage) {
        window.fabric.Image.fromURL(
          uploadedImage,
          (img) => {
            canvas.clear();
            const canvasWidth = canvas.getWidth();
            const canvasHeight = canvas.getHeight();

            const baseScale = Math.max(
              canvasWidth / img.width,
              canvasHeight / img.height,
            );
            const finalScale = baseScale * (zoom / 100);

            img.set({
              scaleX: finalScale,
              scaleY: finalScale,
              angle: rotation,
              left: canvasWidth / 2,
              top: canvasHeight / 2,
              originX: "center",
              originY: "center",
              selectable: true,
              hasControls: true,
            });

            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
          },
          { crossOrigin: "anonymous" },
        );
      } else {
        canvas.clear();
        canvas.renderAll();
      }
    }
  }, [uploadedImage, fabricLoaded, isFramesLoading, zoom, rotation]);

  const initializeFabric = () => {
    if (!window.fabric || fabricCanvasRef.current || !containerRef.current)
      return;

    // Reset container and create canvas element
    containerRef.current.innerHTML = "";
    const canvasElement = document.createElement("canvas");
    canvasElement.className = "frame-preview-canvas";
    containerRef.current.appendChild(canvasElement);

    // Calculate responsive canvas size
    const containerWidth = containerRef.current.clientWidth;
    const canvasWidth = Math.min(465, containerWidth);
    const canvasHeight = Math.round(canvasWidth * (620 / 465));

    const canvas = new window.fabric.Canvas(canvasElement, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "transparent",
    });
    fabricCanvasRef.current = canvas;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && fabricCanvasRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        // Drawing is now handled by useEffect
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const handleRotate = (direction) => {
    setRotation((prev) => prev + (direction === "left" ? -90 : 90));
  };

  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

  const downloadImage = async () => {
    if (!uploadedImage || !frames[selectedDivision]) return;

    const downloadCanvas = document.createElement("canvas");
    downloadCanvas.width = 1080;
    downloadCanvas.height = 1080;
    const ctx = downloadCanvas.getContext("2d");

    const scaleX = 1080 / fabricCanvasRef.current.width;
    const scaleY = 1080 / fabricCanvasRef.current.height;

    const userImageData = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1,
      multiplier: Math.min(scaleX, scaleY),
    });

    const userImg = new Image();
    await new Promise((resolve) => {
      userImg.onload = resolve;
      userImg.src = userImageData;
    });

    ctx.drawImage(userImg, 0, 0, downloadCanvas.width, downloadCanvas.height);

    const frameImg = new Image();
    frameImg.crossOrigin = "anonymous";
    await new Promise((resolve) => {
      frameImg.onload = resolve;
      frameImg.src = frames[selectedDivision][currentFrameIndex].url;
    });

    ctx.drawImage(frameImg, 0, 0, downloadCanvas.width, downloadCanvas.height);

    downloadCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `framed-photo-${selectedDivision}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Reset state after download
      setUploadedImage(null);
      setZoom(100);
      setRotation(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, "image/png");
  };

  // Screen size tracking for responsive calculations
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 480);

  const nextFrame = () => {
    setCurrentFrameIndex((prev) =>
      prev < frames[selectedDivision].length - 1 ? prev + 1 : 0,
    );
  };

  const prevFrame = () => {
    setCurrentFrameIndex((prev) =>
      prev > 0 ? prev - 1 : frames[selectedDivision].length - 1,
    );
  };

  return (
    <div
      className="mt-20"
      style={{
        minHeight: "100vh",
        background: "",
        padding: "clamp(1rem, 3vw, 2rem) 1rem",
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Design Your Photo with a Leaders Frame
        </h1>
        <p className="text-green-600 font-medium">
          Upload, adjust, and generate in minutes
        </p>{" "}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');
        
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 1.5rem !important;
          }
          
          .frame-preview-wrapper {
            width: 100% !important;
            max-width: 465px !important;
            height: auto !important;
          }
          
          .frame-preview-canvas {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 465/620;
          }
          
          .frame-slider-wrapper {
            width: 100% !important;
            max-width: 465px !important;
          }
          
          .division-tabs {
            justify-content: center !important;
          }
          
          .division-tab {
            padding: 0.5rem 1rem !important;
            font-size: 0.85rem !important;
          }
        }
        
          .division-tab {
            padding: 0.4rem 0.75rem !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          className="main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "2rem",
            alignItems: "start",
            width: "100%",
            maxWidth: "100%",
            overflowX: "hidden", // Prevent horizontal scroll
          }}
        >
          {/* Left Section - Frame Preview */}
          <div style={{ minWidth: 0 }}>
            {/* Frame Preview Area */}
            {isFramesLoading ? (
              <div className="flex justify-center items-center h-[500px] w-full max-w-[470px] bg-gray-100 rounded-lg">
                <p>Loading frames...</p>
              </div>
            ) : (
              <div
                className="frame-preview-wrapper"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "470px",
                  margin: "0 auto",
                  aspectRatio: aspectRatio,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "transparent",
                }}
              >
                <div
                  className="frame-preview-canvas-container"
                  ref={containerRef}
                  style={{ width: "100%", height: "100%", zIndex: 1 }}
                />
                {frames[selectedDivision]?.length > 0 &&
                  frames[selectedDivision][currentFrameIndex] && (
                    <img
                      src={frames[selectedDivision][currentFrameIndex].url}
                      alt="Frame overlay"
                      onLoad={(e) => {
                        const img = e.target;
                        setAspectRatio(img.naturalWidth / img.naturalHeight);
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        objectFit: "fill",
                        zIndex: 5,
                      }}
                    />
                  )}
                {!uploadedImage && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      color: "#2E7D32",
                      cursor: "pointer",
                      zIndex: 20,
                      padding: "1rem",
                    }}
                  >
                    <Upload size={48} style={{ margin: "0 auto 1rem" }} />
                    <p
                      style={{
                        fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                        fontWeight: "500",
                      }}
                    >
                      Click to upload your photo
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Frame Slider */}
            <div
              className="frame-slider-wrapper"
              style={{
                background: "rgba(200, 230, 201, 0.5)",
                borderRadius: "12px",
                padding: isSmallScreen
                  ? "0.75rem 0.5rem"
                  : "clamp(1rem, 2.5vw, 1.5rem)",
                marginTop: "1.5rem",
                width: "100%",
                maxWidth: "100%", // Strict constraint
                margin: "1.5rem auto 0",
                boxSizing: "border-box",
                overflow: "hidden", // Ensure no spillover
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                  color: "#1B5E20",
                  marginBottom: "1rem",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Choose Your Frame
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(0.5rem, 2vw, 1rem)",
                }}
              >
                <button
                  onClick={prevFrame}
                  className="arrow-btn"
                  style={{
                    background: "#4CAF50",
                    border: "none",
                    borderRadius: "50%",
                    width: isSmallScreen ? "35px" : "40px",
                    height: isSmallScreen ? "35px" : "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    flexShrink: 0,
                  }}
                >
                  <ChevronLeft size={24} />
                </button>

                <div
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    position: "relative",
                    minWidth: 0, // CRITICAL: Allows flex child to shrink below content size
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: isSmallScreen ? "0.75rem" : "clamp(0.3rem, 1vw, 0.5rem)",
                      transition: "transform 0.3s ease-in-out",
                      transform: `translateX(-${currentFrameIndex * (isSmallScreen ? 65 + 12 : 80 + 8)
                        }px)`,
                    }}
                  >
                    {isFramesLoading ? (
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <p
                          className="flex justify-center"
                          style={{ color: "#2E7D32" }}
                        >
                          <Loader className="animate-spin" size={24} />
                        </p>
                      </div>
                    ) : frames[selectedDivision]?.length === 0 ? (
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <p style={{ color: "#999" }}>No frames available</p>
                      </div>
                    ) : (
                      frames[selectedDivision].map((frame, index) => (
                        <div
                          key={frame.id}
                          onClick={() => setCurrentFrameIndex(index)}
                          className="frame-thumbnail"
                          style={{
                            width: isSmallScreen ? "65px" : "80px",
                            height: isSmallScreen ? "85px" : "100px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            cursor: "pointer",
                            border:
                              currentFrameIndex === index
                                ? "3px solid #4CAF50"
                                : "3px solid transparent",
                            boxShadow:
                              currentFrameIndex === index
                                ? "0 4px 12px rgba(76, 175, 80, 0.4)"
                                : "0 2px 6px rgba(0,0,0,0.1)",
                            transition: "all 0.3s ease",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={frame.url}
                            alt={frame.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <button
                  onClick={nextFrame}
                  className="arrow-btn"
                  style={{
                    background: "#4CAF50",
                    border: "none",
                    borderRadius: "50%",
                    width: isSmallScreen ? "35px" : "40px",
                    height: isSmallScreen ? "35px" : "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    flexShrink: 0,
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Controls */}
          <div
            style={{
              background: "rgba(200, 230, 201, 0.3)",
              borderRadius: "16px",
              padding: "clamp(1rem, 3vw, 2rem)",
              border: "1px solid rgba(76, 175, 80, 0.2)",
              minWidth: 0,
            }}
          >
            {/* Division Tabs */}
            <div
              className="division-tabs"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              {divisions.map((division) => (
                <button
                  key={division}
                  onClick={() => setSelectedDivision(division)}
                  className="division-tab"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    background:
                      selectedDivision === division ? "#4CAF50" : "#d5edd7",
                    color: selectedDivision === division ? "#fff" : "#2E7D32",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {division}
                </button>
              ))}
            </div>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "100%",
                padding: "1rem",
                background: "#fff",
                border: "2px solid #4CAF50",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#2E7D32",
                fontSize: "1rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <Upload size={20} />
              Upload Photo
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            {/* Zoom Control */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#1B5E20",
                  marginBottom: "0.5rem",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                }}
              >
                Zoom / Resize
                <span
                  style={{
                    background: "#4CAF50",
                    color: "#fff",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                  }}
                >
                  {zoom}%
                </span>
              </label>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <button
                  onClick={() => handleZoomChange(Math.max(10, zoom - 10))}
                  style={{
                    padding: "0.5rem",
                    background: "#E8F5E9",
                    border: "1px solid #4CAF50",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#2E7D32",
                  }}
                >
                  <ZoomOut size={18} />
                </button>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={zoom}
                  onChange={(e) => handleZoomChange(parseInt(e.target.value))}
                  style={{
                    flex: 1,
                    accentColor: "#4CAF50",
                  }}
                />
                <button
                  onClick={() => handleZoomChange(Math.min(300, zoom + 10))}
                  style={{
                    padding: "0.5rem",
                    background: "#E8F5E9",
                    border: "1px solid #4CAF50",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#2E7D32",
                  }}
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>

            {/* Rotation Controls */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <button
                onClick={() => handleRotate("left")}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "#fff",
                  border: "1px solid #4CAF50",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#2E7D32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                <RotateCcw size={18} />
                Rotate Left
              </button>
              <button
                onClick={() => handleRotate("right")}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "#fff",
                  border: "1px solid #4CAF50",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#2E7D32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                Rotate Right
                <RotateCw size={18} />
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "#fff",
                border: "1px solid #FF9800",
                borderRadius: "8px",
                cursor: "pointer",
                color: "#E65100",
                fontSize: "0.95rem",
                fontWeight: "500",
                marginBottom: "1.5rem",
              }}
            >
              Reset Position
            </button>

            {/* Download Button */}
            <button
              onClick={downloadImage}
              disabled={!uploadedImage}
              style={{
                width: "100%",
                padding: "1.25rem",
                background: uploadedImage ? "#4CAF50" : "#ccc",
                border: "none",
                borderRadius: "8px",
                cursor: uploadedImage ? "pointer" : "not-allowed",
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                boxShadow: uploadedImage
                  ? "0 4px 15px rgba(76, 175, 80, 0.4)"
                  : "none",
              }}
            >
              <Download size={24} />
              Download Framed Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoFrame;
