import './Window.css';

export function Window(props: { x: number, y: number, label?: string }) {

    const { x, y, label } = props

    return (
        <div
            className="Window"
            style={{
                border: '1px solid black',
                top: y,
                left: x
            }}
        >
            <div>{label}</div>
            <div>x {x}</div>
            <div>y {y}</div>
        </div>
    );
}