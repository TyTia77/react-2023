import React, {
  useRef,
  useContext,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { Window, IWindowProps, MouseMoveContext } from "components";
import { throttle, getRand } from "utils";

interface IwindowsProps extends IWindowProps {
  id: number;

  // mouse x,y position relative to window x,y position
  mx: number;
  my: number;
}

export function Page2() {
  const mousemove = useContext(MouseMoveContext);
  const { x, y, toggleactive } = mousemove;

  const initID = useRef(0);

  // recording mouse movement from provider
  const [active, setActive] = useState(false);

  const [windows, setwindows] = useState<IwindowsProps[]>([]);
  const [activeWindow, setActiveWindow] = useState<IwindowsProps[]>([]);

  function handleButton(e: React.MouseEvent<HTMLElement>) {
    const x = getRand(300);
    const y = getRand(300);

    setwindows((prev) =>
      prev.concat({
        id: ++initID.current,
        label: `id: ${initID.current}`,
        x,
        y,
        mx: -1,
        my: -1,
      })
    );
  }

  function handleMove(this: any, e: MouseEvent<HTMLElement>) {
    if (e.altKey) {
      setActive(true);
      toggleactive && toggleactive();
    }

    const currentactivewindow = windows.find((f) => f.id === this);

    setActiveWindow((prev) => {
      const t = prev
        .map((m) => ({
          ...m,
          mx: e.clientX - m.x,
          my: e.clientY - m.y,
        }))
        .concat(
          currentactivewindow
            ? {
                ...currentactivewindow,
                mx: e.clientX - currentactivewindow.x,
                my: e.clientY - currentactivewindow.y,
              }
            : []
        );
      return t;
    });

    setwindows(
      windows
        .filter((f) => f.id !== this)
        .map((m) => ({ ...m, mx: -1, my: -1 }))
    );
  }

  function handleMouseUp(e: MouseEvent<HTMLElement>) {
    if (e.altKey) {
      handleMove(e);
    } else {
      if (active && toggleactive) {
        toggleactive();
        setActive(false);
      }

      if (activeWindow.length) {
        setwindows((prev) => prev.concat(activeWindow));
        setActiveWindow([]);
      }
    }
  }

  const throttled = throttle(() => {
    if (active && x && y) {
      const mapped = activeWindow.map((aw) => ({
        ...aw,
        x: x - aw.mx,
        y: y - aw.my,
      }));

      setActiveWindow(mapped);
    }
  }, 200);

  useEffect(() => {
    throttled();
  }, [x, y]);

  return (
    <div>
      create movable windows. button on the bottom right<br/>
      click to select window, multi-select supported. <br/> 
      alt+click on any window to activate drag, reclick to disable. <br/>
      <button
        onClick={handleButton}
        style={{ position: "absolute", display: "block", bottom: 0, right: 0 }}
      >
        add window
      </button>
      {windows.map(
        (t) =>
          t && (
            <div onClick={handleMove.bind(t.id)}>
              <Window label={t.label} x={t.x} y={t.y} />
            </div>
          )
      )}
      {activeWindow.length ? (
        activeWindow.map((t: any) => {
          return (
            <div onClick={handleMouseUp}>
              <Window label={t.label} x={t.x} y={t.y} selected={true} />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
