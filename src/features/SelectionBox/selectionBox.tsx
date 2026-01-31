import React, { useState, MouseEvent } from "react";
import { useEventListening } from "hooks";
import { withFacade } from "./facade";

function SelectionBox({ x = 0, y = 0 }) {
  const [xheight, setheight] = useState(0);
  const [xwidth, setwidth] = useState(0);

  const [translatex, settransx] = useState(0);
  const [translatey, settransy] = useState(0);

  useEventListening(
    ({ clientX, clientY }: MouseEvent) => {
      const xw = clientX - x;
      const xh = clientY - y;

      if (xh < 0) settransy(xh);
      if (xw < 0) settransx(xw);

      setheight(Math.abs(xh));
      setwidth(Math.abs(xw));
    },
    "mousemove",
    true,
    30
  );

  return (
    <div
      style={{
        border: "1px solid grey",
        left: x,
        top: y,
        height: `${xheight}px`,
        width: `${xwidth}px`,
        position: "absolute",
        transform: `translate(${translatex}px, ${translatey}px)`,
      }}
    ></div>
  );
}

export default withFacade(SelectionBox);
