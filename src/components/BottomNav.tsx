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
      <div className="app-container mx-auto flex justify-around items-center h-14 relative">
        {TABS.map((tab, i) => {
          const active = location.pathname.startsWith(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center px-1 py-1 transition-all duration-200"
              style={{ flex: 1 }}
            >
              <span
                className="text-base transition-colors duration-200"
                style={{
                  color: active ? 'var(--jade)' : 'rgba(31,26,20,0.3)',
                  fontWeight: active ? 700 : 400,
                }}
              >
                {tab.icon}
              </span>
              <span
                className="text-[10px] mt-0.5 transition-colors duration-200"
                style={{
                  color: active ? 'var(--jade)' : 'rgba(31,26,20,0.35)',
                  fontWeight: active ? 500 : 400,
                }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}

        {/* Floating + button between tab 1 and tab 2 */}
        <button
          onClick={() => navigate('/entry')}
          className="absolute flex flex-col items-center justify-center"
          style={{ left: '50%', top: '-16px', transform: 'translateX(-50%)' }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--jade)',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(26,107,74,0.35)',
            }}
          >
            ＋
          </div>
          <span className="text-[10px] mt-0.5" style={{ color: 'rgba(31,26,20,0.4)' }}>录入</span>
        </button>
      </div>
    </nav>
  )
}
