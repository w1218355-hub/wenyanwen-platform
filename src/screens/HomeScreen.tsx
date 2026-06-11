// ===== Home Screen with Hero + Daily Workspace =====
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MOCK_REVIEW_TASKS } from '../data/mockData'

export default function HomeScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const justCompleted = (location.state as any)?.justCompleted
  const [tasks, setTasks] = useState(MOCK_REVIEW_TASKS)
  const [checkedIn, setCheckedIn] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const allDone = tasks.every(t => t.completed)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleToggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const handleCheckIn = () => setCheckedIn(true)

  const today = new Date()
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      {/* ===== Top Bar (transparent → solid on scroll) ===== */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250,247,242,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(31,26,20,0.06)' : '1px solid transparent',
        }}
      >
        <div className="app-container mx-auto flex items-center justify-between h-12 px-4">
          <span
            className="text-sm tracking-widest transition-colors duration-300"
            style={{ color: scrolled ? 'var(--jade)' : 'var(--jade)', fontWeight: 500 }}
          >
            文言文学习平台
          </span>
          <button
            onClick={() => navigate('/community')}
            className="text-xs px-3 py-1.5 rounded-full transition-all duration-300"
            style={{
              background: 'rgba(26,107,74,0.08)',
              color: 'var(--jade)',
            }}
          >
            学习小组
          </button>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="ink-hero" style={{ minHeight: '70vh' }}>
        {/* Background: SVG filter + ink blobs + particles (absolute, behind content) */}
        <div className="ink-hero-bg">
          <svg>
            <defs>
              <filter id="inkTurbulence" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="2" result="noise">
                  <animate attributeName="baseFrequency" values="0.012;0.015;0.011;0.014;0.012" dur="12s" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          <div className="ink-blob ink-blob-1" />
          <div className="ink-blob ink-blob-2" />
          <div className="ink-blob ink-blob-3" />
          <div className="ink-blob ink-blob-4" />

          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`gf${i}`} className="gold-particle gold-fast"
              style={{ left: `${5 + i * 12}%`, top: `${60 + Math.random() * 40}%`, animationDelay: `${i * 0.8}s` }} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`gs${i}`} className="gold-particle gold-slow"
              style={{ left: `${15 + i * 14}%`, top: `${50 + Math.random() * 45}%`, animationDelay: `${i * 1.5}s` }} />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`gfl${i}`} className="gold-particle gold-float"
              style={{ left: `${20 + i * 20}%`, top: `${30 + i * 15}%`, animationDelay: `${i * 2}s` }} />
          ))}
        </div>

        {/* Hero content — in normal flow above the background */}
        <div className="relative z-10 app-container mx-auto px-4 flex flex-col justify-center" style={{ minHeight: '70vh', paddingTop: '8vh' }}>
          {/* Subtle label */}
          <p
            className="text-xs tracking-[0.2em] mb-6 uppercase"
            style={{ color: 'var(--jade)', opacity: 0.7 }}
          >
            DSE · 文言文
          </p>

          {/* Main title */}
          <h1 className="hero-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--ink)', fontWeight: 700 }}>
            从错题开始
            <br />
            让AI引导你
            <span style={{ color: 'var(--jade)' }}>真正理解</span>
            <br />
            每一篇文言文
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(31,26,20,0.55)', maxWidth: '340px' }}>
            拍照录入错题，AI苏格拉底式追问引导，变式题检验，
            <br />
            7天·30天智能复习，构建你的个人文言知识库。
          </p>

          {/* CTA buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => navigate('/entry')}
              className="px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'var(--jade)', boxShadow: '0 4px 14px rgba(26,107,74,0.25)' }}
            >
              录入错题 →
            </button>
            <button
              onClick={() => navigate('/stats')}
              className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                border: '1px solid rgba(31,26,20,0.15)',
                color: 'var(--ink)',
              }}
            >
              查看学情
            </button>
          </div>

          {/* Social proof */}
          <p className="mt-6 text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>
            专为 DSE 中文科文言文设计 · 覆盖12篇指定篇章
          </p>
        </div>

        {/* Fade to content */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '80px', background: 'linear-gradient(to bottom, transparent, var(--paper))' }}
        />
      </section>

      {/* ===== Daily Workspace ===== */}
      <section className="app-container mx-auto px-4 pb-24 space-y-4">
        {/* Completed toast */}
        {justCompleted && (
          <div
            className="rounded-2xl p-4 text-sm animate-pulse"
            style={{ background: 'var(--jade-light)', color: 'var(--jade)', border: '1px solid rgba(26,107,74,0.2)' }}
          >
            变式题检验通过，知识已沉淀到你的知识库。
          </div>
        )}

        {/* Date & streak card */}
        <div
          className="card-ink p-5 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, #1a6b4a 0%, #1f5c42 100%)',
            color: '#fff',
          }}
        >
          <div>
            <p style={{ opacity: 0.7, fontSize: '13px' }}>
              {dateStr} 周{weekdays[today.getDay()]}
            </p>
            <p style={{ fontSize: '22px', fontWeight: 700, marginTop: '2px' }}>
              {checkedIn ? '今日已完成' : allDone ? '准备打卡' : '今日任务'}
            </p>
          </div>
          <div className="text-center">
            <span style={{ fontSize: '28px' }}>🔥</span>
            <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>连续12天</p>
          </div>
        </div>

        {/* Task list */}
        <div>
          <p className="text-xs mb-3 tracking-wider" style={{ color: 'rgba(31,26,20,0.4)', textTransform: 'uppercase' }}>
            今日任务 · {tasks.filter(t => !t.completed).length} 项
          </p>
          <div className="space-y-2.5">
            {tasks.map(task => (
              <div
                key={task.id}
                className="card-ink p-4 transition-all duration-300"
                style={task.completed ? { opacity: 0.6 } : {}}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggle(task.id)}
                    className="mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      borderColor: task.completed ? 'var(--jade)' : 'rgba(31,26,20,0.2)',
                      background: task.completed ? 'var(--jade)' : 'transparent',
                      color: '#fff',
                    }}
                  >
                    {task.completed && <span style={{ fontSize: '10px' }}>✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: task.type === '7day' ? 'rgba(26,107,74,0.1)' :
                                      task.type === '30day' ? 'rgba(187,90,90,0.08)' :
                                      'rgba(200,164,92,0.15)',
                          color: task.type === '7day' ? 'var(--jade)' :
                                 task.type === '30day' ? 'var(--vermillion)' :
                                 'var(--gold)',
                        }}
                      >
                        {task.type === '7day' ? '7天复习' : task.type === '30day' ? '30天复习' : '新知识'}
                      </span>
                      <span className="text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>
                        约{task.estimatedMinutes}分钟
                      </span>
                    </div>
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: task.completed ? 'rgba(31,26,20,0.3)' : 'var(--ink)',
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.knowledgeName}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(31,26,20,0.35)' }}>
                      {task.questionPreview}
                    </p>
                    {!task.completed && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => navigate(`/variant/${task.wrongId === 'w1' ? 'k1' : 'k1'}/${task.wrongId}`)}
                          className="text-xs px-4 py-1.5 rounded-lg text-white transition-all duration-200 hover:-translate-y-0.5"
                          style={{ background: 'var(--jade)' }}
                        >
                          开始做题
                        </button>
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                          style={{
                            border: '1px solid rgba(31,26,20,0.12)',
                            color: 'rgba(31,26,20,0.5)',
                          }}
                        >
                          打印
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Check-in */}
        {allDone && !checkedIn && (
          <button
            onClick={handleCheckIn}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-base transition-all duration-300 animate-pulse hover:shadow-lg"
            style={{ background: 'var(--vermillion)', boxShadow: '0 4px 14px rgba(187,90,90,0.3)' }}
          >
            完成打卡
          </button>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {[
            { label: '录入错题', desc: '拍照或粘贴', icon: '📷', to: '/entry' },
            { label: '学情分析', desc: '掌握度 + DSE对标', icon: '📊', to: '/stats' },
            { label: '知识库', desc: '图谱浏览 + 笔记', icon: '🗂', to: '/knowledge' },
            { label: '错题本', desc: '全部错题记录', icon: '📝', to: '/wrongbook' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="card-ink p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <p className="text-sm font-medium mt-2" style={{ color: 'var(--ink)' }}>{item.label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(31,26,20,0.35)' }}>{item.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
