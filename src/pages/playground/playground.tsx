import React, { useEffect } from "react";

interface IPageProps {
  children?: React.ReactNode;
}

function Playground(props: IPageProps) {
  const { children } = props;

  return <div>Playground</div>;
}

export default Playground;
