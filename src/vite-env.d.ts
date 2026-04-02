/// <reference types="vite/client" />

// 声明飞书插件的全局变量，让TypeScript不再报错
interface Window {
  lark: any;
  dashboard: any;
  BitableApp: any;
}
