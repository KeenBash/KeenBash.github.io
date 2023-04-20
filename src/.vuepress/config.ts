import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Jave Notebook",
      description: "Jave Notebook 我的java学习笔记",
    },
  },

  theme,
});
