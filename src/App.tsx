import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Test } from "./utils";

import { Window } from "./components/index";

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
  // const initialized: React.RefObject<Boolean> = React.useRef(false);

  const [menuX, setmenuX] = React.useState(0)
  const [menuY, setmenuY] = React.useState(0)

  const [test, settest]: any = React.useState([])

  const [notes, setnotes]: any = React.useState([])


  const notetext: any = React.useRef(null)


  const [initialMenuPosX, setinitialMenuPosX] = React.useState(0)
  const [initialMenuPosY, setinitialMenuPosY] = React.useState(0)

  function handlemouseDown(e: React.MouseEvent<HTMLElement>) {

    setinitialMenuPosX(e.clientX - menuX)
    setinitialMenuPosY(e.clientY - menuY)
    // console.log({ e });
  }

  function handleMouseMove(this: any, e: React.MouseEvent<HTMLElement>) {
    if (e.buttons) {
      setmenuX(e.clientX - initialMenuPosX);
      setmenuY(e.clientY - initialMenuPosY);
    }
  }

  function handleMouseUp(e: React.MouseEvent<HTMLElement>) {
    setinitialMenuPosX(0)
    setinitialMenuPosY(0)
  }

  function handleKeyUp(e: React.MouseEvent<HTMLElement>) {
    console.log('fetching data');
  }

  function getRand(max: number, min?: number) {
    return Math.floor(Math.random() * (max - (min || 0) + 1) + (min || 0))
  }


  function handleButton(e: React.MouseEvent<HTMLElement>) {

    let x = getRand(300)
    let y = getRand(300)

    settest((prev: any) => prev.concat({ label: '', x, y }))
    // console.log('button', { e });
  }

  const throttledmouse = throttle(handleMouseMove, 80)
  const debouncedkey = debounce(handleKeyUp, 500)


  function fetchnotes() {
    fetch('http://localhost:4000/notes')
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setnotes(res.reverse())
      })
  }

  function addnotes(text: string) {

    const id = String(Number(notes[notes.length -1].id) + 1)

    fetch('http://localhost:4000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, text })
    })
    .then(() => {
      notetext.current.value = ''
      fetchnotes()
    })
  }

  function deletenotes(id: string) {
    console.log(`http://localhost:4000/notes/${id}`);
    
    fetch(`http://localhost:4000/notes/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      fetchnotes()
    })
  }

  function handlenoteclick(e: React.MouseEvent<HTMLElement>) {
    const val = notetext.current.value

    if (val.length > 0) {
      addnotes(val)
    }
    // console.log({notetext});
  }


  function handlenoteremove(e: any) {
    const i = e.target.dataset.id
    deletenotes(i)    
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
      console.log({ test })
      initialized.current = true

      fetchnotes()
    }

    return () => {
      console.log('clean');
    }

  }, []);

  return (
    <div
      className="App"
      onMouseDownCapture={handlemouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={throttledmouse}>
      <Window label={'menu'} x={menuX} y={menuY} />
      <input ref={notetext} type="text" onKeyUp={debouncedkey} />
      <button onClick={handlenoteclick}>add</button>
      {test.map((t: any) => <Window x={t.x} y={t.y} />)}

      {
        notes.map((m: any) => {
          return (
            <div>{m.text}
              <button data-id={m.id} onClick={handlenoteremove}>remove</button>
            </div>
          )
        })
      }

      <button
        onClick={handleButton}
        style={{ position: 'absolute', display: 'block', bottom: 0, right: 0 }}>add window</button>

    </div>
  );
}

export default App;
