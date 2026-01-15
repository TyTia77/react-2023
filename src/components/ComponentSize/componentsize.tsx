import React, { useRef, useEffect, useState } from 'react';

export const ComponentSize = ({fn, children}:any) => {
    const elementRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });


    useEffect(() => {
    if (elementRef.current) {
      // getBoundingClientRect provides more precise decimal point values

    // @ts-ignore
      const { width, height } = elementRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []); // Empty dependency array ensures this runs only once on mount


  useEffect(() => {
    // @ts-ignore
    console.log({dimensions}, elementRef.current);
    fn({size: {...dimensions}})

  }, [dimensions])

  return (
    <div ref={elementRef}>
        {children}
    </div>
  );
}