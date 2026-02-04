import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import { green } from "@mui/material/colors";
import { SxProps } from "@mui/system";
// import { Typography } from "@mui/material";

export const Button = (props: any) => {
  const theme = useTheme();

  const fabStyle = {
    // position: "absolute",
    // bottom: 16,
    // right: 16,
  };

  const fabGreenStyle = {
    color: "common.white",
    bgcolor: green[500],
    "&:hover": {
      bgcolor: green[600],
    },
  };

  //   const fabs = [
  //     {
  //       color: "primary" as const,
  //       sx: fabStyle as SxProps,
  //       icon: <AddIcon />,
  //       label: "Add",
  //     },
  //   ];

  // add
  // edit
  // like
  // extended
  // delete

  return (
    // <Zoom
    //   key={"primary" as const}
    //   in={true}
    //   timeout={{
    //     enter: theme.transitions.duration.enteringScreen,
    //     exit: theme.transitions.duration.leavingScreen,
    //   }}
    //   style={{
    //     transitionDelay: `${theme.transitions.duration.leavingScreen}ms`,
    //   }}
    //   unmountOnExit
    // >
    <Fab
      // sx={fabStyle as SxProps}
      aria-label={"Add"}
      color={"primary" as const}
      {...props}
    >
      <AddIcon />
    </Fab>
    // </Zoom>
  );
};
