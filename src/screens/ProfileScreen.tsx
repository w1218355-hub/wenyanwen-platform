// ===== Profile Screen =====
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { MOCK_STATS, MOCK_REVIEW_TASKS } from '../data/mockData'

export default function ProfileScreen() {
  const navigate = useNavigate()
  const [checkInDays] = useState(() => {
    // Generate mock check-in history for last 14 days
    const days: { date: string; checked: boolean }[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      days.push({
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        checked: i > 2 || (i === 2 && Math.random() > 0.4), // last 2-3 days may be unchecked
      })
    }
    return days
  })

  const masteredCount = MOCK_STATS.mastered
  const totalWrong = MOCK_STATS.totalWrong
  const streak = MOCK_STATS.streak
  const todayDone = MOCK_REVIEW_TASKS.every(t => t.completed)

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar title="我的" showBack={false} />

      <div className="app-container mx-auto px-4 pb-24 space-y-4">
        {/* User Card */}
        <div
          className="rounded-2xl p-5 text-white"
          style={{
            background: 'linear-gradient(135deg, #1f5c42 0%, #1a6b4a 100%)',
            boxShadow: '0 4px 20px rgba(26,107,74,0.2)',
          }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)' }}
            >
              学
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold">文言学习者</p>
              <p className="text-xs opacity-60 mt-0.5">目标 DSE Level {MOCK_STATS.targetLevel}</p>
            </div>
            <button
              onClick={() => {}}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
            >
              编辑资料
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: `${streak}天`, label: '连续打卡', color: 'var(--vermillion)' },
            { value: masteredCount, label: '已掌握', color: 'var(--jade)' },
            { value: totalWrong, label: '总错题', color: 'var(--gold)' },
          ].map(item => (
            <div key={item.label} className="card-ink p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.35)' }}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Entry */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '📊', label: '学情分析', to: '/stats' },
            { icon: '📝', label: '错题本', to: '/wrongbook' },
            { icon: '👥', label: '学习小组', to: '/community' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="card-ink p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="text-xl">{item.icon}</span>
              <p className="text-xs mt-1.5" style={{ color: 'var(--ink)' }}>{item.label}</p>
            </button>
          ))}
        </div>

        {/* Check-in Calendar */}
        <div className="card-ink p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>打卡记录</p>
            <p className="text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>
              连续{streak}天
            </p>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {checkInDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all"
                  style={{
                    background: day.checked ? 'var(--jade)' : 'rgba(31,26,20,0.04)',
                    color: day.checked ? '#fff' : 'rgba(31,26,20,0.2)',
                  }}
                >
                  {day.checked ? '✓' : '·'}
                </div>
                <span className="text-[10px]" style={{ color: 'rgba(31,26,20,0.25)' }}>{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today Status */}
        <div
          className="rounded-2xl p-4"
          style={{ background: todayDone ? 'var(--jade-light)' : 'var(--gold-light)', border: todayDone ? '1px solid rgba(26,107,74,0.15)' : '1px solid rgba(200,164,92,0.2)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{todayDone ? '✅' : '⏳'}</span>
            <div>
              <p className="text-sm font-medium" style={{ color: todayDone ? 'var(--jade)' : 'var(--gold)' }}>
                {todayDone ? '今日任务已完成' : '今日任务待完成'}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(31,26,20,0.45)' }}>
                {todayDone ? '继续保持，知识在积累中' : '回到首页查看今日复习任务'}
              </p>
            </div>
          </div>
        </div>

        {/* Review Schedule */}
        <div className="card-ink p-5">
          <p className="text-xs mb-4 tracking-wider" style={{ color: 'rgba(31,26,20,0.35)', textTransform: 'uppercase' }}>
            复习进度
          </p>
          <div className="space-y-3">
            {[
              { stage: '新知识·当日', count: MOCK_REVIEW_TASKS.filter(t => t.type === 'new').length, color: 'var(--gold)', pct: 100 },
              { stage: '7天复习', count: MOCK_REVIEW_TASKS.filter(t => t.type === '7day').length, color: 'var(--jade)', pct: 60 },
              { stage: '30天复习', count: MOCK_REVIEW_TASKS.filter(t => t.type === '30day').length, color: 'var(--vermillion)', pct: 35 },
            ].map(item => (
              <div key={item.stage}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs" style={{ color: 'var(--ink)' }}>{item.stage}</span>
                  <span className="text-xs font-medium" style={{ color: item.color }}>{item.count}项</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(31,26,20,0.05)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="card-ink overflow-hidden">
          {[
            { icon: '🔔', label: '学习提醒', desc: '每日 20:00', arrow: true },
            { icon: '🔤', label: '字体大小', desc: '默认', arrow: true },
            { icon: '📖', label: '学习报告', desc: '本周学习数据摘要', arrow: true },
            { icon: 'ℹ️', label: '关于', desc: '文言文学习平台 v1.0', arrow: false },
          ].map((item, i, arr) => (
            <button
              key={item.label}
              onClick={() => {}}
              className="w-full px-5 py-3.5 flex items-center gap-3 transition-colors duration-200 hover:bg-[rgba(31,26,20,0.02)] text-left"
              style={{
                borderBottom: i < arr.length - 1 ? '1px solid rgba(31,26,20,0.04)' : 'none',
              }}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm flex-1" style={{ color: 'var(--ink)' }}>{item.label}</span>
              <span className="text-xs mr-1" style={{ color: 'rgba(31,26,20,0.3)' }}>{item.desc}</span>
              {item.arrow && <span className="text-xs" style={{ color: 'rgba(31,26,20,0.2)' }}>›</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
