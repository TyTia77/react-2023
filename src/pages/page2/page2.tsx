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
  AlertDialog,
  ComponentSize,
  Button,
  withState,
} from "components";
import { withFacade } from "./facade";
import { throttle, getRand } from "utils";
import { useToggle, useEventListening } from "hooks";

import SelectionBox from "features/SelectionBox/selectionBox";
import { Typography } from "@mui/material";

interface IwindowsProps extends IWindowProps {
  id: number;
  size: any;

  // mouse x,y position relative to window x,y position
  mx: number;
  my: number;
}

function Page2(props: any) {
  const {
    initTip,
    tipExecuted,
    containerSize,
    setContainerSize,
    session,
    setSession,
  } = props;

  const { x, y, toggleactive } = useContext(MouseMoveContext);

  const initID = useRef(session.initID);

  // recording mouse movement from provider
  const [active, setActive] = useToggle();
  const [activeDrag, setActiveDrag] = useToggle();

  const [windowDragS, setWindowDragS] = useState({ x: -1, y: -1 });

  const [windows, setwindows] = useState<IwindowsProps[]>(session.windows);
  const [activeWindow, setActiveWindow] = useState<IwindowsProps[]>(
    session.activeWindow
  );

  const [testx, setx] = useState(-1);
  const [testy, sety] = useState(-1);

  const windowPadding = 10;

  useEffect(() => {
    setSession({ windows, activeWindow, initID: initID.current });
  }, [windows, activeWindow]);

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

  // useEventListener("keyup", (e: any) => {
  //   if (e.key === "Backspace") {
  //     if (activeWindow.length) setActiveWindow([]);
  //   }
  // });

  useEventListening(
    (e: any) => {
      if (e.key === "Backspace") {
        if (activeWindow.length) setActiveWindow([]);
      }
    },
    "keyup",
    activeWindow.length > 0
  );

  // useEventListening((e:any) => {
  //     console.log("from new even", e);
  //   },
  //   "mousemove",
  //   activeWindow.length > 0
  // );

  return (
    <ComponentSize fn={({ size }: any) => setContainerSize({ ...size })}>
      <div
        id="page2"
        style={{
          height: "100vh",
          width: "100vw",
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
              const wsx = m.x - windowPadding;
              const wsy = m.y - windowPadding;

              // bottom right
              const wex = m.x + m.size.width;
              const wey = m.y + m.size.height;

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
        {!initTip && (
          <AlertDialog
            cb={tipExecuted}
            title="Tip"
            text="create movable windows. add window button on the bottom right, standard select behaviour. shift/drag to multi-select"
          />
        )}
        <Button
          onMouseDown={(e: MouseEvent) => e.stopPropagation()}
          onMouseUp={(e: MouseEvent) => e.stopPropagation()}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();

            const x = getRand(containerSize.width * 0.5, containerSize.left);
            const y = getRand(containerSize.height * 0.5, containerSize.top);

            setwindows((prev) =>
              prev.concat({
                id: ++initID.current,
                label: `id: ${initID.current}`,
                x,
                y,
                mx: -1,
                my: -1,
                selected: false,
                size: {},
              })
            );
          }}
        />

        {windows.map((t: any) => {
          // fix/cleanup
          function updatesize(newsize: any) {
            setwindows((prev: any) => {
              return prev.map((m: any) => {
                if (m.id === t.id) {
                  m = { ...m, ...newsize };
                }
                return m;
              });
            });
          }

          return (
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
                <Window x={t.x} y={t.y}>
                  <ComponentSize fn={updatesize}>
                    <Typography style={{ padding: `${windowPadding}px` }}>
                      {t.label}
                    </Typography>
                  </ComponentSize>
                </Window>
              </div>
            )
          );
        })}
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
              <Window x={t.x} y={t.y} selected={true}>
                <Typography style={{ padding: `${windowPadding - 1}px` }}>
                  {t.label}
                </Typography>
              </Window>
            </div>
          );
        })}
        <SelectionBox active={activeDrag} x={testx} y={testy} />
      </div>
    </ComponentSize>
  );
}

export default withState(withFacade(Page2));
