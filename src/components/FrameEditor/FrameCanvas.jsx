import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Canvas, Image as FabricImage } from "fabric";

const FrameCanvas = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const photoRef = useRef(null);
    const frameRef = useRef(null);

    const CANVAS_WIDTH = 1080;
    const CANVAS_HEIGHT = 1080;

    useEffect(() => {
        if (fabricCanvasRef.current) {
            fabricCanvasRef.current.dispose();
        }

        const canvas = new Canvas(canvasRef.current, {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            backgroundColor: "#ffffff",
            selection: false,
            preserveObjectStacking: true,
        });

        fabricCanvasRef.current = canvas;

        // Load initial frame
        loadFrame("/frames/frame1.png");

        // Responsive scaling
        const resizeCanvas = () => {
            if (containerRef.current && fabricCanvasRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const linkCanvas = fabricCanvasRef.current;

                // Calculate scale factor to fit container
                const scaleRatio = containerWidth / CANVAS_WIDTH;

                // Set dimensions via CSS scaling to keep internal resolution high
                linkCanvas.setDimensions(
                    { width: containerWidth, height: containerWidth }, // Square aspect
                    { cssOnly: false } // We actually change dimension for display, but keep content scaled? 
                    // No, better to use setZoom/setDimensions for display but that complicates export.
                    // Simpler approach: Keep strict 1080x1080 internal, use CSS transform on the wrapper.
                );

                // Actually, Fabric's setDimensions with cssOnly: true doesn't work well for all events.
                // Let's rely on standard Fabric scaling:
                // We set width/height to container size, and use setZoom to scale content.

                linkCanvas.setDimensions({ width: containerWidth, height: containerWidth });
                linkCanvas.setZoom(scaleRatio);
            }
        };

        // Initial resize
        setTimeout(resizeCanvas, 100);

        // Watch for resize
        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.dispose();
        };
    }, []);

    const loadFrame = (frameUrl) => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;

        FabricImage.fromURL(frameUrl, { crossOrigin: "anonymous" }).then((img) => {
            if (frameRef.current) {
                canvas.remove(frameRef.current);
            }

            img.set({
                selectable: false,
                evented: false,
                hasControls: false,
                hasBorders: false,
                excludeFromExport: false,
                originX: "left",
                originY: "top",
                left: 0,
                top: 0
            });

            // Scale frame to internal 1080x1080
            img.scaleToWidth(CANVAS_WIDTH);
            img.scaleToHeight(CANVAS_HEIGHT);

            canvas.add(img);
            frameRef.current = img;

            if (photoRef.current) {
                canvas.sendToBack(photoRef.current);
            }
            canvas.bringToFront(img);
            canvas.renderAll();
        });
    };

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
        changeFrame: (frameUrl) => {
            loadFrame(frameUrl);
        },

        // Upload photo to canvas
        uploadPhoto: (file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                FabricImage.fromURL(e.target.result, { crossOrigin: "anonymous" }).then((img) => {
                    const canvas = fabricCanvasRef.current;
                    if (photoRef.current) {
                        canvas.remove(photoRef.current);
                    }

                    // Initial scale to cover canvas roughly
                    const scale = Math.max(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height);
                    img.scale(scale);

                    img.set({
                        left: CANVAS_WIDTH / 2,
                        top: CANVAS_HEIGHT / 2,
                        originX: "center",
                        originY: "center",
                        selectable: true,
                        hasControls: true,
                        cornerColor: 'white',
                        borderColor: '#006a4e',
                        cornerStyle: 'circle',
                    });

                    canvas.add(img);
                    photoRef.current = img;
                    canvas.sendToBack(img);

                    if (frameRef.current) {
                        canvas.bringToFront(frameRef.current);
                    }
                    canvas.renderAll();
                });
            };
            reader.readAsDataURL(file);
        },

        setZoom: (value) => {
            if (photoRef.current) {
                const img = photoRef.current;
                img.scaleX = value;
                img.scaleY = value;
                fabricCanvasRef.current.requestRenderAll();
            }
        },

        reset: () => {
            if (photoRef.current) {
                const img = photoRef.current;
                const scale = Math.max(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height);
                img.scale(scale);
                img.set({
                    left: CANVAS_WIDTH / 2,
                    top: CANVAS_HEIGHT / 2
                });
                fabricCanvasRef.current.renderAll();
            }
        },

        // Export canvas as base64 PNG
        exportImage: () => {
            const canvas = fabricCanvasRef.current;
            if (canvas) {
                const originalZoom = canvas.getZoom();
                const originalWidth = canvas.getWidth();
                const originalHeight = canvas.getHeight();

                canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
                canvas.setWidth(CANVAS_WIDTH);
                canvas.setHeight(CANVAS_HEIGHT);

                const dataUrl = canvas.toDataURL({
                    format: "png",
                    quality: 1,
                    multiplier: 1,
                    enableRetinaScaling: true
                });

                canvas.setZoom(originalZoom);
                canvas.setWidth(originalWidth);
                canvas.setHeight(originalHeight);

                return dataUrl;
            }
            return null;
        },
    }));

    return (
        <div className="canvas-container w-full h-full" ref={containerRef}>
            <canvas ref={canvasRef} />
        </div>
    );
});

FrameCanvas.displayName = "FrameCanvas";

export default FrameCanvas;
