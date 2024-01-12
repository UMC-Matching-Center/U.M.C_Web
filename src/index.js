import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/Font/Font.css";
import App from "./App";

import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";

const root = ReactDOM.createRoot(document.getElementById("root"));
const storage = createStore(rootReducer);

root.render(
  <Provider store={storage}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
