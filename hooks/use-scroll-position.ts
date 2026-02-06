import { useEffect, useState } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (typeof globalThis === "undefined") return;

    const handleScroll = () => {
      setScrollPosition({
        x: globalThis.scrollX,
        y: globalThis.scrollY,
      });
    };

    globalThis.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}
