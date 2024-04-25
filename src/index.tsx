import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import App from "./components/app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./components/provide-auth/ProvideAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProvideAuth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideAuth>
    </Provider>
  </React.StrictMode>
);
