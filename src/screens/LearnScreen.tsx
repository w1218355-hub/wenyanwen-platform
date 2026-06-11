// ===== Learn Hub Screen =====
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { DSE_TEXTS, WORD_CARDS, GRAMMAR_POINTS, PAST_PAPERS, ANCIENT_CHARACTERS, ANCIENT_POSTS, PUZZLE_SENTENCES } from '../data/mockData'
import type { WordCard } from '../data/mockData'

type SubPage = 'hub' | 'classic' | 'classic-detail' | 'words' | 'words-practice' | 'grammar' | 'grammar-detail' | 'pastpaper' | 'pastpaper-quiz' | 'dialogue' | 'ancient-circle' | 'puzzle'

const MODULES = [
  { id: 'classic' as SubPage, emoji: '📜', title: '經典篇章', desc: '12篇DSE指定文言文，逐篇精讀', accent: 'var(--jade)' },
  { id: 'words' as SubPage, emoji: '🔤', title: '實詞虛詞', desc: 'DSE常考詞彙、一詞多義、語境辨義', accent: '#5b8cbf' },
  { id: 'grammar' as SubPage, emoji: '⚙️', title: '句式語法', desc: '判斷句、倒裝句、被動句系統歸納', accent: '#d4a853' },
  { id: 'pastpaper' as SubPage, emoji: '📝', title: '歷年真題', desc: '按年份、篇章篩選DSE真題', accent: '#c75b5b' },
  { id: 'dialogue' as SubPage, emoji: '🎭', title: '時空對話框', desc: '與古人對話，代入共情法理解深層情感', accent: '#b06ab3' },
  { id: 'ancient-circle' as SubPage, emoji: '🏛️', title: '古人圈', desc: '古人朋友圈，用古人的視角看世界', accent: '#8b5e3c' },
  { id: 'puzzle' as SubPage, emoji: '🧩', title: '拼句遊戲', desc: '重組文言句子，趣味記憶名句', accent: '#5cad8a' },
]

