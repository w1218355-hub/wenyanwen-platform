// ===== Socratic Dialogue Screen =====
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { getSocraticDialogue } from '../core/socratic'
import type { SocraticStep } from '../data/mockData'

export default function SocraticScreen() {
  const navigate = useNavigate()
  const { knowledgeId, wrongId } = useParams()
  const steps = getSocraticDialogue(knowledgeId || 'k1')
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState<{ from: 'ai' | 'user'; content: string }[]>([
    { from: 'ai', content: steps[0].content }
  ])
  const [showSkip, setShowSkip] = useState(true)

  const handleChoice = (choice: string) => {
    setMessages(prev => [...prev, { from: 'user', content: choice }])

    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        const next = steps[currentStep + 1]
        const nextContent = next.content
        setCurrentStep(prev => prev + 1)
        setMessages(prev => [...prev, { from: 'ai', content: nextContent }])
      } else {
        setShowSkip(false)
        setMessages(prev => [...prev, {
          from: 'ai',
          content: '你已經理解了「賓語前置·之字標誌」的用法。接下來做幾道變式題檢驗一下吧！'
        }])
      }
    }, 600)
  }

  const isLastStep = currentStep >= steps.length - 1
  const currentStepData: SocraticStep = steps[Math.min(currentStep, steps.length - 1)]

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar
        title="蘇格拉底引導"
        rightAction={showSkip ? {
          label: '跳過',
          onClick: () => navigate(`/answer/${knowledgeId}/${wrongId}`)
        } : undefined}
      />

      <div className="app-container mx-auto px-4 pb-8">
        {/* Chat area */}
        <div className="space-y-4 mb-6 pt-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'ai' && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0"
                  style={{ background: 'var(--jade-light)', border: '1px solid rgba(26,107,74,0.1)' }}
                >
                  🧠
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'rounded-br-md'
                    : 'rounded-bl-md'
                }`}
                style={msg.from === 'user'
                  ? { background: 'linear-gradient(135deg, #1a6b4a, #1f5c42)', color: '#fff', boxShadow: '0 2px 8px rgba(26,107,74,0.2)' }
                  : { background: '#fff', border: '1px solid rgba(31,26,20,0.06)', color: 'var(--ink)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }
                }
              >
                {msg.content}
              </div>
              {msg.from === 'user' && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm ml-2 mt-1 flex-shrink-0"
                  style={{ background: 'rgba(200,164,92,0.12)', border: '1px solid rgba(200,164,92,0.15)' }}
                >
                  🧑
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Choice buttons */}
        {!isLastStep && currentStepData.type === 'choice' && currentStepData.options && (
          <div className="space-y-2">
            <p className="text-[10px] text-center mb-2" style={{ color: 'rgba(31,26,20,0.25)' }}>
              選擇你的理解
            </p>
            {currentStepData.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleChoice(opt)}
                className="w-full p-3.5 rounded-xl text-sm text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  border: '1px solid rgba(31,26,20,0.08)',
                  background: '#fff',
                  color: 'var(--ink)',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Continue button for non-choice steps */}
        {!isLastStep && currentStepData.type !== 'choice' && (
          <button
            onClick={() => handleChoice('繼續')}
            className="w-full py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: 'var(--jade)', boxShadow: '0 4px 14px rgba(26,107,74,0.2)' }}
          >
            繼續
          </button>
        )}

        {/* Action after dialogue complete */}
        {isLastStep && (
          <div className="text-center">
            <button
              onClick={() => navigate(`/variant/${knowledgeId}/${wrongId}`)}
              className="w-full py-3.5 rounded-xl text-white font-bold text-base transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'var(--vermillion)', boxShadow: '0 4px 14px rgba(187,90,90,0.3)' }}
            >
              開始變式題檢驗 →
            </button>
          </div>
        )}

        {/* Skip hint */}
        {showSkip && (
          <p className="text-center text-xs mt-4" style={{ color: 'rgba(31,26,20,0.25)' }}>
            隨時可以點右上角「跳過」直接看答案
          </p>
        )}
      </div>
    </div>
  )
}
