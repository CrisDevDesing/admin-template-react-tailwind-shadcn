import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";

import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
