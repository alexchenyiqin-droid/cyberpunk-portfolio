/**
 * 项目数据 —— 把这里替换成你自己的真实项目即可。
 *
 * 字段说明：
 *   id        唯一标识（也用于路由 key）
 *   title     项目名称
 *   summary   一句话简介
 *   tech      技术栈标签
 *   demo      在线演示链接（留 '' 则隐藏按钮）
 *   repo      源码链接（留 '' 则隐藏按钮）
 *   accent    卡片渐变色调：'cyan' | 'violet' | 'mixed'
 */
export const projects = [
  {
    id: 'aurora-ui',
    title: 'Aurora UI 组件库',
    summary: '一套基于 React 的暗色风格 UI 组件库，内置 30+ 组件与主题定制能力。',
    tech: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
    demo: 'https://example.com',
    repo: 'https://github.com',
    accent: 'cyan',
  },
  {
    id: 'devflow',
    title: 'DevFlow 任务看板',
    summary: '面向开发者的极简 Kanban 工具，支持快捷键操作与本地数据持久化。',
    tech: ['Vue', 'Pinia', 'Vite', 'IndexedDB'],
    demo: 'https://example.com',
    repo: 'https://github.com',
    accent: 'violet',
  },
  {
    id: 'markscribe',
    title: 'MarkScribe 编辑器',
    summary: '所见即所得的 Markdown 编辑器，支持实时预览、数学公式与代码高亮。',
    tech: ['React', 'CodeMirror', 'KaTeX'],
    demo: 'https://example.com',
    repo: 'https://github.com',
    accent: 'mixed',
  },
  {
    id: 'pulse-monitor',
    title: 'Pulse 服务监控',
    summary: '轻量级的网站可用性监控服务，异常时通过邮件与 Webhook 告警。',
    tech: ['Node.js', 'PostgreSQL', 'Docker'],
    demo: '',
    repo: 'https://github.com',
    accent: 'cyan',
  },
]

export default projects
