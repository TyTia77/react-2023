import React from "react";
import { reducer } from "./reducer";

function Page3(props: { params1?: number }) {
  const { params1 } = props;

  const initialState = { age: 0 };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const increase = () => dispatch({ type: "incremented_age" });
  const decrease = () => dispatch({ type: "decrement_age" });

  return (
    <div>
      <div>react reducer example</div>
      <div>{state.age}</div>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
    </div>
  );
}

export default Page3;
