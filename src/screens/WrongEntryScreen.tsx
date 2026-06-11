// ===== Wrong Answer Entry Screen =====
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

export default function WrongEntryScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'input' | 'ocr' | 'confirm'>('input')
  const [inputMode, setInputMode] = useState<'photo' | 'text' | null>(null)
  const [ocrText, setOcrText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [matched, setMatched] = useState(false)

  const handleFileUpload = () => {
    setStep('ocr')
    // Simulate OCR
    setTimeout(() => {
      setOcrText('下列句中「之」字用法不同於其他三項的是：\nA. 何厭之有\nB. 吾欲之南海\nC. 句讀之不知\nD. 何陋之有')
      setMatched(true)
      setStep('confirm')
    }, 2000)
  }

  const handleTextSubmit = () => {
    if (selectedText.trim()) {
      setOcrText(selectedText)
      setStep('confirm')
    }
  }

  const handleConfirm = () => {
    navigate('/analysis/w1')
  }

  if (step === 'ocr') {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <TopBar title="录入错题" />
        <div className="max-w-lg mx-auto p-4 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-16 h-16 rounded-full bg-[#1a6b4a]/10 flex items-center justify-center mb-4 animate-pulse">
            <svg className="w-8 h-8 text-[#1a6b4a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">正在 OCR 识别中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar title="录入错题" />

      {step === 'input' && (
        <div className="max-w-lg mx-auto p-4 space-y-6">
          {/* Upload area */}
          <button
            onClick={() => { setInputMode('photo'); handleFileUpload() }}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#1a6b4a] hover:bg-[#1a6b4a]/5 transition-colors group"
          >
            <div className="text-3xl mb-2">📷</div>
            <p className="text-sm text-gray-600 font-medium">拍照或上传截图</p>
            <p className="text-xs text-gray-400 mt-1">支持微信截图直接粘贴</p>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">或者</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Text input */}
          <div className="space-y-3">
            <textarea
              value={selectedText}
              onChange={e => setSelectedText(e.target.value)}
              placeholder="直接粘贴题目文字..."
              className="w-full h-32 p-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:border-[#1a6b4a] bg-white"
            />

            {/* Quick tags */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600"
              >
                <option value="">选择篇章（可选）</option>
                <option value="lunyu">論語八則</option>
                <option value="yuwo">魚我所欲也</option>
                <option value="xiaoyao">逍遙遊</option>
                <option value="quanxue">勸學</option>
                <option value="chushi">出師表</option>
                <option value="shishuo">師說</option>
                <option value="xishan">始得西山宴遊記</option>
                <option value="zuiweng">醉翁亭記</option>
                <option value="yueyang">岳陽樓記</option>
                <option value="liuguo">六國論</option>
                <option value="lianpo">廉頗藺相如列傳</option>
                <option value="shengman">聲聲慢·秋情</option>
              </select>
              <select className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600">
                <option value="">题型标签（可选）</option>
                <option>字词释义</option>
                <option>句子理解</option>
                <option>篇章分析</option>
              </select>
            </div>

            <button
              onClick={handleTextSubmit}
              disabled={!selectedText.trim()}
              className="w-full py-2.5 rounded-xl bg-[#1a6b4a] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              开始分析
            </button>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="max-w-lg mx-auto p-4 space-y-4">
          {/* OCR Result */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">OCR 识别结果</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-[#1a6b4a]"
              >
                {isEditing ? '完成编辑' : '✏️ 编辑修正'}
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={ocrText}
                onChange={e => setOcrText(e.target.value)}
                className="w-full h-32 p-3 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:border-[#1a6b4a]"
              />
            ) : (
              <pre className="text-sm text-[#2c2c2c] whitespace-pre-wrap font-serif leading-relaxed">
                {ocrText}
              </pre>
            )}
          </div>

          {/* Match result */}
          {matched && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-700">
                ✅ 已匹配题库：《師說》第3题
              </p>
            </div>
          )}

          {/* Detected knowledge */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-xs text-gray-400 mb-1">📌 检测知识点</p>
            <p className="text-sm font-medium text-[#2c2c2c]">虚词·之·宾语前置标志</p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-3 rounded-xl bg-[#1a6b4a] text-white font-medium"
          >
            确认无误，开始分析
          </button>
        </div>
      )}
    </div>
  )
}
