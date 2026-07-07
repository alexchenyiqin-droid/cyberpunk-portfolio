/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 赛博朋克调色板：深紫黑底 + 霓虹三色撞色
        void: {
          950: '#050008', // 最深背景：近黑紫
          900: '#0a0118', // 主背景
          800: '#120625', // 卡片背景
          700: '#1c0a35', // 悬停/边框
          600: '#2a1052', // 强边框
        },
        neon: {
          pink: '#ff2e88', // 霓虹粉/品红（主强调）
          cyan: '#00fff5', // 电光青（次强调）
          yellow: '#f9f871', // 霓虹黄（点缀）
          purple: '#b537f2', // 霓虹紫
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'], // 标题/品牌：科技未来感
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'], // 代号/标签
        sans: ['Rajdhani', 'system-ui', 'sans-serif'], // 正文：略带棱角
      },
      boxShadow: {
        'neon-pink': '0 0 5px #ff2e88, 0 0 20px #ff2e8888, inset 0 0 8px #ff2e8844',
        'neon-cyan': '0 0 5px #00fff5, 0 0 20px #00fff588, inset 0 0 8px #00fff544',
        'glow-pink': '0 0 30px #ff2e8866',
        'glow-cyan': '0 0 30px #00fff566',
      },
      animation: {
        'flicker': 'flicker 4s linear infinite',
        'flicker-slow': 'flicker 7s linear infinite',
        'flicker-fast': 'flicker 2.4s linear infinite',
        'scan': 'scan 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'grid-flow': 'gridFlow 3s linear infinite',
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
          '0%, 100%': { textShadow: '0 0 4px #ff2e88, 0 0 12px #ff2e8866' },
          '50%': { textShadow: '0 0 6px #ff2e88, 0 0 24px #ff2e88aa' },
        },
        gridFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 40px' },
        },
        neonBreath: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
      },
    },
  },
  plugins: [],
}
