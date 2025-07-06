import React from "react";
import { Window, Menu } from "../index";
import { throttle } from "../../utils/index";

export function MenuPage(props: { children?: any }) {
  const { children } = props;

  const init = React.useRef(false);

  const [menuX, setmenuX] = React.useState(0);
  const [menuY, setmenuY] = React.useState(0);
  const [initialMenuPosX, setinitialMenuPosX] = React.useState(0);
  const [initialMenuPosY, setinitialMenuPosY] = React.useState(0);

  function handlemouseDown(e: React.MouseEvent<HTMLElement>) {
    setinitialMenuPosX(e.clientX - menuX);
    setinitialMenuPosY(e.clientY - menuY);
  }

  function handleMouseMove(this: any, e: React.MouseEvent<HTMLElement>) {
    if (e.buttons) {
      setmenuX(e.clientX - initialMenuPosX);
      setmenuY(e.clientY - initialMenuPosY);
    }
  }

  function handleMouseUp(e: React.MouseEvent<HTMLElement>) {
    setinitialMenuPosX(0);
    setinitialMenuPosY(0);
  }

  const throttledmouse = throttle(handleMouseMove, 80);

  React.useEffect(() => {
    if (!init.current) {
      init.current = true;
      const menuPosX = Number(localStorage.getItem("_menuPositionX"));
      const menuPosY = Number(localStorage.getItem("_menuPositionY"));

      if (menuPosX) {
        setmenuX(menuPosX);
        setmenuY(menuPosY);
      }
    } else {
      localStorage.setItem("_menuPositionX", String(menuX));
      localStorage.setItem("_menuPositionY", String(menuY));
    }
    // return () => {}
  }, [menuX, menuY]);

  return (
    <div
      onMouseDown={handlemouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={throttledmouse}
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Window x={menuX} y={menuY}>
        <Menu />
      </Window>
      {children}
    </div>
  );
}
