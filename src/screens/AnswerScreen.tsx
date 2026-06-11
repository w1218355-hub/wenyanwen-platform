// ===== Direct Answer Screen =====
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { MOCK_WRONG_ANSWERS } from '../data/mockData'
import { getKnowledgeName, getKnowledgeDefinition } from '../core/socratic'

export default function AnswerScreen() {
  const navigate = useNavigate()
  const { knowledgeId, wrongId } = useParams()
  const wrong = MOCK_WRONG_ANSWERS.find(w => w.id === wrongId) || MOCK_WRONG_ANSWERS[0]

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar title="题目解析" />

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Correct answer */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✅</span>
            <h2 className="text-base font-medium text-[#2c2c2c]">正确答案：<span className="text-[#1a6b4a] font-bold">{wrong.correctAnswer}</span></h2>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex-1 bg-red-50 rounded-lg p-3 text-center">
              <p className="text-xs text-red-500 mb-1">你的答案</p>
              <p className="font-bold text-red-600">{wrong.studentAnswer}</p>
            </div>
            <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xs text-green-500 mb-1">正确答案</p>
              <p className="font-bold text-green-600">{wrong.correctAnswer}</p>
            </div>
          </div>
        </div>

        {/* Scoring points (DSE style) */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-3">📝 DSE 得分点</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex-shrink-0">1分</span>
              <p className="text-sm text-gray-700">指出「之」为宾语前置标志（非结构助词）</p>
            </div>
            <div className="flex gap-3">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex-shrink-0">1分</span>
              <p className="text-sm text-gray-700">翻译「何厭之有」=「有什么满足的呢」</p>
            </div>
            <div className="flex gap-3">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex-shrink-0">1分</span>
              <p className="text-sm text-gray-700">与「何……之有」固定句式关联（满分答案）</p>
            </div>
          </div>
        </div>

        {/* Detailed explanation */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-3">📖 详细解析</h3>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p><strong>「之」在文言文中的常见用法有三种：</strong></p>
            <p>1. <strong>代词</strong>（他/她/它）：如「学而时习之」——「之」代指学过的知识。</p>
            <p>2. <strong>结构助词</strong>（的）：如「蚓无爪牙之利」——「之」连接定语与中心语。</p>
            <p>3. <strong>宾语前置标志</strong>（无实义）：如「何厭之有」——「之」标志宾语「何厭」被提前到动词「有」之前。还原语序为「有何厭」。</p>
            <div className="bg-[#faf8f5] rounded-lg p-3 mt-3">
              <p className="text-xs text-gray-500 mb-1">🔑 记忆口诀</p>
              <p className="text-sm text-[#5c3d2e] font-serif">何……之有 = 有何……<br/>「之」不译，只管把后边的动词和前边的宾语对调。</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">B选项「吾欲之南海」中「之」是<strong>动词</strong>（去、往），与其他三项的「之」（宾语前置标志）完全不同。</p>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigate(`/socratic/${knowledgeId}/${wrongId}`)}
            className="w-full p-3 rounded-xl border border-[#1a6b4a] text-[#1a6b4a] text-sm"
          >
            🧠 我也想试试苏格拉底引导
          </button>
          <button
            onClick={() => navigate(`/variant/${knowledgeId}/${wrongId}`)}
            className="w-full p-3 rounded-xl bg-[#e8913a] text-white font-medium"
          >
            生成同类变式题检验 →
          </button>
        </div>
      </div>
    </div>
  )
}
