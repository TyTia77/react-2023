import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Test } from './utils';
import { log } from 'console';

function App() {

  const prom = new Promise(function(res, rej){
    setTimeout(function(){
      res({})
    }, 5000)
  })

  let test = new Test('sup my g')
    .reverse()
    .greet()


  // own implementation of Array.bind
  function bind(this: any, ...args: any){
    let obj: Function = this
    let params = args.slice(1)

    return function(...args2: any){
      obj.apply(args[0], [...params, ...args2])
    }
  }

  console.log('tester');
  

  const closure = (a: any) => {
    let aa = a;

    return (b?: any) => {
      if (b) {
        aa = aa + b
      }

      console.log({aa})
    }
  }

  let c = closure(3);
  let a = closure(100);

  a()
  c()

  a(2)
  a(-2)
  c()


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
