/**
 * 个人信息 —— 把这里的内容替换成你自己的真实信息即可
 * 所有页面都从此文件读取数据，无需改动组件代码。
 */
export const profile = {
  // 你的名字（显示在首屏和导航栏）
  name: 'Alex Chen',

  // 英文/代号，显示在首屏打字机动画下方
  alias: 'Alex',

  // 首屏副标题：会以打字机效果逐字打出这几句，循环切换
  roles: ['全栈开发者', '开源爱好者', '技术写作者', '终身学习者'],

  // 一句话简介（首屏 + 关于区块）
  tagline: '欢迎来到夜之城',

  // 关于区块的完整自我介绍（支持多段）
  about: [
    '你好，我是 Alex Chen，一名对赛博朋克充满热情的全栈开发者。',
    '平时喜欢探索各种新技术，把脑洞变成现实。',
    '欢迎通过邮箱和我交流。',
  ],

  // 当前状态（显示在关于区块的小标签）
  status: '正在寻找新的机会',

  // 技能：按分类组织
  skills: [
    {
      category: '前端',
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue'],
    },
    {
      category: '后端',
      items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL'],
    },
    {
      category: '工具与运维',
      items: ['Git', 'Docker', 'Linux', 'Vite', 'CI/CD'],
    },
  ],

  // 联系方式（只保留 Email）
  socials: [
    { name: 'Email', label: 'alex.chenyiqin@gmail.com', href: 'mailto:alex.chenyiqin@gmail.com', icon: 'mail' },
  ],
}

export default profile
