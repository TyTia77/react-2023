import { memo } from "react";
import { NavLink } from "react-router";

export const Navlink = memo(function (props: { link?: String, children?: React.ReactNode }) {
  const { link, children } = props;

  return (
    <NavLink
      to={link?.includes('Page') ? `/${link}` : "/"}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {children ? children : link}
    </NavLink>
  );
});
