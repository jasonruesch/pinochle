import { RouteTreeDevtools } from "@evolonix/react-router-next-devtools/vite-client";
import { Outlet, ScrollRestoration } from "react-router";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { ThemeProvider } from "./_lib/theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <a
        href="#main-content"
        className="focus:bg-brand-700 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <div className="flex min-h-full flex-col">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
      {import.meta.env.DEV && <RouteTreeDevtools />}
    </ThemeProvider>
  );
}
