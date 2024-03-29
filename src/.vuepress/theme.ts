import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/zhNavbar";
import { zhSidebar } from "./sidebar/zhSidebar";

export default hopeTheme({
  hostname: "https://docs.keeend.eu.org/",
  author: {
    name: "Keen",
    url: "https://docs.keeend.eu.org/",
  },
  iconAssets: "iconfont",
  logo: "/logos.png",
  repo: "KeenBash/KeenBash.github.io",
  docsDir: "src",

  navbar: zhNavbar,
  sidebar: zhSidebar,

  pageInfo: [
    "Author",
    "Category",
    "Tag",
    "Date",
    "Word",
    "ReadingTime",
  ],

  blog: {
    intro: "https://github.com/KeenBash",
    sidebarDisplay: "mobile",
    medias: {
      Bilibili: "https://space.bilibili.com/40726406",
      Github: "https://github.com/KeenBash",
      Blog: "https://docs.keeend.eu.org/",
    },
  },

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  footer: "© 2023 云聲笔记",
  displayFooter: true,

  plugins: {
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline.keeend.eu.org",
    // },
    blog: true,
    copyright: true,
    mdEnhance: {
      katex: true,
      imgLazyload: true,
    },
  },
});
