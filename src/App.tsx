import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Test } from "./utils";

import { Window, Menu } from "./components/index";

import { throttle, debounce } from "./utils";

function App() {
  // const prom = new Promise(function(res, rej){
  //   setTimeout(function(){
  //     res({})
  //   }, 5000)
  // })

  // let test = new Test('sup my g')
  //   .reverse()
  //   .greet()

  // own implementation of Array.bind
  // function bind(this: any, ...args: any){
  //   let obj: Function = this
  //   let params = args.slice(1)

  //   return function(...args2: any){
  //     obj.apply(args[0], [...params, ...args2])
  //   }
  // }

  // const closure = (a: any) => {
  //   let aa = a;

  //   return (b?: any) => {
  //     if (b) {
  //       aa = aa + b
  //     }

  //     console.log({aa})
  //   }
  // }

  // let c = closure(3);
  // let a = closure(100);

  // a()
  // c()

  // a(2)
  // a(-2)
  // c()

  // queueMicrotask

  const initialized: any = React.useRef(false);

  const [notes, setnotes]: any = React.useState([]);

  const notetext: any = React.useRef(null);

  function handleKeyUp(e: React.MouseEvent<HTMLElement>) {
    console.log("fetching data");
  }

  const debouncedkey = debounce(handleKeyUp, 500);

  function fetchnotes() {
    fetch("http://localhost:4000/notes")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setnotes(res.reverse());
      });
  }

  function addnotes(text: string) {
    const id = String(Number(notes[notes.length - 1].id) + 1);

    fetch("http://localhost:4000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, text }),
    }).then(() => {
      notetext.current.value = "";
      fetchnotes();
    });
  }

  function deletenotes(id: string) {
    console.log(`http://localhost:4000/notes/${id}`);

    fetch(`http://localhost:4000/notes/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchnotes();
    });
  }

  function handlenoteclick(e: React.MouseEvent<HTMLElement>) {
    const val = notetext.current.value;

    if (val.length > 0) {
      addnotes(val);
    }
  }

  function handlenoteremove(e: any) {
    const i = e.target.dataset.id;
    deletenotes(i);
  }

  useEffect(() => {
    // This code runs whenever 'myProp' changes
    // console.log('myProp has changed:');
    // Perform any side effects here, e.g., fetching data, updating local state
    // console.log({
    //   menuX,
    //   menuY
    // });

    if (!initialized.current) {
      initialized.current = true;

      fetchnotes();
    }

    return () => {
      // console.log('clean');
    };
  }, []);

  return (
    <div className="App">
      <input ref={notetext} type="text" onKeyUp={debouncedkey} />
      <button onClick={handlenoteclick}>add</button>

      {notes.map((m: any) => {
        return (
          <div>
            {m.text}
            <button data-id={m.id} onClick={handlenoteremove}>
              remove
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
