import { useEffect, useRef, useState } from "react";
import { useThrottle } from "hooks";

export function useEventListener(
  eventType: string,
  callback: any,
  element = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: any) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

export function useEventListening(
  cb: Function,
  event: string,
  active = false,
  delay = 200
) {
  const [track, setTrack] = useState(active);
  useEffect(() => setTrack(active), [active]);

  //@ts-ignore
  const throttledCB = useThrottle((e: MouseEvent) => cb(e), delay);

  //@ts-ignore
  useEventListener(event, throttledCB, track ? window : null);
}
