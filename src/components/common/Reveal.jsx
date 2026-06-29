import { motion } from 'framer-motion'

/**
 * 滚动渐入容器 —— 子元素进入视口时淡入上移。
 * @param {ReactNode} children
 * @param {number} delay  动画延迟（秒），用于错峰出现
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
