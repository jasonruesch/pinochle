import { AppRouter } from "@evolonix/react-router-next/vite-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Keep the trailing slash (the default strips it) so links home render
        as /pinochle/ — the URL GitHub Pages serves — rather than /pinochle. */}
    <AppRouter basename={import.meta.env.BASE_URL} />
  </StrictMode>,
);
