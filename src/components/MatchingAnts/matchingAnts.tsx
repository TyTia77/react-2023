import "./style.css";

interface IMarchingAntsProps {
  children?: React.ReactNode;
}

export function MarchingAnts(props: IMarchingAntsProps) {
  const { children } = props;

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        paddingTop: "1px",
        paddingLeft: "1px",
        paddingBottom: "1px",
      }}
    >
      <div className="ants-top marchingants_right"></div>
      <div className="ants-left marchingants_up"></div>
      <div className="ants-right marchingants_down"></div>
      <div className="ants-bottom marchingants_left"></div>
      {children}
    </div>
  );
}
