import React, {
  useRef,
  useContext,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { Window, IWindowProps, MouseMoveContext } from "components";
import { throttle, getRand } from "utils";
import { useToggle, useWindowSize, useEventListener } from "hooks";

function SelectBox({ x, y }: any) {
  const [xheight, setheight] = useState(0);
  const [xwidth, setwidth] = useState(0);

  const [translatex, settransx] = useState(0);
  const [translatey, settransy] = useState(0);

  useEventListener("mousemove", (e: React.MouseEvent<HTMLElement>) => {
    const xw = e.clientX - x;
    const xh = e.clientY - y;

    if (xh < 0) settransy(xh);
    if (xw < 0) settransx(xw);

    setheight(Math.abs(xh));
    setwidth(Math.abs(xw));
  });

  return (
    <div
      id="drag"
      style={{
        border: "1px solid grey",
        height: `${xheight}px`,
        width: `${xwidth}px`,
        position: "absolute",
        transform: `translate(${translatex}px, ${translatey}px)`,
      }}
    ></div>
  );
}

export default SelectBox;
