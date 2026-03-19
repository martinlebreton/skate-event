import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);

// Masque le splash une fois React rendu
// requestAnimationFrame garantit que le DOM est peint
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    window.hideSplash?.();
  });
});
