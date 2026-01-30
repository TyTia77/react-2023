import React, { useRef, useEffect, useState } from "react";
import { useWindowSize } from "hooks";

export const ComponentSize = ({ fn, children, ...rest }: any) => {
  const elementRef = useRef(null);
  const [dimensions, setDimensions] = useState({});
  const size = useWindowSize();

  useEffect(() => {
    if (elementRef.current) {
      // getBoundingClientRect provides more precise decimal point values

      const { x, y, top, bottom, left, right, width, height } =
        // @ts-ignore
        elementRef.current.getBoundingClientRect();

      setDimensions({ x, y, top, bottom, left, right, width, height });
    }
  }, [size]); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (fn) fn({ size: { ...dimensions } });
  }, [dimensions]);

  return (
    <div {...rest} ref={elementRef}>
      {children}
    </div>
  );
};
