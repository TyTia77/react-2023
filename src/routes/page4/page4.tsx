import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "store/reducers";
import { RootState } from "index";

export function Page4() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(increment());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div>redux with redux toolkit</div>
      <div>{count}</div>
    </>
  );
}
