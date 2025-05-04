import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
