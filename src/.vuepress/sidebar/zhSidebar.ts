import { sidebar } from "vuepress-theme-hope";
import { javase } from "./javase"
import { spring } from "./spring"
import { extension } from "./extension"
import { data } from "./data"
import { front } from "./front"


export const zhSidebar = sidebar({
  "/JavaSE/": javase,
  "/Spring/": spring,
  "/Extension/": extension,
  "/Data/": data,
  "/Front/": front,
  "/": [
    "",
    {
      text: "JavaSE",
      prefix: "JavaSE/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "Spring",
      prefix: "Spring/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "拓展",
      prefix: "Extension/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "数据库",
      prefix: "Data/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "前端",
      prefix: "Front/",
      collapsible: true,
      children: "structure",
    },
  ],
});
