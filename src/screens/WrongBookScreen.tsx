// ===== Wrong Answer Book Screen =====
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { MOCK_WRONG_ANSWERS } from '../data/mockData'
import type { WrongAnswer } from '../data/mockData'

export default function WrongBookScreen() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | 'new' | 'analyzed' | 'mastered'>('all')
  const [wrongs] = useState<WrongAnswer[]>(MOCK_WRONG_ANSWERS)
  const filtered = filter === 'all' ? wrongs : wrongs.filter(w => w.status === filter)

  const st = (s: string) => {
    switch (s) {
      case 'new': return { t: '待分析', bg: 'rgba(200,164,92,0.12)', c: 'var(--gold)' }
      case 'analyzed': return { t: '已分析', bg: 'rgba(26,107,74,0.08)', c: 'var(--jade)' }
      case 'learning': return { t: '学习中', bg: 'rgba(26,107,74,0.12)', c: 'var(--jade)' }
      case 'mastered': return { t: '已掌握', bg: 'rgba(26,107,74,0.06)', c: 'var(--jade)' }
      default: return { t: s, bg: 'rgba(31,26,20,0.04)', c: 'rgba(31,26,20,0.5)' }
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar title="错题本" showBack={false} />
      <div className="app-container mx-auto px-4 pb-24 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: wrongs.length, l: '总错题', c: 'var(--ink)' },
            { n: wrongs.filter(w => w.status !== 'mastered').length, l: '待掌握', c: 'var(--vermillion)' },
            { n: wrongs.filter(w => w.status === 'mastered').length, l: '已掌握', c: 'var(--jade)' },
          ].map(it => (
            <div key={it.l} className="card-ink p-3 text-center">
              <p className="text-xl font-bold" style={{ color: it.c }}>{it.n}</p>
              <p className="text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>{it.l}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {(['all', 'new', 'analyzed', 'mastered'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: filter === f ? 'var(--jade)' : '#fff',
                color: filter === f ? '#fff' : 'rgba(31,26,20,0.5)',
                border: filter === f ? '1px solid var(--jade)' : '1px solid rgba(31,26,20,0.1)',
              }}
            >
              {f === 'all' ? '全部' : f === 'new' ? '待分析' : f === 'analyzed' ? '学习中' : '已掌握'}
            </button>
          ))}
        </div>

        <div className="space-y-2.5">
          {filtered.map(w => {
            const s = st(w.status)
            return (
              <button
                key={w.id}
                onClick={() => navigate(`/analysis/${w.id}`)}
                className="w-full card-ink p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.c }}>{s.t}</span>
                  <span className="text-xs" style={{ color: 'rgba(31,26,20,0.3)' }}>{w.createdAt}</span>
                </div>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--ink)', fontFamily: 'serif' }}>{w.question}</p>
                <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>
                  <span>你的：<span style={{ color: 'var(--vermillion)' }}>{w.studentAnswer}</span></span>
                  <span>正确：<span style={{ color: 'var(--jade)' }}>{w.correctAnswer}</span></span>
                </div>
                {w.nextReview && (
                  <p className="text-xs mt-2" style={{ color: 'rgba(31,26,20,0.25)' }}>
                    下次复习：{w.nextReview} · 已复习{w.reviewCount}次
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
