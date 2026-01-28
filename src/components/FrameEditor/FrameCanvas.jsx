import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { Canvas, FabricImage } from "fabric";

const FrameCanvas = forwardRef(({ mediaType, imageSrc, onCanvasClick, onLoadError }, ref) => {
    const canvasElRef = useRef(null);
    const containerRef = useRef(null);
    const fabricRef = useRef(null);

    const photoRef = useRef(null);
    const frameRef = useRef(null);
    const initialPhotoStateRef = useRef(null);

    // Track loading operations to prevent race conditions
    const photoLoadingIdRef = useRef(0);
    const frameLoadingIdRef = useRef(0);

    // ===== DIMENSIONS =====
    const getDimensions = () => {
        if (mediaType === "profile") return { w: 1080, h: 1080 };
        if (mediaType === "post") return { w: 1500, h: 1875 };
        if (mediaType === "cover") return { w: 851, h: 315 };
        return { w: 1080, h: 1080 };
    };

    const { w: WIDTH, h: HEIGHT } = getDimensions();

    // ===== INIT CANVAS (ONLY ONCE) =====
    useEffect(() => {
        if (fabricRef.current) return; // Don't recreate canvas

        const canvas = new Canvas(canvasElRef.current, {
            width: WIDTH,
            height: HEIGHT,
            backgroundColor: "#fff",
            selection: false,
            preserveObjectStacking: true,
        });

        canvas.on("mouse:down", (e) => {
            if (!e.target && !photoRef.current) {
                onCanvasClick?.();
            }
        });

        fabricRef.current = canvas;
        resizeCanvas();

        const handleResize = () => resizeCanvas();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (fabricRef.current) {
                fabricRef.current.dispose();
                fabricRef.current = null;
            }
            photoRef.current = null;
            frameRef.current = null;
            initialPhotoStateRef.current = null;
        };
    }, []);

    // ===== UPDATE CANVAS DIMENSIONS ON MEDIA TYPE CHANGE =====
    useEffect(() => {
        if (!fabricRef.current) return;

        fabricRef.current.setDimensions({ width: WIDTH, height: HEIGHT });

        // Reposition photo to new center if exists
        if (photoRef.current && initialPhotoStateRef.current) {
            const scale = Math.min(WIDTH / photoRef.current.width, HEIGHT / photoRef.current.height) * 0.9;
            photoRef.current.set({
                left: WIDTH / 2,
                top: HEIGHT / 2,
                scaleX: scale,
                scaleY: scale,
            });

            initialPhotoStateRef.current = {
                left: photoRef.current.left,
                top: photoRef.current.top,
                scaleX: photoRef.current.scaleX,
                scaleY: photoRef.current.scaleY,
                angle: photoRef.current.angle || 0,
            };
        }

        fabricRef.current.requestRenderAll();
        resizeCanvas();
    }, [WIDTH, HEIGHT]);

    // ===== RESPONSIVE =====
    const resizeCanvas = () => {
        if (!containerRef.current || !fabricRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const ratio = HEIGHT / WIDTH;

        fabricRef.current.setDimensions(
            {
                width: containerWidth,
                height: containerWidth * ratio,
            },
            { cssOnly: true }
        );

        fabricRef.current.setDimensions(
            {
                width: WIDTH,
                height: HEIGHT,
            },
            { backstoreOnly: true }
        );

        fabricRef.current.requestRenderAll();
    };

    // ===== LOAD PHOTO (BEHIND FRAME) =====
    useEffect(() => {
        const canvas = fabricRef.current;
        if (!canvas) return;

        if (!imageSrc) {
            if (photoRef.current) {
                canvas.remove(photoRef.current);
                photoRef.current = null;
                initialPhotoStateRef.current = null;
                canvas.requestRenderAll();
            }
            return;
        }

        // Allow reloading even if photo exists (for photo changes)
        const currentLoadingId = ++photoLoadingIdRef.current;

        FabricImage.fromURL(imageSrc, { crossOrigin: "anonymous" })
            .then((img) => {
                if (currentLoadingId !== photoLoadingIdRef.current) return;
                if (!fabricRef.current) return;

                const scale = Math.min(WIDTH / img.width, HEIGHT / img.height) * 0.9;

                img.scale(scale);
                img.set({
                    left: WIDTH / 2,
                    top: HEIGHT / 2,
                    originX: "center",
                    originY: "center",
                    selectable: true,
                    hasControls: false,
                    hasBorders: false,
                });

                if (photoRef.current) {
                    fabricRef.current.remove(photoRef.current);
                }

                fabricRef.current.add(img);
                photoRef.current = img;

                initialPhotoStateRef.current = {
                    left: img.left,
                    top: img.top,
                    scaleX: img.scaleX,
                    scaleY: img.scaleY,
                    angle: 0,
                };

                // Photo BEHIND frame
                fabricRef.current.sendObjectToBack(img);
                if (frameRef.current) {
                    fabricRef.current.bringObjectToFront(frameRef.current);
                }

                fabricRef.current.requestRenderAll();
            })
            .catch((err) => {
                console.error("Failed to load photo:", err);
                if (currentLoadingId === photoLoadingIdRef.current) {
                    onLoadError?.("Failed to load photo. Please try another image.");
                }
            });
    }, [imageSrc, WIDTH, HEIGHT, onLoadError]);

    // ===== LOAD FRAME (ON TOP) =====
    const loadFrame = (url) => {
        const canvas = fabricRef.current;
        if (!canvas) return;

        const currentLoadingId = ++frameLoadingIdRef.current;

        FabricImage.fromURL(url, { crossOrigin: "anonymous" })
            .then((frame) => {
                if (currentLoadingId !== frameLoadingIdRef.current) return;
                if (!fabricRef.current) return;

                if (frameRef.current) {
                    fabricRef.current.remove(frameRef.current);
                }

                const scaleX = WIDTH / frame.width;
                const scaleY = HEIGHT / frame.height;

                frame.set({
                    left: 0,
                    top: 0,
                    scaleX: scaleX,
                    scaleY: scaleY,
                    selectable: false,
                    evented: false,
                    originX: 'left',
                    originY: 'top',
                });

                fabricRef.current.add(frame);
                frameRef.current = frame;

                // Frame ON TOP of photo
                if (photoRef.current) {
                    fabricRef.current.sendObjectToBack(photoRef.current);
                    fabricRef.current.bringObjectToFront(frame);
                }

                fabricRef.current.requestRenderAll();
            })
            .catch((err) => {
                console.error("Failed to load frame:", err);
                if (currentLoadingId === frameLoadingIdRef.current) {
                    onLoadError?.("Failed to load frame. Please try again.");
                }
            });
    };

    // ===== API =====
    useImperativeHandle(ref, () => ({
        changeFrame: loadFrame,

        setZoom: (value) => {
            if (!photoRef.current || !initialPhotoStateRef.current) return;
            photoRef.current.scaleX = initialPhotoStateRef.current.scaleX * value;
            photoRef.current.scaleY = initialPhotoStateRef.current.scaleY * value;
            fabricRef.current?.requestRenderAll();
        },

        rotate: (angle) => {
            if (!photoRef.current) return;
            photoRef.current.rotate((photoRef.current.angle || 0) + angle);
            fabricRef.current?.requestRenderAll();
        },

        reset: () => {
            if (!photoRef.current || !initialPhotoStateRef.current) return;
            photoRef.current.set({ ...initialPhotoStateRef.current, angle: 0 });
            fabricRef.current?.requestRenderAll();
        },

        clearPhoto: () => {
            if (photoRef.current && fabricRef.current) {
                fabricRef.current.remove(photoRef.current);
                photoRef.current = null;
                initialPhotoStateRef.current = null;
                fabricRef.current.requestRenderAll();
            }
        },

        exportImage: () => {
            if (!fabricRef.current) return null;
            try {
                return fabricRef.current.toDataURL({ format: "png", quality: 1 });
            } catch (err) {
                console.error("Failed to export image:", err);
                onLoadError?.("Failed to export image. Please try again.");
                return null;
            }
        },
    }));

    return (
        <div
            ref={containerRef}
            className="w-full max-w-[min(90vw,500px)]"
        >
            <canvas
                ref={canvasElRef}
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    maxWidth: "100%"
                }}
                role="img"
                aria-label="Photo frame canvas"
            />
        </div>
    );
});

FrameCanvas.displayName = "FrameCanvas";
export default FrameCanvas;