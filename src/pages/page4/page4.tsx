import React, { useEffect, useState } from "react";
import { withState, ComponentToggler } from "components";
import { withFacade } from "./facade";
import { useThrottle, useEventListener } from "hooks";

import { MouseMoveListener } from "./mouseListener";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export function Page4(props: any) {
  console.log({ props });

  const [mouse, setmouse]: any = useState(false);
  const [x, setx]: any = useState(0);
  const [y, sety]: any = useState(0);

  const { count } = props;

  MouseMoveListener({
    active: mouse,
    cb: (e: any) => {
      setx(e.clientX);
      sety(e.clientY);
      console.log("throttle", { e });
    },
  });

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

// export default withState(withFacade(Page4));
