import React, { memo } from "react";
import "./Window.css";
import { MarchingAnts } from "components";
import Paper from "@mui/material/Paper";

export interface IWindowProps {
  x: number;
  y: number;
  label?: string;
  children?: React.ReactNode;
  selected?: boolean;
}

const _elevation = 3

export const Window = memo(function (props: IWindowProps) {
  const { x, y, label, children, selected } = props;

  return (
    <div
      className="window"
      style={{
        top: y,
        left: x,
      }}
    >
      {selected ? (
        <Paper square elevation={_elevation}>
          <MarchingAnts>
            <div>{label}</div>
            {children}
          </MarchingAnts>
        </Paper>
      ) : (
        <Paper square elevation={_elevation}>
          <div>{label}</div>
          {children}
        </Paper>
      )}
    </div>
  );
});
