import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { Canvas, FabricImage } from "fabric";

const FrameCanvas = forwardRef(({ mediaType, onCanvasClick }, ref) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const photoRef = useRef(null);
    const frameRef = useRef(null);
    const initialPhotoStateRef = useRef(null);
    const isDraggingRef = useRef(false);

    const CANVAS_WIDTH = mediaType === "profile" ? 1080 : 1500;
    const CANVAS_HEIGHT = mediaType === "profile" ? 1080 : 1875;

    // =========================
    // INIT CANVAS (ONCE)
    // =========================
    useEffect(() => {
        if (fabricCanvasRef.current) return;

        const canvas = new Canvas(canvasRef.current, {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            backgroundColor: "#ffffff",
            selection: false,
            enableRetinaScaling: true,
            preserveObjectStacking: true,
        });

        fabricCanvasRef.current = canvas;
        canvas.renderAll();

        canvas.on("object:moving", () => {
            isDraggingRef.current = true;
        });

        canvas.on("mouse:up", () => {
            setTimeout(() => {
                isDraggingRef.current = false;
            }, 300);
        });

        canvas.on("mouse:down", (e) => {
            if (!e.target && !isDraggingRef.current && !photoRef.current) {
                onCanvasClick?.();
            }
        });

        const resizeCanvas = () => {
            if (!containerRef.current || !fabricCanvasRef.current) return;

            const containerWidth = containerRef.current.clientWidth;
            const canvas = fabricCanvasRef.current;

            // Maintain high-resolution buffer, scale visually with CSS
            canvas.setDimensions({
                width: containerWidth,
                height: containerWidth * (CANVAS_HEIGHT / CANVAS_WIDTH),
            }, { cssOnly: true });

            canvas.setDimensions({
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT
            }, { backstoreOnly: true });

            canvas.requestRenderAll();
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.dispose();
            fabricCanvasRef.current = null;
        };
    }, []);

    // =========================
    // MEDIA TYPE CHANGE
    // =========================
    useEffect(() => {
        if (!fabricCanvasRef.current) return;


        const canvas = fabricCanvasRef.current;

        // Clean up everything except the photo to prevent frames from stacking
        const objects = [...canvas.getObjects()];
        objects.forEach(obj => {
            if (obj !== photoRef.current) {
                canvas.remove(obj);
            }
        });
        frameRef.current = null;

        canvas.setDimensions({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
        });

        if (photoRef.current && initialPhotoStateRef.current) {
            const img = photoRef.current;
            const padding = 0.1;
            const usableWidth = CANVAS_WIDTH * (1 - 2 * padding);
            const usableHeight = CANVAS_HEIGHT * (1 - 2 * padding);

            const scale = Math.min(
                usableWidth / img.width,
                usableHeight / img.height
            );

            img.scale(scale);
            img.set({
                left: CANVAS_WIDTH / 2,
                top: CANVAS_HEIGHT / 2,
            });

            initialPhotoStateRef.current = {
                scaleX: img.scaleX,
                scaleY: img.scaleY,
                left: img.left,
                top: img.top,
                angle: img.angle || 0,
            };
        }

        if (containerRef.current) {
            const w = containerRef.current.clientWidth;
            canvas.setDimensions({
                width: w,
                height: w * (CANVAS_HEIGHT / CANVAS_WIDTH),
            }, { cssOnly: true });
        }

        canvas.renderAll();
    }, [mediaType, CANVAS_WIDTH, CANVAS_HEIGHT]);

    const loadFrame = (url) => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;

        FabricImage.fromURL(url, { crossOrigin: "anonymous" }).then((img) => {
            if (frameRef.current) canvas.remove(frameRef.current);

            img.set({
                selectable: false,
                evented: false,
                originX: "left",
                originY: "top",
                left: 0,
                top: 0,
            });

            img.scaleToWidth(CANVAS_WIDTH);
            img.scaleToHeight(CANVAS_HEIGHT);

            canvas.add(img);
            frameRef.current = img;

            if (photoRef.current) canvas.sendObjectToBack(photoRef.current);
            canvas.bringObjectToFront(img);
            canvas.renderAll();
        });
    };

    // =========================
    // EXPOSE API
    // =========================
    useImperativeHandle(ref, () => ({
        changeFrame: loadFrame,

        uploadPhoto: (file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                FabricImage.fromURL(e.target.result).then((img) => {
                    const canvas = fabricCanvasRef.current;
                    if (photoRef.current) canvas.remove(photoRef.current);

                    const padding = 0.1;
                    const usableWidth = CANVAS_WIDTH * (1 - 2 * padding);
                    const usableHeight = CANVAS_HEIGHT * (1 - 2 * padding);
                    const scale = Math.min(
                        usableWidth / img.width,
                        usableHeight / img.height
                    );

                    img.scale(scale);
                    img.set({
                        left: CANVAS_WIDTH / 2,
                        top: CANVAS_HEIGHT / 2,
                        originX: "center",
                        originY: "center",
                        selectable: true,
                        hasControls: false,
                        hasBorders: false,
                    });

                    canvas.add(img);
                    photoRef.current = img;

                    initialPhotoStateRef.current = {
                        scaleX: img.scaleX,
                        scaleY: img.scaleY,
                        left: img.left,
                        top: img.top,
                        angle: 0,
                    };

                    canvas.sendObjectToBack(img);
                    if (frameRef.current) canvas.bringObjectToFront(frameRef.current);
                    canvas.renderAll();
                });
            };
            reader.readAsDataURL(file);
        },

        setZoom: (value) => {
            if (!photoRef.current || !initialPhotoStateRef.current) return;
            const img = photoRef.current;
            img.scaleX = initialPhotoStateRef.current.scaleX * value;
            img.scaleY = initialPhotoStateRef.current.scaleY * value;
            fabricCanvasRef.current.requestRenderAll();
        },

        rotate: (angle) => {
            if (!photoRef.current) return;
            photoRef.current.rotate((photoRef.current.angle || 0) + angle);
            fabricCanvasRef.current.renderAll();
        },

        reset: () => {
            if (!photoRef.current || !initialPhotoStateRef.current) return;
            photoRef.current.set({ ...initialPhotoStateRef.current, angle: 0 });
            fabricCanvasRef.current.renderAll();
        },

        hasPhoto: () => !!photoRef.current,

        exportImage: () => {
            const canvas = fabricCanvasRef.current;
            if (!canvas) return null;

            const zoom = canvas.getZoom();
            const w = canvas.width;
            const h = canvas.height;
            const vpt = canvas.viewportTransform.slice();

            canvas.setZoom(1);
            canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
            canvas.setDimensions({
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
            });

            const data = canvas.toDataURL({ format: "png", quality: 1 });

            canvas.setDimensions({ width: w, height: h });
            canvas.setZoom(zoom);
            canvas.viewportTransform = vpt;
            canvas.renderAll();

            return data;
        },
    }));

    // =========================
    // RENDER
    // =========================
    return (
        <div ref={containerRef} className="w-full max-w-6xl mx-auto">
            <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
    );
});

FrameCanvas.displayName = "FrameCanvas";
export default FrameCanvas;