/**
 * 大王收藏夹 — 收录有趣的小工具/小程序/视频/音乐/图片
 *
 * 字段说明：
 *   id        唯一标识
 *   type      分类：tool | miniapp | video | music | image
 *   title     作品标题
 *   desc      简短描述
 *   url       链接【可选】
 *   icon      展示图标 (emoji)
 *   date      日期
 *   source    来源说明
 */
export const collections = []

export const categories = {
  tool: { label: '工具与自动化', icon: '🛠️', subtitle: '重剑无锋,一点就通' },
  miniapp: { label: '创意小程序', icon: '📱', subtitle: '响应迅速,创意无限' },
  video: { label: '影音信息流', icon: '🎬', subtitle: '心眼平行 01' },
  music: { label: '声音实验室', icon: '🎧', subtitle: '听了就能原地起飞' },
  image: { label: '视觉珍奇柜', icon: '🖼️', subtitle: '栩栩如生,爱不释手' },
}
