import "./Window.css";

export function Window(props: {
  x: number;
  y: number;
  label?: string;
  children?: any;
}) {
  const { x, y, label, children } = props;

  return (
    <div
      className="Window"
      style={{
        border: "1px solid black",
        top: y,
        left: x,
      }}
    >
      <div>{label}</div>
      {/* <div>x {x}</div>
            <div>y {y}</div> */}

      {children}
    </div>
  );
}
