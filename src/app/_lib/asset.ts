// Base-aware URL for files served from public/. Vite serves the public dir at
// import.meta.env.BASE_URL ("/pinochle/" here), so a bare "/img/foo.webp" would
// 404 under the project-page subdirectory. Always build public asset URLs with
// this helper.
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, "");
}
