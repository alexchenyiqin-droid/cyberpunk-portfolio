/**
 * 博客文章数据 —— 把这里替换成你自己的真实文章即可。
 *
 * 字段说明：
 *   slug      URL 路径标识，如 /blog/react-performance（需唯一）
 *   title     文章标题
 *   excerpt   列表页显示的摘要
 *   date      发布日期（字符串）
 *   tags      标签数组
 *   content   正文，使用 Markdown 语法编写
 */
export const posts = [
  {
    slug: 'welcome-to-my-blog',
    title: '欢迎来到我的博客',
    excerpt: '这是我的第一篇文章。我想聊聊为什么开始写作，以及你以后会在这里读到什么。',
    date: '2026-06-15',
    tags: ['随笔', '开始'],
    content: `## 你好，世界

这是我的个人博客的第一篇文章。

我会在这里分享：

- **技术笔记**：学习过程中的踩坑与总结
- **项目复盘**：把做过的东西拆解给你看
- **一些思考**：关于开发、工具与效率

## 为什么写博客

写作是整理思路最好的方式。把一个概念讲清楚，往往比学会它更难——而正是这个过程，让理解变得真正深刻。

> 教是最好的学。

后续文章会陆续更新，感谢你的阅读。`,
  },
  {
    slug: 'react-performance-tips',
    title: 'React 性能优化的 5 个实用技巧',
    excerpt: '从渲染优化到打包体积，总结日常项目中真正用得上的 React 性能优化方法。',
    date: '2026-06-08',
    tags: ['React', '性能优化', '前端'],
    content: `## 写在前面

性能优化不是玄学，而是「测量 → 定位 → 优化」的循环。

## 1. 用 React.memo 避免无意义的重渲染

当父组件更新时，所有子组件默认都会重新渲染。如果子组件的 props 没有变化，用 \`React.memo\` 包裹可以跳过这一步。

\`\`\`jsx
const Item = React.memo(function Item({ value }) {
  return <li>{value}</li>
})
\`\`\`

## 2. 合理使用 useMemo 与 useCallback

它们本身也有开销，不要无脑全包。只有当计算成本明显高于记忆成本时才值得用。

## 3. 列表渲染务必给稳定的 key

\`key\` 不是给开发者看的，是给 React 用来定位节点的。用稳定的 id，不要用数组索引。

## 4. 代码分割（Code Splitting）

用 \`React.lazy\` + \`Suspense\` 按路由拆包，首屏能瘦下来不少。

## 5. 善用浏览器开发者工具

React DevTools 的 Profiler 是你最好的朋友——先测量，再优化。

## 总结

性能问题的 80% 来自过度渲染和不必要的打包体积。抓住这两点，大部分场景就够了。`,
  },
  {
    slug: 'docker-getting-started',
    title: 'Docker 入门：从零理解容器化',
    excerpt: '用最直白的方式讲清楚 Docker 是什么、为什么要用，以及如何上手第一个容器。',
    date: '2026-05-28',
    tags: ['Docker', 'DevOps', '后端'],
    content: `## 容器解决了什么问题

「在我的电脑上明明能跑啊！」——这句话大概每个开发者都说过。

容器把**应用和它依赖的环境**打包在一起，保证在任何机器上行为一致。

## 三个核心概念

- **镜像（Image）**：只读的模板，相当于「安装盘」
- **容器（Container）**：镜像运行起来的实例，相当于「运行中的程序」
- **仓库（Registry）**：存放镜像的地方，比如 Docker Hub

## 第一个 Dockerfile

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
\`\`\`

构建并运行：

\`\`\`bash
docker build -t my-app .
docker run -p 3000:3000 my-app
\`\`\`

## 下一步

学会写 Dockerfile 之后，可以继续了解 docker-compose，用它管理多个相互配合的容器。`,
  },
]

export default posts
