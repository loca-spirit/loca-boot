import { hopeTheme } from 'vuepress-theme-hope'

import { zhNavBar } from './configs/navbar/index'
import { zhSideBar } from './configs/sidebar/index'

const hostname = process.env.HOSTNAME

export default hopeTheme(
  {
    hostname,

    author: {
      name: 'shuai.meng, jiaming.wu, qinglin.wang',
    },

    iconAssets: 'fontawesome-with-brands',

    logo: 'https://vuepress.vuejs.org/images/hero.png',

    repo: 'https://github.com/loca-spirit/model-base',

    footer: 'Power by <a href="" target="_blank">「 One Power tech Team 」</a>',
    displayFooter: true,

    locales: {
      '/': {
        // Navbar
        navbar: zhNavBar,

        // Sidebar
        sidebar: zhSideBar,

        prevLink: false,
        nextLink: false,
      },
    },
    lastUpdated: true,
    contributors: true,

    plugins: {
      components: {
        components: ['Badge', 'VPCard'],
      },
      slimsearch: true,
    },
    markdown: {
      codeTabs: true,
      tabs: true,
      include: true,
      playground: {
        presets: ['ts'],
        config: {
          ts: {
            service: "https://www.typescriptlang.org/play"
          }
        }
      }
    },
  },
  { custom: true },
)
