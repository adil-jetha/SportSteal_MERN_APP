// Import the necessary components and libraries
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
// Set redux-persist parameters
const persistConfig = { key: "root", storage, version: 1 };
// Use the authReducer and the redux-persist settings to create a persisted reducer.
const persistedReducer = persistReducer(persistConfig, authReducer);
// Use the middleware settings and the persisted reducer to create a Redux store.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// Make the application's root.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(// Use React StrictMode, Provider, and PersistGate components to render the application.
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);



