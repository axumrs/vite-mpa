import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { resolve } from "node:path";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rolldownOptions: {
      onwarn(warning, warn) {
        // 忽略 HTMX 或其他合规插件的 eval 警告
        if (warning.code === "EVAL") return;
        warn(warning);
      },
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about.html"),
      },
      output: {
        // 控制打包后的 JS 文件名 (保留 hash 防止缓存)
        entryFileNames: "assets/[name].[hash].js",
        // 控制代码分割 (chunk) 的文件名
        chunkFileNames: "assets/[name].[hash].js",
        // 控制静态资源 (如图片/字体) 的文件名
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  plugins: [tailwindcss(), ViteEjsPlugin({ title: "VITE MPA" })],
  server: {
    watch: {
      usePolling: true,
    },
  },
});