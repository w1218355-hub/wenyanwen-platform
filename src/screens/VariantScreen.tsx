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
      <div className="min-h-screen bg-[#faf8f5]">
        <TopBar title="变式检验" />
        <div className="max-w-lg mx-auto p-4 text-center pt-20">
          <p className="text-lg">🎉</p>
          <p className="text-sm text-gray-500 mt-2">暂无变式题</p>
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
      // All done → mark as mastered, go to home
      navigate('/home', { state: { justCompleted: true } })
    }
  }

  const handleRetry = () => {
    setSelected(null)
    setShowResult(false)
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar title={`变式检验 ${currentQ + 1}/${variants.length}`} />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Progress */}
        <div className="flex gap-1">
          {variants.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full ${
                i < currentQ ? 'bg-green-500' : i === currentQ ? 'bg-[#e8913a]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-[#1a6b4a]/10 text-[#1a6b4a] px-2 py-0.5 rounded-full">
              变式题·同一知识点
            </span>
          </div>
          <pre className="text-sm text-[#2c2c2c] font-serif whitespace-pre-wrap leading-relaxed">
            {question.question}
          </pre>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map(opt => {
            let borderColor = 'border-gray-200'
            let bgColor = 'bg-white'
            if (showResult) {
              if (opt === question.correctAnswer) {
                borderColor = 'border-green-400'
                bgColor = 'bg-green-50'
              } else if (opt === selected && opt !== question.correctAnswer) {
                borderColor = 'border-red-300'
                bgColor = 'bg-red-50'
              }
            } else if (selected === opt) {
              borderColor = 'border-[#1a6b4a]'
              bgColor = 'bg-[#1a6b4a]/5'
            }

            return (
              <button
                key={opt}
                onClick={() => !showResult && handleSelect(opt)}
                disabled={showResult}
                className={`w-full p-3 rounded-xl border ${borderColor} ${bgColor} text-left text-sm transition-colors`}
              >
                <span className="font-medium text-gray-500 mr-2">{opt}.</span>
                <span className="text-gray-700">{opt}</span>
                {showResult && opt === question.correctAnswer && (
                  <span className="float-right text-green-600">✓</span>
                )}
                {showResult && opt === selected && opt !== question.correctAnswer && (
                  <span className="float-right text-red-500">✗</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Result */}
        {showResult && (
          <div className={`rounded-xl p-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
              {isCorrect ? '✅ 回答正确！' : '❌ 回答错误'}
            </p>
            <p className="text-xs text-gray-600 mt-1">{question.explanation}</p>
            <div className="flex gap-2 mt-3">
              {isCorrect ? (
                <button
                  onClick={handleNext}
                  className="flex-1 py-2 rounded-lg bg-[#1a6b4a] text-white text-sm"
                >
                  {currentQ < variants.length - 1 ? '下一题' : '完成 →'}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleRetry}
                    className="flex-1 py-2 rounded-lg bg-[#e8913a] text-white text-sm"
                  >
                    重试
                  </button>
                  <button
                    onClick={() => navigate(`/socratic/${knowledgeId}/${wrongId}`)}
                    className="flex-1 py-2 rounded-lg border border-[#1a6b4a] text-[#1a6b4a] text-sm"
                  >
                    返回苏格拉底引导
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Score */}
        <p className="text-center text-xs text-gray-400">
          已答对 {correctCount}/{variants.length} 题
        </p>
      </div>
    </div>
  )
}
