/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 赛博朋克调色板：深紫黑底 + 霓虹三色撞色
        // 改为引用 CSS 变量，支持「霓虹换肤」主题切换（透明度修饰仍可用）
        void: {
          950: 'rgb(var(--void-950) / <alpha-value>)',
          900: 'rgb(var(--void-900) / <alpha-value>)',
          800: 'rgb(var(--void-800) / <alpha-value>)',
          700: 'rgb(var(--void-700) / <alpha-value>)',
          600: 'rgb(var(--void-600) / <alpha-value>)',
        },
        neon: {
          pink: 'rgb(var(--neon-pink) / <alpha-value>)',
          cyan: 'rgb(var(--neon-cyan) / <alpha-value>)',
          yellow: 'rgb(var(--neon-yellow) / <alpha-value>)',
          purple: 'rgb(var(--neon-purple) / <alpha-value>)',
        },
      },
      fontFamily: {
        // 中文用系统字体栈显式承载（零流量，跨平台统一；Orbitron/Rajdhani 仅管拉丁）
        display: ['Orbitron', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'], // 标题/品牌：科技未来感
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'], // 代号/标签
        sans: ['Rajdhani', 'PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'], // 正文：略带棱角
      },
      boxShadow: {
        'neon-pink': '0 0 5px rgb(var(--neon-pink) / 1), 0 0 20px rgb(var(--neon-pink) / 0.53), inset 0 0 8px rgb(var(--neon-pink) / 0.27)',
        'neon-cyan': '0 0 5px rgb(var(--neon-cyan) / 1), 0 0 20px rgb(var(--neon-cyan) / 0.53), inset 0 0 8px rgb(var(--neon-cyan) / 0.27)',
        'glow-pink': '0 0 30px rgb(var(--neon-pink) / 0.4)',
        'glow-cyan': '0 0 30px rgb(var(--neon-cyan) / 0.4)',
      },
      animation: {
        'flicker': 'flicker 4s linear infinite',
        'flicker-slow': 'flicker 7s linear infinite',
        'flicker-fast': 'flicker 2.4s linear infinite',
        'scan': 'scan 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'grid-flow': 'gridFlow 1.2s linear infinite',
        'neon-breath': 'neonBreath 5s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 22%, 24%, 55%': { opacity: '0.4' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseNeon: {
          '0%, 100%': { textShadow: '0 0 4px rgb(var(--neon-pink) / 1), 0 0 12px rgb(var(--neon-pink) / 0.4)' },
          '50%': { textShadow: '0 0 6px rgb(var(--neon-pink) / 1), 0 0 24px rgb(var(--neon-pink) / 0.67)' },
        },
        gridFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 40px' },
        },
        neonBreath: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
