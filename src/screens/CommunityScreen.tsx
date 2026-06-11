// ===== Community / Study Groups Screen =====
import TopBar from '../components/TopBar'

const MOCK_GROUP = {
  name: '文言文冲刺小组',
  members: [
    { name: '小明', checkedIn: true, streak: 15 },
    { name: '小美', checkedIn: true, streak: 23 },
    { name: '大华', checkedIn: false, streak: 0 },
    { name: '你', checkedIn: true, streak: 12 },
  ],
  weeklyGoal: { current: 38, target: 50, label: '本周已刷38/50道题' },
}

const MOCK_FEED = [
  { name: '小明', action: '完成了今日复习', time: '2分钟前', emoji: '✅' },
  { name: '小美', action: '连续打卡23天！', time: '1小时前', emoji: '🔥' },
  { name: '你', action: '掌握了「宾语前置·之字标志」', time: '3小时前', emoji: '🧠' },
]

export default function CommunityScreen() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar title="学习小组" showBack={false} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Group card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#2c2c2c]">{MOCK_GROUP.name}</h2>
              <p className="text-xs text-gray-400">{MOCK_GROUP.members.length}人</p>
            </div>
            <span className="text-sm">📚</span>
          </div>

          {/* Weekly goal */}
          <div className="bg-[#1a6b4a]/5 rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-500 mb-2">🎯 {MOCK_GROUP.weeklyGoal.label}</p>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1a6b4a]"
                style={{ width: `${(MOCK_GROUP.weeklyGoal.current / MOCK_GROUP.weeklyGoal.target) * 100}%` }}
              />
            </div>
          </div>

          {/* Members */}
          <div className="space-y-2">
            {MOCK_GROUP.members.map(m => (
              <div key={m.name} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${m.checkedIn ? 'bg-green-400' : 'bg-gray-300'}`} />
                  <span className="text-sm text-gray-700">{m.name}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {m.checkedIn ? `🔥 ${m.streak}天` : '今日未打卡'}
                </span>
              </div>
            ))}
          </div>

          {/* Nudge button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full py-2 rounded-lg border border-[#e8913a] text-[#e8913a] text-sm">
              📢 提醒未打卡组员
            </button>
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">小组动态</h3>
          <div className="space-y-4">
            {MOCK_FEED.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg">{item.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <strong>{item.name}</strong> {item.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">🏆 本周排行榜</h3>
          <div className="space-y-3">
            {[
              { rank: '🥇', name: '小美', mastery: 23 },
              { rank: '🥈', name: '小明', mastery: 15 },
              { rank: '🥉', name: '你', mastery: 12 },
            ].map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.rank}</span>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-xs text-gray-400">掌握 {item.mastery} 个知识点</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            排名基于：掌握知识点数 × 连续打卡天数
          </p>
        </div>
      </div>
    </div>
  )
}
