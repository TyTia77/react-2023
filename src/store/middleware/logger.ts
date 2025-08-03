import { Action } from "@reduxjs/toolkit";
import { RootState } from "index";

const logger = (store: RootState) => (next: Function) => (action: any) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
