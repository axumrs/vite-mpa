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
