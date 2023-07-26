import { useState, MouseEvent } from 'react';
import './App.css';
import { Test } from './components/test/test'
import { Display } from './components/display/display'
import { UseRef, UseContext, UseReducer } from './components/modules'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1);
  }

  const dec = (e: MouseEvent<HTMLElement>) => {
    console.error({e});
    setCount(count - 1);
  }

  return (
    <>
      {/* <Test /> */}
      <Display count={count} />
      <button onClick={increment}>add</button>
      <button onClick={dec}>sub</button>

      <UseRef />
      <UseContext />
      <UseReducer />
    </>
  );
}

export default App;
