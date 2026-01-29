import { useRef } from "react";

export function useThrottle(callback: () => void, delay: number) {
  const firstRun = useRef(false);
  const lastExecuted = useRef<number>(Date.now());
  const cc: any = useRef();

  cc.current = (props: any) => {
    if (!firstRun.current) {
      //@ts-ignore
      callback(props);
      firstRun.current = true;
    } else if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      //@ts-ignore
      callback(props);
    }
  };

  return cc.current;
}
