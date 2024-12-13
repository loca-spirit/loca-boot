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
          text: '为什么选择它',
          link: '/guide/why/',
        },
        {
          text: '常见问题',
          link: '/guide/faq/',
        },
        {
          text: '更新日志',
          link: '/guide/changelog/',
        },
      ],
    },
    {
      text: '文档',
      link: '/init/',
      children: [
        {
          text: '初始化',
          link: '/init/',
        },
        {
          text: '分组',
          link: '/group/',
        },
      ],
    },
    {
      text: 'Column 配置',
      link: '/column/',
      children: [
        {
          text: 'aliasName 别名',
          link: '/column/aliasName/',
        },
        {
          text: 'autowired 默认初始化',
          link: '/column/autowired/',
        },
        {
          text: 'default 默认值',
          link: '/column/default/',
        },
        {
          text: 'foreign 外键',
          link: '/column/foreign/',
        },
        {
          text: 'formatter 格式化',
          link: '/column/formatter/',
        },
        {
          text: 'group 分组',
          link: '/column/group/',
        },
        {
          text: 'model 模型',
          link: '/column/model/',
        },
        {
          text: 'name 名字',
          link: '/column/name/',
        },
        {
          text: 'primary 主键',
          link: '/column/primary/',
        },
        {
          text: 'trim 去空格',
          link: '/column/trim/',
        },
        {
          text: 'type 类型',
          link: '/column/type/',
        },
        {
          text: 'unformatter 反格式化',
          link: '/column/unformatter/',
        },
        {
          text: 'default 默认值',
          link: '/column/default/',
        },
      ],
    },
    {
      text: 'Method 方法',
      link: '/method/',
      children: [
        {
          text: 'callMethod 调用方法',
          link: '/method/callMethod/',
        },
        {
          text: 'extend 覆盖数据',
          link: '/method/extend/',
        },
        {
          text: 'getChangedData 获取变化的普通对象数据',
          link: '/method/getChangedData/',
        },
        {
          text: 'getChangedDataDescriptor 获取变化的普通对象数据描述',
          link: '/method/getChangedDataDescriptor/',
        },
        {
          text: 'getCleanSerializableObject 获取非空的普通对象数据',
          link: '/method/getCleanSerializableObject/',
        },
        {
          text: 'getCleanSerializableString 获取非空的普通对象数据字符串',
          link: '/method/getCleanSerializableString/',
        },
        {
          text: 'getColumnData 获取字段元数据',
          link: '/method/getColumnData/',
        },
        {
          text: 'getSerializableData 获取普通对象数据',
          link: '/method/getSerializableData/',
        },
        {
          text: 'getSerializableString 获取普通对象数据',
          link: '/method/getSerializableString/',
        },
        {
          text: 'isChanged 模型是否变化',
          link: '/method/isChanged/',
        },
        {
          text: 'isContainsModel 是否包含其他模型',
          link: '/method/isContainsModel/',
        },
        {
          text: 'isModelEqual 是否和其他模型等效',
          link: '/method/isModelEqual/',
        },
        {
          text: 'revertChangedData 还原变化的数据',
          link: '/method/revertChangedData/',
        },
        {
          text: 'saveChangedData 保存变化的数据',
          link: '/method/saveChangedData/',
        },
        {
          text: 'setColumnData 设置字段元数据',
          link: '/method/setColumnData/',
        },
        {
          text: 'setDataByOriginal 设置模型数据',
          link: '/method/setDataByOriginal/',
        },
        {
          text: 'update 更新数据',
          link: '/method/update/',
        },
      ],
    },
    {
      text: '高级',
      link: '/gaoji/',
      children: [
        {
          text: '动态模型',
          link: '/dy/',
        },
        {
          text: '获取变化的数据',
          link: '/group1/',
        },
      ],
    },
    {
      text: '场景',
      link: '/changjing/',
      children: [
        {
          text: '增量提交',
          link: '/add/',
        },
        {
          text: '全量提交',
          link: '/full/',
        },
        {
          text: '是否更新成功',
          link: '/updatesuccess/',
        },
      ],
    },
  ],
}
