import React, { useEffect, useState } from "react";
import { withState, ComponentToggler } from "components";
import { withFacade } from "./facade";
import { useEventListening } from "hooks";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export function Page4(props: any) {
  const { count } = props;

  const [mouse, setmouse]: any = useState(false);
  const [x, setx]: any = useState(0);
  const [y, sety]: any = useState(0);

  useEventListening(
    (e: any) => {
      setx(e.clientX);
      sety(e.clientY);
    },
    "mousemove",
    mouse,
    30
  );

  return (
    <Container>
      <Box>
        <div>redux with redux toolkit</div>
        <div>{count}</div>
        <button onClick={setmouse.bind(null, !mouse)}>toggle mouse</button>
        x:{x} y:{y}
      </Box>
    </Container>
  );
}

export default withState(withFacade(Page4));
