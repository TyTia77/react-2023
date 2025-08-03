import React from "react";

interface IComponentProps {
  children?: React.ReactNode;
}

export function Component(props: IComponentProps) {
  const { children } = props;

  return <div>component</div>;
}
