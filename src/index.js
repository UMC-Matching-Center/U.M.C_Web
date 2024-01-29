import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/Font/Font.css";
import App from "./App";

import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "./modules";

const root = ReactDOM.createRoot(document.getElementById("root"));
const storage = createStore(rootReducer);
const persistor = persistStore(storage);

root.render(
  <CookiesProvider>
    <Provider store={storage}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </CookiesProvider>
);
