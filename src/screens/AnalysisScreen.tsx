// ===== Analysis Result Screen =====
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { MOCK_WRONG_ANSWERS, KNOWLEDGE_POINTS } from '../data/mockData'

export default function AnalysisScreen() {
  const navigate = useNavigate()
  const { wrongId } = useParams()
  const wrong = MOCK_WRONG_ANSWERS.find(w => w.id === wrongId) || MOCK_WRONG_ANSWERS[0]
  const knowledge = KNOWLEDGE_POINTS.find(k => k.id === wrong.knowledgeId)

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar title="AI 分析" />
      <div className="app-container mx-auto px-4 pb-8 space-y-4">
        {/* Knowledge point */}
        <div className="card-ink p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✦</span>
            <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>这道题考察的是</p>
          </div>
          <div className="rounded-xl p-4 mb-3" style={{ background: 'var(--jade-light)' }}>
            <p className="text-lg font-bold" style={{ color: 'var(--jade)' }}>{knowledge?.name}</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.4)' }}>{knowledge?.category}</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(31,26,20,0.55)' }}>
            {knowledge?.definition}
          </p>
        </div>

        {/* Answer context */}
        <div className="card-ink p-5">
          <p className="text-xs mb-3" style={{ color: 'rgba(31,26,20,0.4)' }}>你的答题情况</p>
          <div className="rounded-xl p-4 font-serif text-sm leading-relaxed whitespace-pre-wrap" style={{ background: 'var(--paper-deep)', color: 'var(--ink)' }}>
            {wrong.question}
          </div>
          <div className="flex gap-4 mt-3 text-sm">
            <div className="flex-1 rounded-lg p-3 text-center" style={{ background: 'rgba(187,90,90,0.06)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--vermillion)' }}>你的答案</p>
              <p className="font-bold" style={{ color: 'var(--vermillion)' }}>{wrong.studentAnswer}</p>
            </div>
            <div className="flex-1 rounded-lg p-3 text-center" style={{ background: 'rgba(26,107,74,0.06)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--jade)' }}>正确答案</p>
              <p className="font-bold" style={{ color: 'var(--jade)' }}>{wrong.correctAnswer}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs mb-2" style={{ color: 'rgba(31,26,20,0.3)' }}>你可能错在：</p>
            {['把「之」当成了结构助词「的」', '没有识别出「何……之有」的宾语前置结构', '对选项B「吾欲之南海」中「之」的动词用法不熟悉'].map(r => (
              <p key={r} className="text-xs leading-relaxed" style={{ color: 'rgba(31,26,20,0.5)' }}>· {r}</p>
            ))}
          </div>
        </div>

        {/* Path choice */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/socratic/${wrong.knowledgeId}/${wrong.id}`)}
            className="w-full p-4 rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
            style={{ border: '2px solid var(--jade)', background: '#fff' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧠</span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: 'var(--jade)' }}>苏格拉底引导</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(31,26,20,0.4)' }}>不直接给答案，AI带你一步步思考</p>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--jade)' }}>→</span>
            </div>
          </button>

          <button
            onClick={() => navigate(`/answer/${wrong.knowledgeId}/${wrong.id}`)}
            className="w-full p-4 rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ border: '1px solid rgba(31,26,20,0.1)', background: '#fff' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>直接看答案</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(31,26,20,0.35)' }}>正确答案 + 得分点 + 详细解析</p>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'rgba(31,26,20,0.3)' }}>→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
