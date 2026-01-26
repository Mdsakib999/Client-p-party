import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Canvas, Image as FabricImage } from "fabric";

const FrameCanvas = forwardRef(({ mediaType, onCanvasClick }, ref) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const photoRef = useRef(null);
    const frameRef = useRef(null);
    const initialPhotoStateRef = useRef(null);
    const isDraggingRef = useRef(false);
    const currentMediaTypeRef = useRef(mediaType);

    const CANVAS_WIDTH = mediaType === "profile" ? 1080 : 1500;
    const CANVAS_HEIGHT = mediaType === "profile" ? 1080 : 1875;

    // Initialize canvas ONCE - don't recreate on mediaType change
    useEffect(() => {
        if (fabricCanvasRef.current) {
            return; // Canvas already exists, don't recreate
        }

        const canvas = new Canvas(canvasRef.current, {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            backgroundColor: "#ffffff",
            selection: false,
            preserveObjectStacking: true,
        });

        fabricCanvasRef.current = canvas;

        // Track drag state to prevent upload trigger during drag
        canvas.on('object:moving', () => {
            isDraggingRef.current = true;
        });

        canvas.on('mouse:up', () => {
            // Increased delay to prevent accidental file picker trigger
            setTimeout(() => {
                isDraggingRef.current = false;
            }, 300);
        });

        // Handle canvas click for upload - only when clicking empty space and not dragging
        canvas.on('mouse:down', (e) => {
            if (!e.target && !isDraggingRef.current && onCanvasClick) {
                onCanvasClick();
            }
        });

        const resizeCanvas = () => {
            if (containerRef.current && fabricCanvasRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const canvas = fabricCanvasRef.current;
                const currentWidth = currentMediaTypeRef.current === "profile" ? 1080 : 1500;
                const currentHeight = currentMediaTypeRef.current === "profile" ? 1080 : 1875;
                const scaleRatio = containerWidth / currentWidth;

                canvas.setDimensions({
                    width: containerWidth,
                    height: containerWidth * (currentHeight / currentWidth)
                });
                canvas.setZoom(scaleRatio);
            }
        };

        setTimeout(resizeCanvas, 100);
        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (fabricCanvasRef.current) {
                fabricCanvasRef.current.dispose();
                fabricCanvasRef.current = null;
            }
        };
    }, []); // Only run once on mount

    // Handle mediaType changes without recreating canvas
    useEffect(() => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        currentMediaTypeRef.current = mediaType;

        // Resize canvas for new dimensions
        canvas.setDimensions({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });

        // Rescale photo if it exists
        if (photoRef.current && initialPhotoStateRef.current) {
            const padding = 0.1;
            const usableWidth = CANVAS_WIDTH * (1 - 2 * padding);
            const usableHeight = CANVAS_HEIGHT * (1 - 2 * padding);
            const img = photoRef.current;

            // Recalculate scale for new canvas size
            const scale = Math.min(usableWidth / img.width, usableHeight / img.height);
            img.scale(scale);
            img.set({
                left: CANVAS_WIDTH / 2,
                top: CANVAS_HEIGHT / 2,
            });

            // Update initial state for new dimensions
            initialPhotoStateRef.current = {
                scaleX: img.scaleX,
                scaleY: img.scaleY,
                left: img.left,
                top: img.top,
                angle: img.angle || 0
            };
        }

        // Resize container
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const scaleRatio = containerWidth / CANVAS_WIDTH;
            canvas.setDimensions({
                width: containerWidth,
                height: containerWidth * (CANVAS_HEIGHT / CANVAS_WIDTH)
            });
            canvas.setZoom(scaleRatio);
        }

        canvas.renderAll();
    }, [mediaType, CANVAS_WIDTH, CANVAS_HEIGHT]);

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

            img.scaleToWidth(CANVAS_WIDTH);
            img.scaleToHeight(CANVAS_HEIGHT);

            canvas.add(img);
            frameRef.current = img;

            // Ensure proper layering: photo behind, frame in front
            if (photoRef.current) {
                canvas.sendObjectToBack(photoRef.current);
            }
            canvas.bringObjectToFront(img);
            canvas.renderAll();
        });
    };

    useImperativeHandle(ref, () => ({
        changeFrame: (frameUrl) => {
            loadFrame(frameUrl);
        },

        uploadPhoto: (file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                FabricImage.fromURL(e.target.result, { crossOrigin: "anonymous" }).then((img) => {
                    const canvas = fabricCanvasRef.current;
                    if (photoRef.current) {
                        canvas.remove(photoRef.current);
                    }

                    // Calculate padding (10% on each side for frame border)
                    const padding = 0.1;
                    const usableWidth = CANVAS_WIDTH * (1 - 2 * padding);
                    const usableHeight = CANVAS_HEIGHT * (1 - 2 * padding);

                    // Use Math.min to fit INSIDE the frame area, not cover it
                    const scale = Math.min(usableWidth / img.width, usableHeight / img.height);
                    img.scale(scale);

                    img.set({
                        left: CANVAS_WIDTH / 2,
                        top: CANVAS_HEIGHT / 2,
                        originX: "center",
                        originY: "center",
                        selectable: true,
                        hasControls: true,
                        cornerColor: '#16a34a',
                        borderColor: '#16a34a',
                        cornerStyle: 'circle',
                        borderScaleFactor: 2,
                        cornerSize: 12,
                        transparentCorners: false,
                    });

                    canvas.add(img);
                    photoRef.current = img;

                    // Save initial state
                    initialPhotoStateRef.current = {
                        scaleX: img.scaleX,
                        scaleY: img.scaleY,
                        left: img.left,
                        top: img.top,
                        angle: 0
                    };

                    // Ensure proper layering
                    canvas.sendObjectToBack(img);
                    if (frameRef.current) {
                        canvas.bringObjectToFront(frameRef.current);
                    }

                    const placeholder = document.getElementById("placeholder-text");
                    if (placeholder) placeholder.style.display = "none";

                    canvas.renderAll();
                });
            };
            reader.readAsDataURL(file);
        },

        setZoom: (value) => {
            if (photoRef.current && initialPhotoStateRef.current) {
                const img = photoRef.current;
                img.scaleX = initialPhotoStateRef.current.scaleX * value;
                img.scaleY = initialPhotoStateRef.current.scaleY * value;
                fabricCanvasRef.current.requestRenderAll();
            }
        },

        rotate: (angle) => {
            if (photoRef.current) {
                const currentAngle = photoRef.current.angle || 0;
                photoRef.current.rotate(currentAngle + angle);
                fabricCanvasRef.current.renderAll();
            }
        },

        reset: () => {
            if (photoRef.current && initialPhotoStateRef.current) {
                const img = photoRef.current;
                img.set({
                    scaleX: initialPhotoStateRef.current.scaleX,
                    scaleY: initialPhotoStateRef.current.scaleY,
                    left: initialPhotoStateRef.current.left,
                    top: initialPhotoStateRef.current.top,
                    angle: 0
                });
                fabricCanvasRef.current.renderAll();
            }
        },

        hasPhoto: () => {
            return photoRef.current !== null;
        },

        exportImage: () => {
            const canvas = fabricCanvasRef.current;
            if (!canvas) return null;

            // Save current display state
            const originalZoom = canvas.getZoom();
            const originalWidth = canvas.width;
            const originalHeight = canvas.height;
            const originalVpt = canvas.viewportTransform.slice();

            // Reset to actual canvas size for export
            canvas.setZoom(1);
            canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
            canvas.setDimensions({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
            canvas.renderAll();

            const dataUrl = canvas.toDataURL({
                format: "png",
                quality: 1,
                multiplier: 1,
            });

            // Restore display state
            canvas.setDimensions({ width: originalWidth, height: originalHeight });
            canvas.setZoom(originalZoom);
            canvas.viewportTransform = originalVpt;
            canvas.renderAll();

            return dataUrl;
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

