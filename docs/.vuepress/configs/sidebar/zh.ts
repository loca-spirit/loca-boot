import type { SidebarOptions } from 'vuepress-theme-hope'

export const zhSideBar: SidebarOptions = {
  '/': [
    {
      text: '开发指南',
      link: '/guide/start/',
      children: [
        {
          text: '快速上手',
          link: '/guide/start/',
        },
        {
          text: '国际化',
          link: '/guide/i18n/',
        },
        {
          text: '项目结构',
          link: '/guide/structure/',
        },
        {
          text: '常见问题',
          link: '/guide/faq/',
        },
        {
          text: '更新日志',
          link: '/guide/changelog/',
        }
      ],
    },
  ],
}
