import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "DSB",
  tagline: "DevSec Blueprint",
  favicon: "img/logo.svg",

  // Set the production url of your site here
  url: "https://devsecblueprint.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "The-DevSec-Blueprint", // Usually your GitHub org/user name.
  projectName: "devsecblueprint.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: '/',
          path: "docs",
          editUrl:
            "https://github.com/The-DevSec-Blueprint/devsecblueprint.github.io",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/logo.jpg",
    navbar: {
      logo: {
        className: "dsb-logo",
        alt: "DSB Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "The DevSec Blueprint",
        },
        {
          href: "https://youtube.com/@damienjburks",
          label: "YouTube",
          position: "right",
        },
        {
          href: "https://github.com/The-DevSec-Blueprint/devsecblueprint.github.io",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    announcementBar: {
      id: "wip", // Any unique ID
      content:
        "🚧 This site is a work in progress. Please check back later for updates.",
      backgroundColor: "#fafbfc", // Defaults to `#fff`
      textColor: "#091E42", // Defaults to `#000`
      isCloseable: false, // Defaults to `true`
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discordapp.com/invite/dummy",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/damienjburks",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The DevSec Blueprint - Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
