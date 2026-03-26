import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoadingProvider } from "./context/LoadingContext";
import { BrowserRouter } from "react-router-dom";


import "./assets/index.css";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" />;
    <LoadingProvider>
      <AuthProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
);
