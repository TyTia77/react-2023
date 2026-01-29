import React, { useEffect } from "react";
import { useThrottle, useEventListener } from "hooks";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export function MouseMoveListener({ active, cb, delay = 60 }: any) {
  const throttledCB = useThrottle(cb, delay);

  //@ts-ignore
  useEventListener("mousemove", throttledCB, active ? window : null);

  return (
    // <Container>
    //   <Box>mouse move</Box>
    // </Container>
    <></>
  );
}