export default function LearnScreen() {
  const navigate = useNavigate()
  const [page, setPage] = useState<SubPage>('hub')
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [showWordAnswer, setShowWordAnswer] = useState(false)
  const [grammarDetailId, setGrammarDetailId] = useState<number | null>(null)
  const [pastpaperYear, setPastpaperYear] = useState<number | null>(null)
  const [dialogueChar, setDialogueChar] = useState(ANCIENT_CHARACTERS[0])
  const [dialogueMessages, setDialogueMessages] = useState<{ from: 'ai' | 'user'; text: string }[]>([])
  const [dialogueInput, setDialogueInput] = useState('')
  const [puzzleSentence, setPuzzleSentence] = useState(PUZZLE_SENTENCES[0])
  const [puzzlePieces, setPuzzlePieces] = useState<string[]>([])
  const [puzzleSolved, setPuzzleSolved] = useState(false)

  const startPuzzle = () => {
    const chars = puzzleSentence.original.split('')
    const shuffled = [...chars].sort(() => Math.random() - 0.5)
    setPuzzlePieces(shuffled)
    setPuzzleSolved(false)
  }

  const barTitle = page === 'hub' ? '学习' :
    page === 'classic' ? '經典篇章' :
    page === 'classic-detail' ? DSE_TEXTS.find(t => t.id === selectedTextId)?.title || '' :
    page === 'words' ? '實詞虛詞' :
    page === 'words-practice' ? '詞義練習' :
    page === 'grammar' ? '句式語法' :
    page === 'grammar-detail' ? GRAMMAR_POINTS.find(g => g.id === grammarDetailId)?.name || '' :
    page === 'pastpaper' ? '歷年真題' :
    page === 'pastpaper-quiz' ? `${pastpaperYear}年真題` :
    page === 'dialogue' ? '時空對話框' :
    page === 'ancient-circle' ? '古人圈' : '拼句遊戲'

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar
        title={barTitle}
        showBack={page !== 'hub'}
        rightAction={page !== 'hub' ? { label: '返回', onClick: () => { setPage('hub'); setSelectedTextId(null); setGrammarDetailId(null); setPastpaperYear(null) } } : undefined}
      />

      <div className="app-container mx-auto px-4 pb-24 space-y-4">
        {/* ===== HUB ===== */}
        {page === 'hub' && (
          <>
            <div className="card-ink p-5">
              <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>文言文學習資源</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.4)' }}>DSE中文科 · 12篇指定篇章 · 系統學習</p>
            </div>
            <div className="grid gap-3">
              {MODULES.map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    if (m.id === 'puzzle') startPuzzle()
                    setPage(m.id)
                  }}
                  className="card-ink p-4 text-left flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${m.accent}15` }}>
                    {m.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{m.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(31,26,20,0.4)' }}>{m.desc}</p>
                  </div>
                  <span style={{ color: 'rgba(31,26,20,0.2)' }}>→</span>
                </button>
              ))}
            </div>
            <button onClick={() => navigate('/wrongbook')} className="card-ink p-4 text-left flex items-center gap-4 w-full transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(139,94,60,0.1)' }}>📕</div>
              <div className="flex-1"><p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>錯題本</p><p className="text-xs mt-0.5" style={{ color: 'rgba(31,26,20,0.4)' }}>按詞義/句式分類複習錯題</p></div>
              <span style={{ color: 'rgba(31,26,20,0.2)' }}>→</span>
            </button>
          </>
        )}

        {/* ===== 經典篇章 ===== */}
        {page === 'classic' && (
          <div className="space-y-2.5">
            <p className="text-xs tracking-wider" style={{ color: 'rgba(31,26,20,0.35)', textTransform: 'uppercase' }}>
              12篇DSE指定篇章
            </p>
            {DSE_TEXTS.map((text, i) => {
              const themeColors = [
                'var(--jade)', '#5b8cbf', '#d4a853', '#c75b5b',
                '#b06ab3', '#8b5e3c', '#5cad8a', '#c8a45c',
                '#5685c9', '#b55b5b', '#6b9e7a', '#9b7ec4',
              ]
              const accent = themeColors[i % themeColors.length]
              return (
                <button
                  key={text.id}
                  onClick={() => { setSelectedTextId(text.id); setPage('classic-detail') }}
                  className="card-ink p-4 text-left w-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    {/* Number badge */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: `${accent}15`, color: accent }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{text.title}</p>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                          style={{ background: `${accent}10`, color: accent }}
                        >
                          {text.dynasty}
                        </span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.4)' }}>
                        {text.author}
                        <span className="mx-1.5" style={{ color: 'rgba(31,26,20,0.2)' }}>·</span>
                        {text.themes.slice(0, 3).join(' · ')}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
        {page === 'classic-detail' && selectedTextId && (() => { const t = DSE_TEXTS.find(x => x.id === selectedTextId)!; return (
          <div className="space-y-4">
            <div className="card-ink p-5"><p className="text-lg font-bold" style={{ color: 'var(--ink)' }}>{t.title}</p><p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.4)' }}>{t.author} · {t.dynasty}</p>
              <div className="flex gap-2 mt-3">{t.themes.map(th => (<span key={th} className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--jade-light)', color: 'var(--jade)' }}>{th}</span>))}</div>
            </div>
            <div className="card-ink p-5"><p className="text-xs font-medium mb-3" style={{ color: 'rgba(31,26,20,0.5)' }}>重點詞句</p><p className="text-sm leading-relaxed" style={{ color: 'rgba(31,26,20,0.55)' }}>此篇章相關的練習題目正在準備中。完成後你可以在這裡看到逐句解析、重點詞彙標註和練習題。</p></div>
            <button onClick={() => navigate('/variant/k1/w1')} className="w-full py-3 rounded-xl text-white text-sm transition-all" style={{ background: 'var(--jade)' }}>練習相關題目 →</button>
          </div>
        )})()}

        {/* ===== 實詞虛詞 ===== */}
        {page === 'words' && (
          <div className="space-y-2.5">
            <div className="flex gap-2 mb-2">
              {['全部', '實詞', '虛詞'].map(cat => (
                <button key={cat} className="text-xs px-3 py-1.5 rounded-full transition-all duration-200" style={{ border: '1px solid rgba(31,26,20,0.1)', color: 'rgba(31,26,20,0.5)', background: '#fff' }}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid gap-3">
              {WORD_CARDS.map((card, i) => (
                <button
                  key={card.id}
                  onClick={() => { setWordIndex(i); setShowWordAnswer(false); setPage('words-practice') }}
                  className="card-ink p-3 text-left w-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex gap-3">
                    {/* Image */}
                    <div
                      className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden"
                      style={{ background: 'var(--paper-deep)' }}
                    >
                      {card.image ? (
                        <img src={card.image} alt={card.word} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(26,107,74,0.06)' }}>
                          <span className="text-2xl font-bold font-serif" style={{ color: 'var(--jade)' }}>{card.word}</span>
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{
                            background: card.category === '實詞' ? 'rgba(200,164,92,0.15)' : 'rgba(26,107,74,0.1)',
                            color: card.category === '實詞' ? 'var(--gold)' : 'var(--jade)',
                          }}
                        >
                          {card.category}
                        </span>
                        <span className="text-[10px]" style={{ color: 'rgba(31,26,20,0.25)' }}>#{card.id}</span>
                      </div>
                      <p className="text-lg font-bold font-serif" style={{ color: 'var(--ink)' }}>{card.word}</p>
                      <p className="text-xs mt-0.5 font-serif truncate" style={{ color: 'rgba(31,26,20,0.4)' }}>{card.sentence}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {page === 'words-practice' && (() => { const card = WORD_CARDS[wordIndex]; return (
          <div className="space-y-4">
            {/* Word card with image */}
            <div className="card-ink overflow-hidden">
              {card.image && (
                <div className="w-full aspect-[16/9] relative overflow-hidden" style={{ background: 'var(--paper-deep)' }}>
                  <img src={card.image} alt={card.word} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.3), transparent 40%)' }} />
                </div>
              )}
              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: card.category === '實詞' ? 'rgba(200,164,92,0.15)' : 'rgba(26,107,74,0.1)', color: card.category === '實詞' ? 'var(--gold)' : 'var(--jade)' }}>{card.category}</span>
                  <span className="text-[10px]" style={{ color: 'rgba(31,26,20,0.25)' }}>#{card.id}</span>
                </div>
                <p className="text-4xl font-black mt-3 mb-2 tracking-wider" style={{ color: 'var(--ink)', fontFamily: '"Noto Serif SC", "STSong", "Songti SC", serif' }}>{card.word}</p>
                <p className="text-sm font-serif" style={{ color: 'rgba(31,26,20,0.5)' }}>{card.sentence}</p>
              </div>
            </div>

            <p className="text-xs text-center" style={{ color: 'rgba(31,26,20,0.4)' }}>選擇正確的釋義</p>

            <div className="grid grid-cols-2 gap-2">
              {card.options.map(opt => {
                const isCorrect = showWordAnswer && card.correctAnswer.includes(opt)
                return (
                  <button
                    key={opt}
                    onClick={() => setShowWordAnswer(true)}
                    className="p-4 rounded-xl text-center text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={isCorrect
                      ? { borderColor: 'var(--jade)', background: 'var(--jade-light)', color: 'var(--jade)', border: '2px solid var(--jade)', boxShadow: '0 4px 12px rgba(26,107,74,0.15)' }
                      : { border: '1px solid rgba(31,26,20,0.1)', background: '#fff', color: 'var(--ink)' }
                    }
                  >
                    {opt}
                    {isCorrect && <span className="ml-1">✓</span>}
                  </button>
                )
              })}
            </div>

            {showWordAnswer && (
              <div
                className="rounded-2xl p-4 space-y-2"
                style={{ background: 'var(--jade-light)', border: '1px solid rgba(26,107,74,0.15)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--jade)' }}>解析</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(31,26,20,0.55)' }}>{card.explanation}</p>
                <div className="flex items-start gap-2 rounded-xl p-3" style={{ background: 'rgba(200,164,92,0.1)' }}>
                  <span className="text-sm">💡</span>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--gold)' }}>{card.memoryTip}</p>
                </div>
                <div className="flex gap-2 pt-1">
                  {wordIndex < WORD_CARDS.length - 1 && (
                    <button
                      onClick={() => { setWordIndex(i => i + 1); setShowWordAnswer(false) }}
                      className="flex-1 py-2.5 rounded-xl text-white text-xs font-medium transition-all hover:scale-105"
                      style={{ background: 'var(--jade)' }}
                    >
                      下一詞 →
                    </button>
                  )}
                  <button
                    onClick={() => { setPage('words'); setShowWordAnswer(false) }}
                    className="py-2.5 px-4 rounded-xl text-xs transition-all"
                    style={{ border: '1px solid rgba(31,26,20,0.1)', color: 'rgba(31,26,20,0.5)' }}
                  >
                    返回列表
                  </button>
                </div>
              </div>
            )}
          </div>
        )})()}

        {/* ===== 句式語法 ===== */}
        {page === 'grammar' && (
          <div className="space-y-3">
            {GRAMMAR_POINTS.map((g, i) => {
              const colors = ['#d4a853', '#5b8cbf', '#c75b5b', '#5cad8a']
              const accent = colors[i % colors.length]
              return (
                <button
                  key={g.id}
                  onClick={() => { setGrammarDetailId(g.id); setPage('grammar-detail') }}
                  className="card-ink p-4 text-left w-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `${accent}12` }}
                    >
                      {['📐', '🔄', '📋', '↗️'][i]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>{g.category}</span>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{g.name}</p>
                      <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'rgba(31,26,20,0.4)' }}>{g.description}</p>
                    </div>
                    <span className="text-lg" style={{ color: 'rgba(31,26,20,0.15)' }}>→</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
        {page === 'grammar-detail' && grammarDetailId && (() => { const g = GRAMMAR_POINTS.find(x => x.id === grammarDetailId)!; return (
          <div className="space-y-4">
            <div className="card-ink p-5"><p className="text-base font-bold" style={{ color: 'var(--ink)' }}>{g.name}</p><p className="text-sm mt-2 leading-relaxed" style={{ color: 'rgba(31,26,20,0.55)' }}>{g.description}</p></div>
            {g.examples.map((ex, i) => (
              <div key={i} className="card-ink p-4"><p className="text-sm font-serif" style={{ color: 'var(--ink)' }}>「{ex.text}」</p><p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.35)' }}>——《{ex.source}》</p><p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(31,26,20,0.5)' }}>{ex.analysis}</p></div>
            ))}
          </div>
        )})()}

        {/* ===== 歷年真題 ===== */}
        {page === 'pastpaper' && (
          <div className="space-y-3">
            <p className="text-xs tracking-wider" style={{ color: 'rgba(31,26,20,0.35)', textTransform: 'uppercase' }}>
              DSE 歷年真題試卷
            </p>
            {PAST_PAPERS.map((pp, i) => (
              <button
                key={pp.year}
                onClick={() => { setPastpaperYear(pp.year); setPage('pastpaper-quiz') }}
                className="card-ink text-left w-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md overflow-hidden"
              >
                <div className="flex items-stretch">
                  {/* Year badge */}
                  <div
                    className="flex items-center justify-center px-5 flex-shrink-0"
                    style={{ background: i === 0 ? 'linear-gradient(180deg, var(--jade), #1f5c42)' : 'linear-gradient(180deg, #c75b5b, #a03d3d)' }}
                  >
                    <div className="text-center text-white">
                      <p className="text-2xl font-black">{pp.year}</p>
                      <p className="text-[10px] opacity-70 mt-0.5">DSE</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-4">
                    <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{pp.year}年 DSE 文言文試題</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>{pp.source}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(31,26,20,0.04)', color: 'rgba(31,26,20,0.4)' }}>
                        {pp.questions.length} 題
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
        {page === 'pastpaper-quiz' && pastpaperYear && (() => { const pp = PAST_PAPERS.find(x => x.year === pastpaperYear)!; return (
          <div className="space-y-4">
            <div className="card-ink p-4"><p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{pp.year}年 DSE 文言文試題</p><p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.4)' }}>{pp.source} · {pp.questions.length}題</p></div>
            {pp.questions.map((q, qi) => (
              <div key={qi} className="card-ink p-4"><p className="text-xs mb-2" style={{ color: 'rgba(31,26,20,0.35)' }}>第{qi + 1}題</p>
                <pre className="text-sm font-serif whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--ink)' }}>{q.question}</pre>
                <div className="mt-3 space-y-1">{q.options.map(opt => (
                  <div key={opt} className="text-xs p-2 rounded-lg" style={{ border: opt === q.correctAnswer ? '1px solid var(--jade)' : '1px solid rgba(31,26,20,0.08)', background: opt === q.correctAnswer ? 'var(--jade-light)' : '#fff', color: opt === q.correctAnswer ? 'var(--jade)' : 'rgba(31,26,20,0.5)' }}>{opt}{opt === q.correctAnswer && <span className="float-right text-xs">✓ 答案</span>}</div>
                ))}</div>
                <p className="text-xs mt-2" style={{ color: 'rgba(31,26,20,0.45)' }}>{q.explanation}</p>
              </div>
            ))}
          </div>
        )})()}

        {/* ===== 時空對話框 ===== */}
        {page === 'dialogue' && (
          <div className="space-y-4">
            {dialogueMessages.length === 0 ? (
              <>
                <div
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: 'linear-gradient(180deg, rgba(176,106,179,0.06) 0%, rgba(200,164,92,0.06) 100%)',
                    border: '1px solid rgba(176,106,179,0.12)',
                  }}
                >
                  <p className="text-4xl mb-3">⏳</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>跨越千年，與古人對話</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.4)' }}>AI將以古人的身份和語氣與你交流，代入共情法理解深層情感</p>
                </div>
                <div className="grid gap-2">
                  {ANCIENT_CHARACTERS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setDialogueChar(c); setDialogueMessages([{ from: 'ai', text: c.greeting }]) }}
                      className="rounded-2xl p-4 text-left w-full flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      style={{
                        background: 'linear-gradient(135deg, #fff 0%, rgba(200,164,92,0.04) 100%)',
                        border: '1px solid rgba(31,26,20,0.06)',
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: 'rgba(200,164,92,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                      >
                        {c.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{c.name}</p>
                        <p className="text-xs" style={{ color: 'rgba(31,26,20,0.35)' }}>
                          {c.dynasty} · {DSE_TEXTS.find(t => t.id === c.textId)?.title || '經典名篇'}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(176,106,179,0.08)', color: '#b06ab3' }}>
                        對話 →
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Chat header */}
                <div
                  className="rounded-2xl p-3 flex items-center gap-3 sticky top-0 z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(176,106,179,0.08), rgba(200,164,92,0.06))',
                    border: '1px solid rgba(176,106,179,0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(255,255,255,0.6)' }}>
                    {dialogueChar.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{dialogueChar.name}</p>
                    <p className="text-[10px]" style={{ color: 'rgba(31,26,20,0.35)' }}>{dialogueChar.dynasty} · 正在線</p>
                  </div>
                  <button
                    onClick={() => { setDialogueMessages([]); setDialogueInput('') }}
                    className="ml-auto text-xs px-3 py-1 rounded-full transition-all hover:scale-105"
                    style={{ background: 'rgba(31,26,20,0.04)', color: 'rgba(31,26,20,0.5)' }}
                  >
                    換人
                  </button>
                </div>

                {/* Messages */}
                <div className="space-y-3 min-h-[50vh]">
                  {dialogueMessages.map((m, i) => (
                    <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.from === 'ai' && (
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0" style={{ background: 'rgba(176,106,179,0.1)' }}>
                          {dialogueChar.avatar}
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          m.from === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                        }`}
                        style={m.from === 'user'
                          ? { background: 'linear-gradient(135deg, #1a6b4a, #1f5c42)', color: '#fff', boxShadow: '0 2px 8px rgba(26,107,74,0.2)' }
                          : { background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(31,26,20,0.06)', color: 'var(--ink)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }
                        }
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div
                  className="flex gap-2 p-2 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(31,26,20,0.08)', boxShadow: '0 -2px 12px rgba(0,0,0,0.02)' }}
                >
                  <input
                    value={dialogueInput}
                    onChange={e => setDialogueInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && dialogueInput.trim()) {
                        setDialogueMessages(prev => [...prev, { from: 'user', text: dialogueInput }])
                        setDialogueInput('')
                        setTimeout(() => setDialogueMessages(prev => [...prev, { from: 'ai', text: '善哉！此問甚好。' + dialogueChar.name + '撫鬚而思……（此為展示模式，API接入後將實現真實對話）' }]), 800)
                      }
                    }}
                    placeholder={`問${dialogueChar.name}一個問題...`}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-transparent"
                    style={{ outline: 'none', border: 'none' }}
                  />
                  <button
                    className="px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #b06ab3, #8b5e8c)', boxShadow: '0 2px 8px rgba(176,106,179,0.3)' }}
                    onClick={() => {
                      if (dialogueInput.trim()) {
                        setDialogueMessages(prev => [...prev, { from: 'user', text: dialogueInput }])
                        setDialogueInput('')
                        setTimeout(() => setDialogueMessages(prev => [...prev, { from: 'ai', text: '此問題頗有見地。待我細細道來……（API接入後將實現真實對話）' }]), 800)
                      }
                    }}
                  >
                    發送
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== 古人圈 ===== */}
        {page === 'ancient-circle' && (
          <div className="space-y-3">
            {ANCIENT_POSTS.map((post, i) => (
              <div
                key={post.id}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})`,
                  border: `1px solid ${post.borderColor}`,
                  transform: i % 2 === 1 ? 'translateX(4px)' : 'translateX(-2px)',
                }}
              >
                {/* Author header */}
                <div className="flex items-center gap-3 p-4 pb-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.7)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                  >
                    {post.author.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold" style={{ color: post.textColor }}>{post.author.name}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.6)', color: post.textColor, opacity: 0.7 }}>
                        {post.author.dynasty}
                      </span>
                    </div>
                    <p className="text-[10px] mt-0.5" style={{ color: post.textColor, opacity: 0.5 }}>{post.time}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-3">
                  <p
                    className="text-sm leading-relaxed tracking-wide"
                    style={{ color: post.textColor, fontFamily: '"Noto Serif SC", "STSong", "Songti SC", serif', opacity: 0.9 }}
                  >
                    {post.content}
                  </p>
                </div>

                {/* Like/Comment bar */}
                <div className="flex items-center justify-between px-4 py-2" style={{ background: 'rgba(255,255,255,0.35)' }}>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-xs transition-all hover:scale-110" style={{ color: post.textColor, opacity: 0.7 }}>
                      <span className="text-sm">❤️</span> {post.likes}
                    </button>
                    <button className="flex items-center gap-1 text-xs transition-all hover:scale-110" style={{ color: post.textColor, opacity: 0.7 }}>
                      <span className="text-sm">💬</span> {post.comments}
                    </button>
                  </div>
                  <span className="text-[10px]" style={{ color: post.textColor, opacity: 0.4 }}>文言朋友圈</span>
                </div>

                {/* Comments preview */}
                {post.commentList && post.commentList.length > 0 && (
                  <div className="px-4 py-2 space-y-1.5" style={{ background: 'rgba(255,255,255,0.5)' }}>
                    {post.commentList.map((c, ci) => (
                      <p key={ci} className="text-[11px] leading-relaxed" style={{ color: post.textColor, opacity: 0.6 }}>
                        <span className="font-medium" style={{ opacity: 0.8 }}>{c.name}</span>：{c.text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ===== 拼句遊戲 ===== */}
        {page === 'puzzle' && (
          <div className="space-y-4">
            {/* Hint card */}
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(92,173,138,0.06), rgba(200,164,92,0.06))',
                border: '1px solid rgba(92,173,138,0.12)',
              }}
            >
              <p className="text-3xl mb-2">🧩</p>
              <p className="text-xs tracking-wider uppercase" style={{ color: 'rgba(31,26,20,0.35)' }}>重組文言名句</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(200,164,92,0.1)' }}>
                <span className="text-xs" style={{ color: 'var(--gold)' }}>💡 提示</span>
                <span className="text-sm font-serif" style={{ color: 'var(--ink)' }}>{puzzleSentence.hint}</span>
              </div>
            </div>

            {/* Answer slots */}
            <div className="flex flex-wrap gap-2 justify-center">
              {puzzlePieces.map((char, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const newPieces = [...puzzlePieces]
                    newPieces.splice(i, 1)
                    newPieces.push(char)
                    setPuzzlePieces(newPieces)
                    if (newPieces.join('') === puzzleSentence.original) setPuzzleSolved(true)
                  }}
                  className="w-14 h-14 rounded-xl text-xl font-bold flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-90"
                  style={{
                    background: puzzleSolved
                      ? 'linear-gradient(135deg, #1a6b4a, #1f5c42)'
                      : 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                    border: puzzleSolved ? '2px solid var(--jade)' : '1px solid rgba(31,26,20,0.1)',
                    color: puzzleSolved ? '#fff' : 'var(--ink)',
                    fontFamily: '"Noto Serif SC", "STSong", "Songti SC", serif',
                    boxShadow: puzzleSolved
                      ? '0 4px 16px rgba(26,107,74,0.3)'
                      : '0 2px 8px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                  }}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* Solved state */}
            {puzzleSolved && (
              <div
                className="rounded-2xl p-5 text-center animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, var(--jade-light), rgba(26,107,74,0.05))',
                  border: '2px solid var(--jade)',
                }}
              >
                <p className="text-2xl mb-2">🎉</p>
                <p className="text-sm font-bold" style={{ color: 'var(--jade)' }}>拼對了！</p>
                <p
                  className="text-2xl mt-3 font-bold tracking-wider"
                  style={{ color: 'var(--ink)', fontFamily: '"Noto Serif SC", "STSong", "Songti SC", serif' }}
                >
                  {puzzleSentence.original}
                </p>
                <p className="text-xs mt-2" style={{ color: 'rgba(31,26,20,0.4)' }}>{puzzleSentence.hint}</p>
                <button
                  onClick={() => {
                    const next = PUZZLE_SENTENCES[(PUZZLE_SENTENCES.indexOf(puzzleSentence) + 1) % PUZZLE_SENTENCES.length]
                    setPuzzleSentence(next)
                    startPuzzle()
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: 'var(--jade)', boxShadow: '0 4px 14px rgba(26,107,74,0.25)' }}
                >
                  下一句 →
                </button>
              </div>
            )}

            {/* Controls */}
            {!puzzleSolved && (
              <div className="flex gap-2">
                <button
                  onClick={startPuzzle}
                  className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{ border: '1px solid rgba(31,26,20,0.1)', color: 'rgba(31,26,20,0.5)', background: '#fff' }}
                >
                  🔀 重新排列
                </button>
                <button
                  onClick={() => {
                    setPuzzlePieces(puzzleSentence.original.split(''))
                    setPuzzleSolved(true)
                  }}
                  className="py-2.5 px-4 rounded-xl text-xs transition-all duration-200"
                  style={{ border: '1px solid rgba(31,26,20,0.08)', color: 'rgba(31,26,20,0.3)', background: 'transparent' }}
                >
                  看答案
                </button>
              </div>
            )}

            {/* Instructions */}
            <p className="text-center text-[10px]" style={{ color: 'rgba(31,26,20,0.2)' }}>
              點擊字塊可移動到最後 · 直到排列出正確名句
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
