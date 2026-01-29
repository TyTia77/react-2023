import React, { useEffect } from "react";
import { increment } from "store/reducers";

export const withFacade = (WrappedComponent: any) => {
  return (props: any) => {
    const { state, dispatch } = props;
    const { counter } = state;

    const newProps = {
      test: "tester",
      count: counter.value,
    };

    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(increment());
      }, 20000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return <WrappedComponent {...newProps} />;
  };
};
