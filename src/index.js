import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/Font/Font.css";
import App from "./App";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./modules";

const root = ReactDOM.createRoot(document.getElementById("root"));
export let persistor = persistStore(store);

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </CookiesProvider>
);
