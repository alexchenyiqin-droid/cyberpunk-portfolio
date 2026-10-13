import { motion } from 'framer-motion'

/**
 * 区块标题：左侧是喷漆大字（英文），右侧是白底编号牌 + 中文名 + 一行小字。
 * @param {string} label    编号（如 "01"），显示在白色编号牌上
 * @param {string} title    中文标题
 * @param {string} en       喷漆大字（英文）；缺省时直接用 title
 * @param {string} meta     右下角小字（可选）
 * @param {string} subtitle 副标题/描述（可选）
 */
export default function SectionHeading({ label, title, en, meta, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        {/* 英文大字只是装饰，读屏读中文标题 */}
        <h2 className="giant section-en" aria-label={en ? title : undefined}>
          <span aria-hidden={en ? 'true' : undefined}>{en || title}</span>
        </h2>
        <div className="flex flex-col items-end gap-2">
          <span className="inline-flex items-center gap-3.5">
            <span className="plate">{label}</span>
            {en && <span className="section-zh">{title}</span>}
          </span>
          {meta && <span className="section-meta">{meta}</span>}
        </div>
      </div>
      {subtitle && <p className="mt-4 max-w-2xl text-silver">{subtitle}</p>}
    </motion.div>
  )
}
