import React from "react";
import { Window } from "../../components";

export function Page2(props: { params1?: number }) {
  const { params1 } = props;

  const [windows, setwindows]: any = React.useState([]);

  function getRand(max: number, min?: number) {
    return Math.floor(Math.random() * (max - (min || 0) + 1) + (min || 0));
  }

  function handleButton(e: React.MouseEvent<HTMLElement>) {
    const x = getRand(300);
    const y = getRand(300);

    setwindows((prev: any) => prev.concat({ label: `${x},${y}`, x, y }));
  }

  return (
    <div>
      <button
        onClick={handleButton}
        style={{ position: "absolute", display: "block", bottom: 0, right: 0 }}
      >
        add window
      </button>

      {windows.map((t: any) => (
        <Window x={t.x} y={t.y} />
      ))}
    </div>
  );
}
