import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import NewApp from "./components/app/NewApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRoute> */}
      {/* <App /> */}
      <NewApp />
      {/* </BrowserRoute> */}
    </Provider>
  </React.StrictMode>
);
