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
  logo: "/logo.svg",
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

  footer: "默认页脚",
  displayFooter: true,

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },
  

  plugins: {
    // comment: {
    //   // @ts-expect-error: You should generate and use your own comment service
    //   provider: "Waline",
    // },
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
