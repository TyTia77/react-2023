import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./page6.css";

import { Window, Button } from "components";
import { throttle, debounce, Test } from "utils";
import { useFetch } from "hooks";

function Page6() {
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

  const notebkup: any = React.useRef([]);
  const notetext: any = React.useRef(null);
  const noteRefs: any = React.useRef([]);
  const [notes, setnotes]: any[] = React.useState([]);

  function handleKeyUp(e: any) {
    console.log("fetching data");

    if (e.key === "Backspace" && !notetext.current.value.length) {
      setnotes(notebkup.current);
    } else {
      search();
    }
  }

  const debouncedkey = debounce(handleKeyUp, 500);

  function fetchnotes() {
    fetch("http://localhost:4000/notes")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const resnotes = res.reverse();
        notebkup.current = resnotes;
        setnotes(resnotes);
      });
  }

  function addnotes(text: string) {
    const id = String(
      Number(
        notes.reduce((a: any, n: any) => {
          return a > Number(n.id) ? a : Number(n.id);
        }, 1) + 1
      )
    );

    const date = Date.now();

    // const formattedDate = new Intl.DateTimeFormat('en-GB', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric'
    // }).format(date);

    // console.log({date, formattedDate});

    fetch("http://localhost:4000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, text, date_added: date, date_modified: -1 }),
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

  function updatenote(id: any, index: number) {
    const _id = id;
    const _index = index;

    return function (e: any) {
      const value = noteRefs.current[_index].value;
      const date = Date.now();

      if (value.length) {
        //patch
        fetch(`http://localhost:4000/notes/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: value,
            date_modified: date,
          }),
        }).then(() => {
          noteRefs.current[_index].value = "";
          fetchnotes();
        });

        //put
        // fetch(`http://localhost:4000/notes/${_id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     id: _id,
        //     text: value,
        //   }),
        // }).then(() => {
        //   noteRefs.current[_index].value = "";
        //   fetchnotes();
        // });
      }
    };
  }

  const handleKeyPress = function (prev: any) {
    const _prev = prev;

    // console.log({ _prev });

    return function (e: any) {
      console.log({ e });

      if (e.target.value.length > 0) {
        console.log("allow update");
      }
    };
  };

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

  function sortdown() {
    const sorted = notes
      .map((m: any) => m)
      .sort((a: any, b: any) => Number(a.text) - Number(b.text));

    setnotes(sorted);
  }

  function search() {
    const val = notetext.current.value;

    if (val.length > 0) {
      const filtered = notebkup.current.filter(({ text }: any) =>
        text.includes(val)
      );
      setnotes(filtered);
    }
  }

  return (
    <div className="App">
      <input ref={notetext} type="text" onKeyUp={debouncedkey} />
      <button onClick={handlenoteclick}>add</button>
      <button onClick={search}>search</button>
      <Button />
      <br />
      <br />
      total: {notes.length}
      <br />
      <br />
      <button
        onClick={() =>
          setnotes((prev: any) =>
            prev
              .map((m: any) => m)
              .sort((a: any, b: any) => Number(b.text) - Number(a.text))
          )
        }
      >
        sort high
      </button>
      <button onClick={sortdown}>sort low</button>
      {notes.map((m: any, i: number) => {
        return (
          <div>
            <input
              ref={(el) => (noteRefs.current[i] = el)}
              type="text"
              placeholder={m.text}
              onKeyUp={handleKeyPress(m.text)}
            />
            <button onClick={updatenote(m.id, i)}>update</button>
            <button data-id={m.id} onClick={handlenoteremove}>
              remove
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Page6;
