// ===== Top Bar (consistent ink-elegant style) =====
import { useNavigate } from 'react-router-dom'

interface TopBarProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  rightAction?: { label: string; onClick: () => void }
}

export default function TopBar({ title, showBack = true, onBack, rightAction }: TopBarProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: 'rgba(250,247,242,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(31,26,20,0.06)',
      }}
    >
      <div className="app-container mx-auto flex items-center justify-between h-12 px-4">
        <div style={{ width: '64px' }}>
          {showBack && (
            <button
              onClick={handleBack}
              className="text-sm transition-colors duration-200"
              style={{ color: 'rgba(31,26,20,0.5)' }}
            >
              ← 返回
            </button>
          )}
        </div>
        <h1
          className="text-[15px] font-medium tracking-wider"
          style={{ color: 'var(--ink)' }}
        >
          {title}
        </h1>
        <div style={{ width: '64px', textAlign: 'right' }}>
          {rightAction && (
            <button
              onClick={rightAction.onClick}
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--jade)' }}
            >
              {rightAction.label}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
