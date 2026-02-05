import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { Canvas, FabricImage } from "fabric";

const FrameCanvas = forwardRef(
  ({ mediaType, imageSrc, onCanvasClick, onLoadError, onPhotoLoaded }, ref) => {
    const canvasElRef = useRef(null);
    const containerRef = useRef(null);
    const fabricRef = useRef(null);

    const photoRef = useRef(null);
    const frameRef = useRef(null);
    const initialPhotoStateRef = useRef(null);

    const lastFrameUrlRef = useRef(null);
    const photoLoadingIdRef = useRef(0);
    const frameLoadingIdRef = useRef(0);
    const resizeRafRef = useRef(null);

    const getDimensions = () => {
      if (mediaType === "profile") return { w: 1080, h: 1080 };
      if (mediaType === "post") return { w: 1500, h: 1875 };
      if (mediaType === "cover") return { w: 851, h: 315 };
      return { w: 1080, h: 1080 };
    };

    const { w: WIDTH, h: HEIGHT } = getDimensions();

    const resizeCanvas = useCallback(() => {
      if (!containerRef.current || !fabricRef.current) return;
      const cw = containerRef.current.clientWidth;
      const ratio = HEIGHT / WIDTH;
      fabricRef.current.setDimensions(
        { width: cw, height: cw * ratio },
        { cssOnly: true },
      );
      fabricRef.current.requestRenderAll();
    }, [WIDTH, HEIGHT]);

    // INIT
    useEffect(() => {
      if (fabricRef.current) return;

      const canvas = new Canvas(canvasElRef.current, {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#fff",
        selection: false,
        preserveObjectStacking: true,
      });

      // canvas.on("mouse:down", (e) => {
      //   if (!e.target && !photoRef.current) onCanvasClick?.();
      // });

      fabricRef.current = canvas;
      resizeCanvas();

      const onResize = () => {
        if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
        resizeRafRef.current = requestAnimationFrame(resizeCanvas);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
        canvas.dispose();
        fabricRef.current = null;
        photoRef.current = null;
        frameRef.current = null;
        initialPhotoStateRef.current = null;
      };
    }, [resizeCanvas, WIDTH, HEIGHT, onCanvasClick]);

    // LOAD PHOTO
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

      const id = ++photoLoadingIdRef.current;

      FabricImage.fromURL(imageSrc, { crossOrigin: "anonymous" })
        .then((img) => {
          if (id !== photoLoadingIdRef.current || !fabricRef.current) return;

          const scale = Math.min(WIDTH / img.width, HEIGHT / img.height) * 0.9;

          img.set({
            originX: "center",
            originY: "center",
            left: WIDTH / 2,
            top: HEIGHT / 2,
            scaleX: scale,
            scaleY: scale,
            selectable: true,
            hasControls: false,
            hasBorders: false,
          });

          requestAnimationFrame(() => {
            if (!fabricRef.current) return;

            if (photoRef.current) fabricRef.current.remove(photoRef.current);
            fabricRef.current.add(img);
            fabricRef.current.sendObjectToBack(img);
            photoRef.current = img;

            // FORCE FRAME BACK AFTER PHOTO LOAD
            if (lastFrameUrlRef.current) {
              requestAnimationFrame(() => {
                if (fabricRef.current) {
                  loadFrame(lastFrameUrlRef.current);
                }
              });
            }

            initialPhotoStateRef.current = {
              left: img.left,
              top: img.top,
              scaleX: img.scaleX,
              scaleY: img.scaleY,
              angle: 0,
            };

            fabricRef.current.requestRenderAll();
            onPhotoLoaded?.();
          });
        })
        .catch(() => {
          if (id === photoLoadingIdRef.current) {
            onLoadError?.("Failed to load photo");
          }
        });
    }, [imageSrc, WIDTH, HEIGHT, onLoadError, onPhotoLoaded]);

    // LOAD FRAME
    const loadFrame = (url) => {
      lastFrameUrlRef.current = url;
      const canvas = fabricRef.current;
      if (!canvas) return;

      const id = ++frameLoadingIdRef.current;

      FabricImage.fromURL(url, { crossOrigin: "anonymous" })
        .then((frame) => {
          if (id !== frameLoadingIdRef.current || !fabricRef.current) return;

          requestAnimationFrame(() => {
            if (!fabricRef.current) return;

            if (frameRef.current) fabricRef.current.remove(frameRef.current);

            frame.set({
              originX: "left",
              originY: "top",
              left: 0,
              top: 0,
              scaleX: WIDTH / frame.width,
              scaleY: HEIGHT / frame.height,
              selectable: false,
              evented: false,
            });

            fabricRef.current.add(frame);
            fabricRef.current.bringObjectToFront(frame);
            frameRef.current = frame;

            fabricRef.current.requestRenderAll();
          });
        })
        .catch(() => {
          if (id === frameLoadingIdRef.current) {
            onLoadError?.("Failed to load frame");
          }
        });
    };

    // API
    useImperativeHandle(ref, () => ({
      changeFrame: loadFrame,
      setZoom: (v) => {
        if (!photoRef.current || !initialPhotoStateRef.current) return;
        photoRef.current.set({
          scaleX: initialPhotoStateRef.current.scaleX * v,
          scaleY: initialPhotoStateRef.current.scaleY * v,
        });
        fabricRef.current?.requestRenderAll();
      },
      rotate: (a) => {
        if (!photoRef.current) return;
        photoRef.current.rotate((photoRef.current.angle || 0) + a);
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

        return new Promise((resolve) => {
          fabricRef.current
            .toCanvasElement()
            .toBlob((blob) => resolve(blob), "image/png", 1);
        });
      },
    }));

    return (
      <div
        ref={containerRef}
        className="relative w-full max-w-[500px] mx-auto overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        <canvas
          ref={canvasElRef}
          className="absolute inset-0 w-full h-full block"
        />
      </div>
    );
  },
);

FrameCanvas.displayName = "FrameCanvas";
export default FrameCanvas;
