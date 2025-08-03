import React, {
  useRef,
  useState,
  MouseEvent,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { Window } from "components";
import { Menu } from "routes";
import { throttle } from "utils";



export function MenuWindow({ children }: { children: ReactNode }) {
  const init = useRef(false);
  const menuActive = useRef(false);

  const [menuX, setmenuX] = useState(0);
  const [menuY, setmenuY] = useState(0);
  const [initialMenuPosX, setinitialMenuPosX] = useState(0);
  const [initialMenuPosY, setinitialMenuPosY] = useState(0);

  function handlemouseDown(e: MouseEvent<HTMLElement>) {
    setinitialMenuPosX(e.clientX - menuX);
    setinitialMenuPosY(e.clientY - menuY);
  }

  function handleMouseMove(this: any, e: MouseEvent<HTMLElement>) {
    if (e.buttons && menuActive.current) {
      setmenuX(e.clientX - initialMenuPosX);
      setmenuY(e.clientY - initialMenuPosY);
    }
  }

  function handleMouseUp(e: MouseEvent<HTMLElement>) {
    setinitialMenuPosX(0);
    setinitialMenuPosY(0);
  }

  const toggleactivemenu = useCallback(() => {
    menuActive.current = !menuActive.current;
  }, []);

  const throttledmouse = throttle(
    handleMouseMove,
    menuActive.current ? 80 : 1000000
  );

  useEffect(() => {
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

  useEffect(() => {
    console.log('menuwin rerender');
    
  }, [])

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
        <Menu fn={toggleactivemenu} />
      </Window>
      {children}
    </div>
  );
}
