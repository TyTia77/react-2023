import React from "react";
import { NavLink } from "react-router";

export function Menu(props: { params1?: number }) {
  const { params1 } = props

  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/page1" end>
        Page1
      </NavLink>
      <NavLink to="/page2">Page2</NavLink>
    </nav>
  )
}
