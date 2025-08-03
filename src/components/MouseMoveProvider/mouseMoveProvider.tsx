import React, { createContext, useState, MouseEvent, ReactNode } from "react";
import { throttle } from "utils";


export interface IMouseMoveContextType {
  x?: number;
  y?: number;
  toggleactive?: () => void;
}

export const MouseMoveContext = createContext<IMouseMoveContextType>({});

// mouse move provider
export function MouseMoveProvider(props: { children?: ReactNode }) {
  const { children } = props;

  const [xPos, setXpos] = useState(0);
  const [yPos, setYpos] = useState(0);
  const [active, setActive] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (active) {
      setXpos(e.clientX);
      setYpos(e.clientY);
    }
  }

  const toggleactive = React.useCallback(() => {
    setActive(!active);
    console.log("mouse move provider activated ", !active);
  }, [active]);

  const throttledmouse = throttle(handleMouseMove, active ? 80 : 1000000);

  return (
    <div
      id="provider"
      onMouseMove={throttledmouse}
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <MouseMoveContext.Provider
        value={{
          x: xPos,
          y: yPos,
          toggleactive,
        }}
      >
        {children}
      </MouseMoveContext.Provider>
    </div>
  );
}
