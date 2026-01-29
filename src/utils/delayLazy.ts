import { lazy } from "react";

export function lazyDelay(cb: any, delay: number) {
  return lazy(
    () =>
      new Promise((res) =>
        //@ts-ignore
        setTimeout(() => res(cb), delay)
      )
  );
}
