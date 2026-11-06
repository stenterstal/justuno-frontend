import { useEffect, useState } from "react";

// iOS keyboards shrink the visual viewport but not the layout viewport, so a
// `bottom: 0` fixed element ends up behind the keyboard with blank space around it.
// Returns how far the bottom of the visible area is above the layout viewport's bottom.
// (Android resizes the layout viewport itself via interactive-widget in index.html, so this stays 0 there.)
export function useKeyboardInset(): number {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      // Leave fixed elements alone while pinch-zoomed
      if (viewport.scale > 1.01) {
        setInset(0);
        return;
      }
      setInset(Math.max(0, window.innerHeight - viewport.offsetTop - viewport.height));
    };

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, []);

  return inset;
}
