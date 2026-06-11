// ===== Personal Knowledge Base =====
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { KNOWLEDGE_POINTS } from '../data/mockData'
import { buildKnowledgeGraph } from '../core/knowledge'

type Pos = { x: number; y: number }

export default function KnowledgeScreen() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'card' | 'graph'>('card')
  const [searchQuery, setSearchQuery] = useState('')
  const [nodePositions, setNodePositions] = useState<Record<string, Pos>>({})
  const canvasRef = useRef<HTMLDivElement>(null)

  const filtered = KNOWLEDGE_POINTS.filter(k =>
    !searchQuery || k.name.includes(searchQuery) || k.category.includes(searchQuery)
  )
  const selected = KNOWLEDGE_POINTS.find(k => k.id === selectedId)
  const graph = buildKnowledgeGraph({ k1: 4, k4: 3, k6: 2 })

  useEffect(() => {
    if (viewMode !== 'graph' || !canvasRef.current) return
    const container = canvasRef.current
    const w = container.clientWidth || 360
    const h = 360
    const cx = w / 2
    const cy = h / 2
    const radius = Math.min(w, h) / 2 - 40
    const positions: Record<string, Pos> = {}
    graph.nodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / graph.nodes.length - Math.PI / 2
      positions[node.id] = {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      }
    })
    setNodePositions(positions)
  }, [viewMode])

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar
        title="知识库"
        showBack={false}
        rightAction={{ label: viewMode === 'card' ? '图谱' : '卡片', onClick: () => setViewMode(v => v === 'card' ? 'graph' : 'card') }}
      />
      <div className="app-container mx-auto px-4 pb-24 space-y-4">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜索知识点..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200"
            style={{ border: '1px solid rgba(31,26,20,0.1)', background: '#fff', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = 'var(--jade)'}
            onBlur={e => e.target.style.borderColor = 'rgba(31,26,20,0.1)'}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'rgba(31,26,20,0.25)' }}>◇</span>
        </div>

        {viewMode === 'card' ? (
          <>
            <div className="flex gap-2 flex-wrap">
              {['虚词用法', '特殊句式', '修辞手法'].map(cat => (
                <button
                  key={cat}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{ border: '1px solid rgba(31,26,20,0.1)', background: '#fff', color: 'rgba(31,26,20,0.5)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              {filtered.map(kp => (
                <button
                  key={kp.id}
                  onClick={() => setSelectedId(selectedId === kp.id ? null : kp.id)}
                  className="w-full text-left card-ink p-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={selectedId === kp.id ? { borderColor: 'var(--jade)', boxShadow: '0 4px 16px rgba(26,107,74,0.1)' } : {}}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>{kp.category}</span>
                    <span className="text-xs" style={{ color: 'var(--gold)' }}>
                      {'★'.repeat(kp.dseFrequency)}{'☆'.repeat(5 - kp.dseFrequency)}
                    </span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{kp.name}</p>
                  <p className="text-xs mt-1 line-clamp-2" style={{ color: 'rgba(31,26,20,0.45)' }}>{kp.definition}</p>

                  {selectedId === kp.id && (
                    <div className="mt-4 pt-4 space-y-3" style={{ borderTop: '1px solid rgba(31,26,20,0.06)' }}>
                      <div>
                        <p className="text-xs mb-2" style={{ color: 'rgba(31,26,20,0.3)' }}>关联知识点</p>
                        <div className="flex flex-wrap gap-1">
                          {kp.relatedIds.map(rid => {
                            const rel = KNOWLEDGE_POINTS.find(k => k.id === rid)
                            return rel ? (
                              <span key={rid} className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--jade-light)', color: 'var(--jade)' }}>
                                {rel.name}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs mb-2" style={{ color: 'rgba(31,26,20,0.3)' }}>关联篇章</p>
                        <div className="flex flex-wrap gap-1">
                          {kp.textIds.map(tid => (
                            <span key={tid} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(31,26,20,0.04)', color: 'rgba(31,26,20,0.5)' }}>
                              {tid}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs mb-2" style={{ color: 'rgba(31,26,20,0.3)' }}>我的笔记</p>
                        <textarea
                          placeholder="点击添加笔记..."
                          className="w-full p-3 rounded-lg text-xs resize-none transition-all duration-200"
                          style={{ border: '1px solid rgba(31,26,20,0.1)', outline: 'none' }}
                          rows={2}
                          onClick={e => e.stopPropagation()}
                          onFocus={e => e.target.style.borderColor = 'var(--jade)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(31,26,20,0.1)'}
                        />
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/variant/${kp.id}/w1`) }}
                        className="w-full py-2 rounded-lg text-white text-xs transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: 'var(--jade)' }}
                      >
                        练习变式题 →
                      </button>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="card-ink p-4">
            <div ref={canvasRef} className="relative" style={{ height: '360px' }}>
              <svg width="100%" height="360" className="absolute inset-0">
                {graph.links.map((link, i) => {
                  const s = nodePositions[link.source]
                  const t = nodePositions[link.target]
                  if (!s || !t) return null
                  return <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke="rgba(31,26,20,0.08)" strokeWidth={1} />
                })}
              </svg>
              {graph.nodes.map(node => {
                const pos = nodePositions[node.id]
                return (
                <button
                  key={node.id}
                  onClick={() => { setSelectedId(node.id); setViewMode('card') }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center group"
                  style={{ left: pos?.x || 0, top: pos?.y || 0, opacity: pos ? 1 : 0 }}
                >
                  <div
                    className="rounded-full transition-transform group-hover:scale-110"
                    style={{
                      width: Math.max(36, 28 + node.mastery / 5),
                      height: Math.max(36, 28 + node.mastery / 5),
                      backgroundColor: node.mastery >= 70 ? 'rgba(26,107,74,0.1)' : node.mastery >= 50 ? 'var(--gold-light)' : 'rgba(187,90,90,0.08)',
                      border: `2px solid ${node.mastery >= 70 ? 'var(--jade)' : node.mastery >= 50 ? 'var(--gold)' : 'var(--vermillion)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                    }}
                  >
                    <span className="text-[10px] font-medium leading-tight px-1 text-center" style={{ color: 'var(--ink)' }}>
                      {node.name.length > 6 ? node.name.slice(0, 6) + '…' : node.name}
                    </span>
                  </div>
                </button>
                )
              })}
            </div>
            <p className="text-xs text-center mt-2" style={{ color: 'rgba(31,26,20,0.25)' }}>
              节点大小 = 错题数量 · 颜色 = 掌握度 · 点击查看详情
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
