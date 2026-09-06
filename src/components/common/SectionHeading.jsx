import { motion } from 'framer-motion'

/**
 * 区块标题：左侧装饰编号 + 标题 + 副标题
 * @param {string} label   装饰编号（如 "01"）
 * @param {string} title   主标题
 * @param {string} subtitle 副标题/描述（可选）
 */
export default function SectionHeading({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="section-label flex items-center gap-3">
        <span>{label}</span>
        <span className="h-px w-10 bg-neon-cyan/40" />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-slate-400">{subtitle}</p>
      )}
    </motion.div>
  )
}
