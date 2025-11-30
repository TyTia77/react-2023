import React, {
  useRef,
  useContext,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import {
  Window,
  IWindowProps,
  MouseMoveContext,
  ComponentToggler,
} from "components";
import { throttle, getRand } from "utils";
import { useToggle, useWindowSize, useEventListener } from "hooks";
import SelectBox from "./selectbox";

interface IwindowsProps extends IWindowProps {
  id: number;

  // mouse x,y position relative to window x,y position
  mx: number;
  my: number;
}

function Page2() {
  const { x, y, toggleactive } = useContext(MouseMoveContext);

  const initID = useRef(0);

  // recording mouse movement from provider
  const [active, setActive] = useToggle();

  const [activeDrag, setActiveDrag] = useToggle();

  const [windowDragS, setWindowDragS] = useState({ x: -1, y: -1 });

  const [windows, setwindows] = useState<IwindowsProps[]>([]);
  const [activeWindow, setActiveWindow] = useState<IwindowsProps[]>([]);

  const [testx, setx] = useState(-1);
  const [testy, sety] = useState(-1);

  useEffect(() => {
    throttle(() => {
      if (active && x && y) {
        const mapped = activeWindow.map((aw) => ({
          ...aw,
          x: x - aw.mx,
          y: y - aw.my,
        }));

        setActiveWindow(mapped);
      }
    }, 200)();
  }, [x, y]);

  return (
    <div
      id="page2"
      style={{
        height: "100%",
        width: "100%",
      }}
      onMouseUp={function (e: any) {
        if (active && toggleactive) {
          setActive(false);
          toggleactive();
        }

        if (activeDrag) {
          setActiveDrag(false);

          let win: IwindowsProps[] = [];

          windows.forEach((m, i) => {
            // top left
            const { x: wsx, y: wsy } = m;

            // bottom right
            const wex = m.x + 32;
            const wey = m.y + 18;

            // drag start/top left
            const dsx = Math.min(windowDragS.x, e.clientX);
            const dsy = Math.min(windowDragS.y, e.clientY);

            // drag end/ bottom right
            const dex = Math.max(windowDragS.x, e.clientX);
            const dey = Math.max(windowDragS.y, e.clientY);

            if (
              // within drag x
              (wsx >= dsx && wsx <= dex) ||
              (wex >= dsx && wex <= dex) ||
              // outside drag x
              (dsx >= wsx && dex <= wex)
            ) {
              if (
                // within drag y
                (wsy >= dsy && wsy <= dey) ||
                (wey >= dsy && wey <= dey) ||
                // outside drag y
                (dsy >= wsy && dey <= wey)
              ) {
                setActiveWindow((prev) => prev.concat(m));
                return;
              }
            }
            win.push(m);
          });

          setwindows(win);
        }
      }}
      onMouseDown={function (e: any) {
        if (e.target.id === "page2") {
          const t = activeWindow.map((m) => ({ ...m, mx: -1, my: -1 }));
          setwindows(windows.concat(t));
          setActiveWindow([]);

          setx(e.clientX);
          sety(e.clientY);

          setActiveDrag(true);
          setWindowDragS({ x: e.clientX, y: e.clientY });
        } else {
          setActive(true);
          toggleactive && toggleactive();
        }
      }}
    >
      create movable windows. button on the bottom right
      <br />
      standard select behaviour. shift/drag to multi-select
      <br />
      <br />
      <button
        // prevent bubbling to parent
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();

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
              selected: false,
            })
          );
        }}
        style={{ position: "absolute", display: "block", bottom: 0, right: 0 }}
      >
        add window
      </button>
      <ComponentToggler active={activeDrag}>
        <div
          id="drag"
          style={{
            position: "absolute",
            left: testx,
            top: testy,
          }}
        >
          <SelectBox x={testx} y={testy} />
        </div>
      </ComponentToggler>
      {windows.map(
        (t: any) =>
          t && (
            <div
              id="window"
              key={t.id}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={function (e: any) {
                const index = windows.findIndex((w) => w.id === t.id);

                if (e.shiftKey) {
                  const newactive = activeWindow
                    .concat(windows[index] || [])
                    .map((m) => ({
                      ...m,
                      mx: e.clientX - m.x,
                      my: e.clientY - m.y,
                    }));

                  // // @ts-ignore

                  setActiveWindow(newactive);

                  const newwin = windows
                    .filter((f, i) => i !== index)
                    .map((m) => ({ ...m, mx: -1, my: -1 }));

                  setwindows(newwin);
                } else {
                  const newactive = [windows[index]].map((m) => ({
                    ...m,
                    mx: e.clientX - m.x,
                    my: e.clientY - m.y,
                  }));
                  const newwindow = windows
                    .filter((f, i) => i !== index)
                    .concat(activeWindow)
                    .map((m) => ({ ...m, mx: -1, my: -1 }));

                  setActiveWindow(newactive);
                  setwindows(newwindow);
                }
              }}
            >
              <Window label={t.label} x={t.x} y={t.y}></Window>
            </div>
          )
      )}
      {activeWindow.map((t: any) => {
        return (
          <div
            id="window"
            key={t.id}
            onMouseDown={(e: any) => {
              setActiveWindow((prev) =>
                prev.map((m) => ({
                  ...m,
                  mx: e.clientX - m.x,
                  my: e.clientY - m.y,
                }))
              );
            }}
          >
            <Window label={t.label} x={t.x} y={t.y} selected={true}></Window>
          </div>
        );
      })}
    </div>
  );
}

export default Page2;
