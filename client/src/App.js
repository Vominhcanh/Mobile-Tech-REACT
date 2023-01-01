import React from "react";
import { Pages } from "./components/pages/Pages";
import "./style/main.scss";
import { Provider } from "react-redux";
import store from "./controller/store";
export const App = () => {
  return (
    <>
      <Provider store={store}>
        <div style={{ overflowX: "hidden" }}>
          <Pages />
        </div>
      </Provider>
    </>
  );
};
