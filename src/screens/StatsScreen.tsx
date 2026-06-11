// ===== Learning Analytics Dashboard =====
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { MOCK_STATS } from '../data/mockData'

export default function StatsScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar title="学情分析" showBack={false} />
      <div className="app-container mx-auto px-4 pb-24 space-y-4">
        {/* DSE Level */}
        <div
          className="rounded-2xl p-5 text-white"
          style={{
            background: 'linear-gradient(135deg, #1a6b4a 0%, #1f5c42 100%)',
            boxShadow: '0 4px 20px rgba(26,107,74,0.2)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">DSE 文言文</p>
              <p className="text-xs opacity-50 mt-1">目标：Level {MOCK_STATS.targetLevel}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{MOCK_STATS.currentLevel}</p>
              <p className="text-xs opacity-70">当前预估</p>
            </div>
          </div>
          <div className="mt-4 rounded-full h-1.5" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: '68%', background: 'var(--gold)' }} />
          </div>
          <p className="text-xs opacity-50 mt-2">差距：虚词辨析、修辞手法</p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: MOCK_STATS.totalWrong, l: '总错题' },
            { n: MOCK_STATS.mastered, l: '已掌握' },
            { n: `${MOCK_STATS.streak}天`, l: '连续打卡' },
          ].map(it => (
            <div key={it.l} className="card-ink p-3 text-center">
              <p className="text-xl font-bold" style={{ color: 'var(--ink)' }}>{it.n}</p>
              <p className="text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>{it.l}</p>
            </div>
          ))}
        </div>

        {/* Knowledge mastery */}
        <div className="card-ink p-5">
          <p className="text-xs mb-4 tracking-wider" style={{ color: 'rgba(31,26,20,0.4)' }}>知识点掌握度</p>
          <div className="space-y-4">
            {MOCK_STATS.knowledgeMastery.map(k => (
              <div key={k.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm" style={{ color: 'var(--ink)' }}>{k.name}</span>
                  <span className="text-xs font-medium" style={{ color: k.mastery >= 70 ? 'var(--jade)' : k.mastery >= 50 ? 'var(--gold)' : 'var(--vermillion)' }}>
                    {k.mastery}%{k.mastery < 50 ? ' !' : k.mastery < 70 ? ' ·' : ''}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(31,26,20,0.06)' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${k.mastery}%`, background: k.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly trend */}
        <div className="card-ink p-5">
          <p className="text-xs mb-4 tracking-wider" style={{ color: 'rgba(31,26,20,0.4)' }}>近7天正确率</p>
          <div className="flex items-end justify-between gap-1" style={{ height: '100px' }}>
            {MOCK_STATS.weeklyProgress.map(d => {
              const rate = Math.round((d.correct / d.total) * 100)
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px]" style={{ color: 'rgba(31,26,20,0.4)' }}>{rate}%</span>
                  <div className="w-full rounded-t-sm" style={{ height: `${rate}%`, background: 'rgba(26,107,74,0.15)' }}>
                    <div className="w-full h-full rounded-t-sm" style={{ background: 'var(--jade)', opacity: 0.7 }} />
                  </div>
                  <span className="text-[10px]" style={{ color: 'rgba(31,26,20,0.25)' }}>{d.day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI suggestion */}
        <div className="rounded-2xl p-5" style={{ background: 'var(--gold-light)', border: '1px solid rgba(200,164,92,0.2)' }}>
          <div className="flex items-start gap-3">
            <span className="text-lg">✦</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--gold)' }}>AI 学习建议</p>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(31,26,20,0.55)' }}>
                本周建议重点攻克<strong>修辞手法</strong>（当前掌握度41%）。已为你生成针对性练习计划。
              </p>
              <button
                onClick={() => navigate('/variant/k1/w1')}
                className="mt-3 text-xs px-4 py-1.5 rounded-lg text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'var(--gold)', boxShadow: '0 2px 8px rgba(200,164,92,0.3)' }}
              >
                开始针对性练习 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
