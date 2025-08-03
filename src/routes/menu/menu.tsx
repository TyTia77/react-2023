import { memo } from "react";
import { NavLink } from "react-router";

export const Menu = memo(function (props: { fn?: Function }) {
  const { fn } = props;

  function handleclicker() {
    // console.log('menu click');
    if (fn) fn();
  }

  return (
    <nav
      onMouseDown={handleclicker}
      onMouseUp={handleclicker}
      style={{ padding: "20px" }}
    >
      <div>drag to move</div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/page1">Page1</NavLink>
      <NavLink to="/page2">Page2</NavLink>
      <NavLink to="/page3">Page3</NavLink>
      <NavLink to="/page4">Page4</NavLink>
      <NavLink to="/page5">Page5</NavLink>
    </nav>
  );
});
