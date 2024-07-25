import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig(() => {
  const targetApi = process.env.VITE_APP_URL;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: targetApi,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          // SSL 인증서 검증 무시
          secure: false,
          // WebSocket 프로토콜 사용
          ws: true,
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              console.log("Proxying request:", req.url, "to:", proxyReq.path);
            });
          },
        },
      },
    },
  };
});
