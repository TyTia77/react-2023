import { configureStore } from "@reduxjs/toolkit";
import monitorReducersEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import rootReducer from "./reducers";
import { RootState } from "index";

export default function configureAppStore(preloadedState?: Partial<RootState>) {
  const store: any = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(loggerMiddleware),
    enhancers: (getDefaultEnhancers): any =>
      getDefaultEnhancers().prepend(monitorReducersEnhancer),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });

  return store;
}
