import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Tailwind CSS plugin for Vite

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:4000", // Proxy API calls to backend server
    },
  },
});

//how to use proxy

// const res = await axios.post("/api/auth/signup", data, {
//   withCredentials: true,
// });
