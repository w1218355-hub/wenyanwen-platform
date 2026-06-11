// ===== Bottom Nav: 4 Tabs + Floating Entry =====
import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  { path: '/home', label: '首页', icon: '◈' },
  { path: '/learn', label: '学习', icon: '◫' },
  { path: '/knowledge', label: '知识库', icon: '◇' },
  { path: '/profile', label: '我的', icon: '◬' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  // Pages without bottom nav
  const noNavPages = ['/entry', '/analysis', '/socratic', '/answer', '/variant']
  if (noNavPages.some(p => location.pathname.startsWith(p))) return null

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(31,26,20,0.06)',
      }}
    >
      <div className="app-container mx-auto flex justify-around items-end h-16 pb-1 relative">
        {TABS.map((tab) => {
          const active = location.pathname.startsWith(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 py-1 transition-all duration-200 active:scale-90"
              style={{ flex: 1 }}
            >
              <span
                className="text-xl transition-all duration-200"
                style={{
                  color: active ? 'var(--jade)' : 'rgba(31,26,20,0.3)',
                  transform: active ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {tab.icon}
              </span>
              <span
                className="text-[11px] transition-all duration-200"
                style={{
                  color: active ? 'var(--jade)' : 'rgba(31,26,20,0.35)',
                  fontWeight: active ? 600 : 400,
                }}
              >
                {tab.label}
              </span>
              {/* Active indicator dot */}
              <div
                className="w-1 h-1 rounded-full transition-all duration-300"
                style={{
                  background: active ? 'var(--jade)' : 'transparent',
                  transform: active ? 'scale(1)' : 'scale(0)',
                  marginTop: '1px',
                }}
              />
            </button>
          )
        })}

        {/* Floating + button between tab 1 and tab 2 */}
        <button
          onClick={() => navigate('/entry')}
          className="absolute flex flex-col items-center justify-center active:scale-90 transition-transform duration-200"
          style={{ left: '50%', top: '-14px', transform: 'translateX(-50%)' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'var(--jade)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(26,107,74,0.4)',
            }}
          >
            ＋
          </div>
          <span className="text-[11px] mt-0.5" style={{ color: 'rgba(31,26,20,0.4)' }}>录入</span>
        </button>
      </div>
    </nav>
  )
}
