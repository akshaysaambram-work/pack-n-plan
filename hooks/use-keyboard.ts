import { useState, useEffect } from "react";

type KeyHandler = (event: KeyboardEvent) => void;
type KeyMap = { [key: string]: KeyHandler };

export function useKeyboard(keyMap: KeyMap) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = keyMap[event.key];
      if (handler) {
        handler(event);
        setPressedKeys((prev) => new Set(prev).add(event.key));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(event.key);
        return next;
      });
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    globalThis.addEventListener("keyup", handleKeyUp);

    return () => {
      globalThis.removeEventListener("keydown", handleKeyDown);
      globalThis.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyMap]);

  return pressedKeys;
}
