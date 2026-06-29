import { useEffect, useState } from 'react'

/**
 * 打字机效果 Hook
 * @param {string[]} words   要循环打出的词/短语列表
 * @param {object}   options 节奏控制
 * @returns {{ text: string, done: boolean }} 当前显示的文本
 *
 * 行为：逐字打出 -> 停留 -> 逐字删除 -> 切换到下一个，循环往复。
 */
export default function useTypewriter(
  words,
  { typeSpeed = 110, deleteSpeed = 55, holdTime = 1600 } = {}
) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0) // 当前词的序号
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return
    const current = words[index % words.length]

    // 已完整打出当前词 -> 停留后开始删除
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdTime)
      return () => clearTimeout(t)
    }

    // 已删完 -> 切换到下一个词，重新开始打
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    }

    // 逐字增加或删除
    const t = setTimeout(() => {
      setText((prev) =>
        deleting
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1)
      )
    }, deleting ? deleteSpeed : typeSpeed)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdTime])

  return { text, done: text === words[index % words.length] }
}
