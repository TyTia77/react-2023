import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useWindowSize, useEventListener } from "hooks";
import { ComponentSize } from "components";

export const MainLayout = (props: any) => {
  const { children } = props;

  //   useWindowSize();

  //   useEventListener("resize", (e: any) => {
  //     console.log({ e });
  //   });

  return (
    <Container>
      <Box
        p={1}
        sx={{
          height: "100vh",
          display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
