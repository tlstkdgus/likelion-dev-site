import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // BrowserRouter 사용 — 중첩 경로(/lesson/1)에서 에셋이 깨지지 않도록 절대 경로 base
  base: "/",
});
