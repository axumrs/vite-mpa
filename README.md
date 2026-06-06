# VITE 多页面应用

## `vite-plugin-ejs`

```bash
pnpm add -D vite-plugin-ejs
```

## tailwind css

```bash
pnpm add tailwindcss @tailwindcss/vite
```

修改 `src/style.css`：

```css
@import "tailwindcss";
```

## `vite.config.js`

```js
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
```

## htmx

```bash
pnpm add htmx.org
```

## `src/main.ts`

```ts
import "./style.css";
// 导入 HTMX 的 JS 逻辑
import "htmx.org";

// 如果你想在 TS 代码中获得 IDE 自动补全和类型支持
import * as htmx from "htmx.org";
// 全局禁用 eval，这可能会导致某些高级属性无法解析，但能确保安全性
// htmx.default.config.allowEval = false;

declare global {
  interface Window {
    htmx: typeof htmx;
  }
}

// 开启 HTMX 的日志（可选，调试时非常有用）
htmx.default.config.includeIndicatorStyles = false;

// 你的其他 TypeScript 业务逻辑...
console.log("HTMX 与 Vite 启动成功！");
```
