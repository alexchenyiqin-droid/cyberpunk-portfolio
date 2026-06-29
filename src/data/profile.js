/**
 * 个人信息 —— 把这里的内容替换成你自己的真实信息即可
 * 所有页面都从此文件读取数据，无需改动组件代码。
 */
export const profile = {
  // 你的名字（显示在首屏和导航栏）
  name: '你的名字',

  // 英文/代号，显示在首屏打字机动画下方
  alias: 'Alex',

  // 首屏副标题：会以打字机效果逐字打出这几句，循环切换
  roles: ['全栈开发者', '开源爱好者', '技术写作者', '终身学习者'],

  // 一句话简介（首屏 + 关于区块）
  tagline: '用代码构建产品，用文字分享思考。',

  // 关于区块的完整自我介绍（支持多段）
  about: [
    '你好，我是你的名字，一名专注于 Web 开发的全栈工程师。',
    '我喜欢探索新技术，把抽象的想法变成可用的产品。工作之余，我会在博客上记录技术笔记与项目心得，也会参与开源社区贡献。',
    '如果你对我的项目或文章感兴趣，或者想要交流合作，欢迎通过下方的联系方式找到我。',
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

  // 联系方式与社交链接（留空字符串则不显示对应图标）
  socials: [
    { name: 'Email', label: 'your@email.com', href: 'mailto:your@email.com', icon: 'mail' },
    { name: 'GitHub', label: 'github.com/yourname', href: 'https://github.com', icon: 'github' },
    { name: 'Twitter', label: '@yourname', href: 'https://twitter.com', icon: 'twitter' },
  ],
}

export default profile
