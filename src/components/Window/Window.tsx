import React, { memo } from "react";
import "./Window.css";
import { MarchingAnts } from "components";

export interface IWindowProps {
  x: number;
  y: number;
  label?: string
  children?: React.ReactNode;
  selected?: boolean;
}

export const Window = memo(function(props: IWindowProps){
  const { x, y, label, children, selected } = props;

  return (
    <div
      className="Window"
      style={{
        border: selected ? "none" : "1px solid black",
        top: y,
        left: x,
      }}
    >
      {selected ? (
        <MarchingAnts>
          <div>{label}</div>
          {children}
        </MarchingAnts>
      ) : (
        <>
          <div>{label}</div>
          {children}
        </>
      )}
    </div>
  );
})