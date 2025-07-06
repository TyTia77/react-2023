import React from "react";

export function Page1(props: { params1?: number }) {
  const { params1 } = props;

  const [notes, setnotes]: any = React.useState([]);

  const ref: any = React.useRef(null);
  const init: any = React.useRef(false);

  function notetostorage(note: any) {
    localStorage.setItem("_notes", JSON.stringify(note));
  }

  function handleonclick(e: any) {
    const val = ref.current.value;

    if (val.length > 0) {
      setnotes((prev: any) => {
        return prev.concat({ id: "", text: val });
      });
      ref.current.value = "";
    }

    console.log({ val });
  }

  function handleonclickclear() {
    setnotes([]);
  }

  React.useEffect(() => {
    if (!init.current) {
      init.current = true;
      const notefromstorage = localStorage.getItem("_notes");

      if (notefromstorage) {
        setnotes((p: any) => p.concat(JSON.parse(notefromstorage || "")));
      }
    } else {
      notetostorage(notes);
      console.log("changes", notes);
    }
    // return () => {}
  }, [notes]);

  return (
    <div>
      <input ref={ref} type="text" />
      <button onClick={handleonclick}>add</button>
      <button onClick={handleonclickclear}>clear</button>
      {notes.map((m: any) => {
        return <div>{m.text}</div>;
      })}
    </div>
  );
}
