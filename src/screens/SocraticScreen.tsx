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
        // Dialogue complete
        setShowSkip(false)
        setMessages(prev => [...prev, {
          from: 'ai',
          content: '你已经理解了「宾语前置·之字标志」的用法。接下来做几道变式题检验一下吧！'
        }])
      }
    }, 600)
  }

  const isLastStep = currentStep >= steps.length - 1
  const currentStepData: SocraticStep = steps[Math.min(currentStep, steps.length - 1)]

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar
        title="苏格拉底引导"
        rightAction={showSkip ? {
          label: '跳过',
          onClick: () => navigate(`/answer/${knowledgeId}/${wrongId}`)
        } : undefined}
      />

      <div className="max-w-lg mx-auto p-4">
        {/* Chat area */}
        <div className="space-y-4 mb-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#1a6b4a]/10 flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">
                  🤖
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.from === 'user'
                  ? 'bg-[#1a6b4a] text-white rounded-br-md'
                  : 'bg-white border border-gray-200 text-[#2c2c2c] rounded-bl-md'
              }`}>
                {msg.content}
              </div>
              {msg.from === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#e8913a]/20 flex items-center justify-center text-sm ml-2 mt-1 flex-shrink-0">
                  🧑
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Choice buttons */}
        {!isLastStep && currentStepData.type === 'choice' && currentStepData.options && (
          <div className="space-y-2">
            {currentStepData.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleChoice(opt)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-white text-sm text-left text-gray-700 hover:border-[#1a6b4a] hover:bg-[#1a6b4a]/5 transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Continue button for non-choice steps */}
        {!isLastStep && currentStepData.type !== 'choice' && (
          <button
            onClick={() => handleChoice('继续')}
            className="w-full p-3 rounded-xl bg-[#1a6b4a] text-white text-sm"
          >
            继续
          </button>
        )}

        {/* Action after dialogue complete */}
        {isLastStep && (
          <button
            onClick={() => navigate(`/variant/${knowledgeId}/${wrongId}`)}
            className="w-full p-3 rounded-xl bg-[#e8913a] text-white font-medium"
          >
            开始变式题检验 →
          </button>
        )}

        {/* Skip hint */}
        {showSkip && (
          <p className="text-center text-xs text-gray-400 mt-4">
            随时可以点右上角「跳过」直接看答案
          </p>
        )}
      </div>
    </div>
  )
}
