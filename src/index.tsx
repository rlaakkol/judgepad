import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./i18n";
import App from "./components/app";
import Scorecard from "./components/scorecard";
import ScoreDisplay from "./components/display";
import HistoryTable from "./components/historytable";
import HelpPage from "./components/helppage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

const container = document.querySelector(".main");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Scorecard />} />
              <Route path="scorecard" element={<Scorecard />} />
              <Route path="display" element={<ScoreDisplay />} />
              <Route path="history" element={<HistoryTable />} />
              <Route path="help" element={<HelpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  );
}
