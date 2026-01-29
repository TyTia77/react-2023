import { memo } from "react";
import { NavLink } from "react-router";

export const LinkNav = memo(function (props: {
  link?: any;
  children?: React.ReactNode;
}) {
  const { link, children } = props;

  return (
    <NavLink
      to={link.path}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {children ? children : link.label}
    </NavLink>
  );
});
