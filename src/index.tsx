import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
// import { createStore } from "redux";
// import rootReducer from './reducers';

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import { MenuWindow, MouseMoveProvider, Loading } from "./components";

// layout
import { MainLayout } from "./layouts/main";
import { MenuBar } from "./layouts/menuBar";

import { lazyDelay } from "utils";

// const store = createStore(rootReducer);

import configureStore from "store/configurestore";

const loadTime = 0;

const Playground = lazyDelay(import("./pages/playground/playground"), loadTime);
const Page1 = lazyDelay(import("./pages/page1/page1"), loadTime);
const Page2 = lazyDelay(import("./pages/page2/page2"), loadTime);
const Page3 = lazyDelay(import("./pages/page3/page3"), loadTime);
const Page4 = lazyDelay(import("./pages/page4/page4"), loadTime);
const Page5 = lazyDelay(import("./pages/page5/page5"), loadTime);
const Page6 = lazyDelay(import("./pages/page6/page6"), loadTime);

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
          {/* <Suspense fallback={<div>loading</div>}> */}
          <MainLayout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Playground />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} />
                <Route path="/page4" element={<Page4 />} />
                <Route path="/page5" element={<Page5 />} />
                <Route path="/page6" element={<Page6 />} />
              </Routes>
            </Suspense>
          </MainLayout>
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
