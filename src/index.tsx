import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import { Provider } from "react-redux";
// import { createStore } from "redux";
// import rootReducer from './reducers';

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
// import {  Page2, Page3, Page4, Page5 } from "./routes";
import { MenuWindow, MouseMoveProvider } from "./components";


import MenuBar from './routes/menu/menubar'

// const store = createStore(rootReducer);

import configureStore from "store/configurestore";

const App = lazy(() => import('./App'))
// const Page1 = lazy(async () => ({ default: (await import("./routes")).Page1 }));
// const Page2 = lazy(async () => ({ default: (await import("./routes")).Page2 }));
// const Page3 = lazy(async () => ({ default: (await import("./routes")).Page3 }));
// const Page4 = lazy(async () => ({ default: (await import("./routes")).Page4 }));
// const Page5 = lazy(async () => ({ default: (await import("./routes")).Page5 }));

const Page1 = lazy(() => import('./routes/page1/page1'));
const Page2 = lazy(() => import('./routes/page2/page2'));
const Page3 = lazy(() => import('./routes/page3/page3'));
const Page4 = lazy(() => import('./routes/page4/page4'));
const Page5 = lazy(() => import('./routes/page5/page5'));

const store = configureStore();

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MouseMoveProvider>
          <MenuBar />
          {/* <MenuWindow> */}
            <Suspense fallback={<div>loading</div>}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} />
                <Route path="/page4" element={<Page4 />} />
                <Route path="/page5" element={<Page5 />} />
              </Routes>
            </Suspense>
          {/* </MenuWindow> */}
        </MouseMoveProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
