module.exports = {
  title: "RENAULT WELDING USE CASE", // Ref：https://v1.vuepress.vuejs.org/config/#title
  description:
    "Renault welding use case description", // Ref：https://v1.vuepress.vuejs.org/config/#description
  base: '/renault-welding-use-case/',

  // Extra tags to be injected to the page HTML `<head>`
  // ref：https://v1.vuepress.vuejs.org/config/#head
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["link", { rel: "icon", href: "/Logo_ConfianceAI_icon.png" }],
  ],

  // Define the locales (languages) available
  // ref: https://vuepress.github.io/guide/i18n.html
  locales: {
    "/": {
      lang: "en",
      selectText: "Languages",
    },
  },

  // Theme configuration
  // ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
  themeConfig: {
    logo: "/Logo_ConfianceAI.png",
    sidebarDepth: 2,
    displayAllHeaders: true,

    locales: {
      "/": {
        // English
        ariaLabel: "Language Menu",
        selectText: "Languages",
        label: "English",
        lastUpdated: "Last Updated",
        nav: [
          {
            text: "Newsletter",
            link: "/#nwsltr",
          },
          {
            text: "Contact",
            link: "/#contact",
          },
        ],
        sidebar: [],
      },
    },
  },

  // Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
  plugins: [
    [
      "vuepress-plugin-zooming",
      {
        selector: ":not(a) > img",
        delay: 1000,
        options: {
          bgColor: "#ffffff",
          zIndex: 10000,
        },
      },
    ],
    // ["matomo", { trackerUrl: "https://matomo.irtsysx.fr/", siteId: "16" }],
  ],
};
