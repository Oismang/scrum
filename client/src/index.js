import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { ConfigProvider } from 'react-avatar';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <ConfigProvider>
            <App />
          </ConfigProvider>
        </DndProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
