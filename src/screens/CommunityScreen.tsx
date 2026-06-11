// ===== Community / Study Groups Screen =====
import TopBar from '../components/TopBar'

const MOCK_GROUP = {
  name: '文言文衝刺小組',
  members: [
    { name: '小明', checkedIn: true, streak: 15 },
    { name: '小美', checkedIn: true, streak: 23 },
    { name: '大華', checkedIn: false, streak: 0 },
    { name: '你', checkedIn: true, streak: 12 },
  ],
  weeklyGoal: { current: 38, target: 50, label: '本週已刷38/50道題' },
}

const MOCK_FEED = [
  { name: '小明', action: '完成了今日複習', time: '2分鐘前', emoji: '✅', accent: 'var(--jade)' },
  { name: '小美', action: '連續打卡23天！', time: '1小時前', emoji: '🔥', accent: 'var(--vermillion)' },
  { name: '你', action: '掌握了「賓語前置·之字標誌」', time: '3小時前', emoji: '🧠', accent: 'var(--gold)' },
]

export default function CommunityScreen() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar title="學習小組" showBack={false} />

      <div className="app-container mx-auto px-4 pb-24 space-y-4">
        {/* Group card */}
        <div
          className="rounded-2xl p-5 text-white"
          style={{
            background: 'linear-gradient(135deg, #1f5c42 0%, #1a6b4a 100%)',
            boxShadow: '0 4px 20px rgba(26,107,74,0.2)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-base font-bold">{MOCK_GROUP.name}</p>
              <p className="text-xs opacity-60 mt-0.5">{MOCK_GROUP.members.length}人</p>
            </div>
            <span className="text-2xl">📚</span>
          </div>

          {/* Weekly goal */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <p className="text-xs opacity-70 mb-2">🎯 {MOCK_GROUP.weeklyGoal.label}</p>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(MOCK_GROUP.weeklyGoal.current / MOCK_GROUP.weeklyGoal.target) * 100}%`,
                  background: 'var(--gold)',
                }}
              />
            </div>
          </div>

          {/* Members */}
          <div className="space-y-2">
            {MOCK_GROUP.members.map(m => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: m.checkedIn ? '#4ade80' : 'rgba(255,255,255,0.3)' }}
                  />
                  <span className="text-sm opacity-90">{m.name}</span>
                </div>
                <span className="text-xs opacity-60">
                  {m.checkedIn ? `🔥 ${m.streak}天` : '今日未打卡'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="card-ink p-5">
          <p className="text-xs mb-4 tracking-wider" style={{ color: 'rgba(31,26,20,0.35)', textTransform: 'uppercase' }}>
            小組動態
          </p>
          <div className="space-y-4">
            {MOCK_FEED.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-4"
                style={{ borderBottom: i < MOCK_FEED.length - 1 ? '1px solid rgba(31,26,20,0.04)' : 'none' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: `${item.accent}15` }}
                >
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: 'var(--ink)' }}>
                    <strong>{item.name}</strong> {item.action}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(31,26,20,0.3)' }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card-ink p-5">
          <p className="text-xs mb-4 tracking-wider" style={{ color: 'rgba(31,26,20,0.35)', textTransform: 'uppercase' }}>
            🏆 本週排行榜
          </p>
          <div className="space-y-3">
            {[
              { rank: '🥇', name: '小美', mastery: 23, color: 'var(--gold)' },
              { rank: '🥈', name: '小明', mastery: 15, color: '#94a3b8' },
              { rank: '🥉', name: '你', mastery: 12, color: '#d4a853' },
            ].map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: `${item.color}12`, color: item.color }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{item.name}</span>
                </div>
                <span className="text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>
                  掌握 {item.mastery} 個知識點
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-center mt-4" style={{ color: 'rgba(31,26,20,0.2)' }}>
            排名基於：掌握知識點數 × 連續打卡天數
          </p>
        </div>
      </div>
    </div>
  )
}
