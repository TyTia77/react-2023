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
import { throttle, getRand, selectionBox } from "utils";
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

  const windowPadding = 10;

  const { x, y, toggleactive } = useContext(MouseMoveContext);

  const [dragX, setDragX] = useState(-1);
  const [dragY, setDragY] = useState(-1);
  const [windowMove, toggleWindowMove] = useToggle();

  const initID = useRef(session.initID);
  const [windows, setwindows] = useState<IwindowsProps[]>(session.windows);
  const [activeWindow, setActiveWindow] = useState<IwindowsProps[]>(
    session.activeWindow
  );

  useEffect(() => {
    setSession({ windows, activeWindow, initID: initID.current });
  }, [windows, activeWindow]);

  useEffect(() => {
    throttle(() => {
      if (windowMove && x && y) {
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
        onMouseMove={throttle((e: any) => {
          if (dragX >= 0 || dragY >= 0) {
            let win: IwindowsProps[] = [],
              activeWin: IwindowsProps[] = [];

            // drag start/top left
            const dsx = Math.min(dragX, e.clientX);
            const dsy = Math.min(dragY, e.clientY);

            // drag end/ bottom right
            const dex = Math.max(dragX, e.clientX);
            const dey = Math.max(dragY, e.clientY);

            const isSelected = selectionBox(dsx, dsy, dex, dey);

            windows.concat(activeWindow).forEach((m, i) => {
              // top left
              const wsx = m.x;
              const wsy = m.y;

              // bottom right
              const wex = m.x + m.size.width;
              const wey = m.y + m.size.height;

              isSelected(wsx, wsy, wex, wey) ? activeWin.push(m) : win.push(m);
            });

            setActiveWindow(activeWin);
            setwindows(win);
          }
        }, 300)}
        onMouseUp={function (e: any) {
          if (windowMove && toggleactive) {
            toggleWindowMove(false);
            toggleactive();
          }

          if (dragX >= 0 || dragY >= 0) {
            // let win: IwindowsProps[] = [];

            // windows.forEach((m, i) => {
            //   // top left
            //   const wsx = m.x - windowPadding;
            //   const wsy = m.y - windowPadding;

            //   // bottom right
            //   const wex = m.x + m.size.width;
            //   const wey = m.y + m.size.height;

            //   // drag start/top left
            //   const dsx = Math.min(dragX, e.clientX);
            //   const dsy = Math.min(dragY, e.clientY);

            //   // drag end/ bottom right
            //   const dex = Math.max(dragX, e.clientX);
            //   const dey = Math.max(dragY, e.clientY);

            //   if (
            //     // within drag x
            //     (wsx >= dsx && wsx <= dex) ||
            //     (wex >= dsx && wex <= dex) ||
            //     // outside drag x
            //     (dsx >= wsx && dex <= wex)
            //   ) {
            //     if (
            //       // within drag y
            //       (wsy >= dsy && wsy <= dey) ||
            //       (wey >= dsy && wey <= dey) ||
            //       // outside drag y
            //       (dsy >= wsy && dey <= wey)
            //     ) {
            //       setActiveWindow((prev) => prev.concat(m));
            //       return;
            //     }
            //   }
            //   win.push(m);
            // });

            // setwindows(win);

            setDragX(-1);
            setDragY(-1);
          }
        }}
        onMouseDown={function (e: any) {
          if (e.target.id === "page2") {
            const t = activeWindow.map((m) => ({ ...m, mx: -1, my: -1 }));
            setwindows(windows.concat(t));
            setActiveWindow([]);

            setDragX(e.clientX);
            setDragY(e.clientY);
          } else {
            toggleWindowMove();
            toggleactive && toggleactive();
          }
        }}
      >
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
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

        {!initTip && (
          <AlertDialog
            cb={tipExecuted}
            title="Tip"
            text="create movable windows. add window button on the bottom right, standard select behaviour. shift/drag to multi-select"
          />
        )}
        <SelectionBox active={dragX >= 0 || dragY >= 0} x={dragX} y={dragY} />
      </div>
    </ComponentSize>
  );
}

export default withState(withFacade(Page2));
