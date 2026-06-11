// ===== Variant Question Quiz Screen =====
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { MOCK_VARIANTS } from '../data/mockData'

export default function VariantScreen() {
  const navigate = useNavigate()
  const { knowledgeId, wrongId } = useParams()
  const variants = MOCK_VARIANTS[knowledgeId || 'k1'] || []
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const question = variants[currentQ]
  if (!question) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <TopBar title="變式檢驗" />
        <div className="app-container mx-auto px-4 text-center pt-20">
          <p className="text-4xl mb-4">🎉</p>
          <p className="text-sm" style={{ color: 'rgba(31,26,20,0.4)' }}>暫無變式題</p>
        </div>
      </div>
    )
  }

  const isCorrect = selected === question.correctAnswer

  const handleSelect = (opt: string) => {
    setSelected(opt)
    setShowResult(true)
    if (opt === question.correctAnswer) {
      setCorrectCount(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQ < variants.length - 1) {
      setCurrentQ(prev => prev + 1)
      setSelected(null)
      setShowResult(false)
    } else {
      navigate('/home', { state: { justCompleted: true } })
    }
  }

  const handleRetry = () => {
    setSelected(null)
    setShowResult(false)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar title={`變式檢驗 ${currentQ + 1}/${variants.length}`} />

      <div className="app-container mx-auto px-4 pb-8 space-y-4">
        {/* Progress */}
        <div className="flex gap-1">
          {variants.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full transition-colors duration-300"
              style={{
                background: i < currentQ
                  ? 'var(--jade)'
                  : i === currentQ
                    ? 'var(--gold)'
                    : 'rgba(31,26,20,0.08)',
              }}
            />
          ))}
        </div>

        {/* Question */}
        <div className="card-ink p-5">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: 'var(--jade-light)', color: 'var(--jade)' }}
            >
              變式題 · 同一知識點
            </span>
          </div>
          <pre
            className="text-sm whitespace-pre-wrap font-serif leading-relaxed"
            style={{ color: 'var(--ink)', fontFamily: '"Noto Serif SC", serif' }}
          >
            {question.question}
          </pre>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map(opt => {
            let optStyle: React.CSSProperties = {
              border: '1px solid rgba(31,26,20,0.08)',
              background: '#fff',
            }
            let indicator = null

            if (showResult) {
              if (opt === question.correctAnswer) {
                optStyle = {
                  border: '1.5px solid var(--jade)',
                  background: 'var(--jade-light)',
                  color: 'var(--jade)',
                  boxShadow: '0 4px 12px rgba(26,107,74,0.15)',
                }
                indicator = <span style={{ color: 'var(--jade)' }}>✓</span>
              } else if (opt === selected && opt !== question.correctAnswer) {
                optStyle = {
                  border: '1.5px solid var(--vermillion)',
                  background: 'rgba(187,90,90,0.06)',
                  color: 'var(--vermillion)',
                }
                indicator = <span style={{ color: 'var(--vermillion)' }}>✗</span>
              }
            } else if (selected === opt) {
              optStyle = {
                border: '2px solid var(--jade)',
                background: 'var(--jade-light)',
                color: 'var(--jade)',
                boxShadow: '0 4px 12px rgba(26,107,74,0.15)',
              }
            }

            return (
              <button
                key={opt}
                onClick={() => !showResult && handleSelect(opt)}
                disabled={showResult}
                className="w-full p-3.5 rounded-xl text-left text-sm transition-all duration-200 flex items-center justify-between"
                style={optStyle}
              >
                <span>
                  <span className="font-medium mr-2" style={{ opacity: 0.5 }}>{opt}.</span>
                  <span>{opt}</span>
                </span>
                {indicator}
              </button>
            )
          })}
        </div>

        {/* Result */}
        {showResult && (
          <div
            className="rounded-2xl p-4"
            style={isCorrect
              ? { background: 'var(--jade-light)', border: '1px solid rgba(26,107,74,0.15)' }
              : { background: 'rgba(187,90,90,0.06)', border: '1px solid rgba(187,90,90,0.15)' }
            }
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: isCorrect ? 'var(--jade)' : 'var(--vermillion)' }}
            >
              {isCorrect ? '✅ 回答正確！' : '❌ 回答錯誤'}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(31,26,20,0.5)' }}>
              {question.explanation}
            </p>
            <div className="flex gap-2 mt-3">
              {isCorrect ? (
                <button
                  onClick={handleNext}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'var(--jade)', boxShadow: '0 4px 14px rgba(26,107,74,0.2)' }}
                >
                  {currentQ < variants.length - 1 ? '下一題' : '完成 →'}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleRetry}
                    className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: 'var(--gold)', boxShadow: '0 4px 14px rgba(200,164,92,0.3)' }}
                  >
                    重試
                  </button>
                  <button
                    onClick={() => navigate(`/socratic/${knowledgeId}/${wrongId}`)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ border: '1px solid var(--jade)', color: 'var(--jade)' }}
                  >
                    返回蘇格拉底引導
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Score */}
        <p className="text-center text-xs" style={{ color: 'rgba(31,26,20,0.25)' }}>
          已答對 {correctCount}/{variants.length} 題
        </p>
      </div>
    </div>
  )
}
