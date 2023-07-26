import { useReducer } from 'react';
import { reducer } from './reducer';

export const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, { age: 1 });

  const increase = () => {
    dispatch({ type: 'incremented_age' });
  }

  return (
    <>
      <div>{state.age}</div>
      <button onClick={increase}>increase</button>
    </>
  )
}