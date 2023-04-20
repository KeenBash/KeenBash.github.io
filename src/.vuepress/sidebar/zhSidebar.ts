import { sidebar } from "vuepress-theme-hope";
import { spring } from "./spring"

export const zhSidebar = sidebar({
  "/Spring/": spring,
  "/": [
    "",
    {
      icon: "discover",
      text: "Spring",
      prefix: "Spring/",
      collapsible: true,
      children: "structure",
    },
    {
      icon: "discover",
      text: "案例",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文档",
      icon: "note",
      prefix: "guide/",
      children: "structure",
    },
    "slides",
  ],
});
