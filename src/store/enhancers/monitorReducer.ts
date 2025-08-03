import { StoreEnhancer, Action } from "@reduxjs/toolkit";
import { RootState } from "index";

const round = (number: number) => Math.round(number * 100) / 100;

const monitorReducerEnhancer =
  (createStore: Function) =>
  (reducer: Function, initialState: RootState, enhancer: StoreEnhancer) => {
    const monitoredReducer = (state: RootState, action: Action) => {
      const start = performance.now();
      const newState = reducer(state, action);
      const end = performance.now();
      const diff = round(end - start);

      console.log("reducer process time:", diff);

      return newState;
    };

    return createStore(monitoredReducer, initialState, enhancer);
  };

export default monitorReducerEnhancer;
