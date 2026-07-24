import reactRouterNext from "@evolonix/react-router-next/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // Served from the /pinochle project-page subdirectory on GitHub Pages. Vite
  // rewrites asset URLs to this base, and @evolonix/react-router-next's
  // <AppRouter /> reads import.meta.env.BASE_URL for its router basename.
  base: "/pinochle/",
  plugins: [reactRouterNext(), react(), tailwindcss()],
});
