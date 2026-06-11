// ===== Wrong Answer Entry Screen =====
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

export default function WrongEntryScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'input' | 'ocr' | 'confirm'>('input')
  const [ocrText, setOcrText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [matched, setMatched] = useState(false)

  const handleFileUpload = () => {
    setStep('ocr')
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
      <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <TopBar title="錄入錯題" />
        <div className="app-container mx-auto p-4 flex flex-col items-center justify-center" style={{ minHeight: '70vh' }}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4 animate-pulse"
            style={{ background: 'var(--jade-light)' }}
          >
            <svg className="w-10 h-10" style={{ color: 'var(--jade)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p className="text-sm" style={{ color: 'rgba(31,26,20,0.5)' }}>正在 OCR 識別中...</p>
          <div className="mt-8 flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--jade)', animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar title="錄入錯題" />

      {step === 'input' && (
        <div className="app-container mx-auto px-4 pb-8 space-y-6">
          {/* Upload area */}
          <button
            onClick={() => { handleFileUpload() }}
            className="w-full rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group"
            style={{
              border: '2px dashed rgba(26,107,74,0.2)',
              background: 'linear-gradient(180deg, rgba(26,107,74,0.02), rgba(26,107,74,0.04))',
            }}
          >
            <div className="text-4xl mb-3">📷</div>
            <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>拍照或上傳截圖</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(31,26,20,0.35)' }}>支援微信截圖直接粘貼</p>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1" style={{ height: '1px', background: 'rgba(31,26,20,0.06)' }} />
            <span className="text-xs" style={{ color: 'rgba(31,26,20,0.25)' }}>或者</span>
            <div className="flex-1" style={{ height: '1px', background: 'rgba(31,26,20,0.06)' }} />
          </div>

          {/* Text input */}
          <div className="space-y-3">
            <textarea
              value={selectedText}
              onChange={e => setSelectedText(e.target.value)}
              placeholder="直接粘貼題目文字..."
              className="w-full h-32 p-4 rounded-xl text-sm resize-none transition-all font-serif leading-relaxed"
              style={{
                border: '1px solid rgba(31,26,20,0.1)',
                background: '#fff',
                outline: 'none',
                color: 'var(--ink)',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--jade)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(31,26,20,0.1)')}
            />

            {/* Quick tags */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="text-xs px-3 py-2 rounded-full transition-all"
                style={{ border: '1px solid rgba(31,26,20,0.1)', background: '#fff', color: 'rgba(31,26,20,0.5)' }}
              >
                <option value="">選擇篇章（可選）</option>
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
              <select className="text-xs px-3 py-2 rounded-full" style={{ border: '1px solid rgba(31,26,20,0.1)', background: '#fff', color: 'rgba(31,26,20,0.5)' }}>
                <option value="">題型標籤（可選）</option>
                <option>字詞釋義</option>
                <option>句子理解</option>
                <option>篇章分析</option>
              </select>
            </div>

            <button
              onClick={handleTextSubmit}
              disabled={!selectedText.trim()}
              className="w-full py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              style={{ background: 'var(--jade)', boxShadow: '0 4px 14px rgba(26,107,74,0.2)' }}
            >
              開始分析
            </button>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="app-container mx-auto px-4 pb-8 space-y-4">
          {/* OCR Result */}
          <div className="card-ink p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>OCR 識別結果</p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs transition-colors"
                style={{ color: 'var(--jade)' }}
              >
                {isEditing ? '完成編輯' : '✏️ 編輯修正'}
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={ocrText}
                onChange={e => setOcrText(e.target.value)}
                className="w-full h-32 p-3 rounded-lg text-sm resize-none transition-all"
                style={{ border: '1px solid rgba(31,26,20,0.1)', outline: 'none' }}
                onFocus={e => (e.target.style.borderColor = 'var(--jade)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(31,26,20,0.1)')}
              />
            ) : (
              <pre className="text-sm whitespace-pre-wrap font-serif leading-relaxed" style={{ color: 'var(--ink)', fontFamily: '"Noto Serif SC", serif' }}>
                {ocrText}
              </pre>
            )}
          </div>

          {/* Match result */}
          {matched && (
            <div
              className="rounded-2xl p-4"
              style={{ background: 'var(--jade-light)', border: '1px solid rgba(26,107,74,0.15)' }}
            >
              <p className="text-sm font-medium" style={{ color: 'var(--jade)' }}>
                ✅ 已匹配題庫：《師說》第3題
              </p>
            </div>
          )}

          {/* Detected knowledge */}
          <div className="card-ink p-4">
            <p className="text-xs mb-1" style={{ color: 'rgba(31,26,20,0.3)' }}>📌 檢測知識點</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>虛詞·之·賓語前置標誌</p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-3.5 rounded-xl text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'var(--jade)', boxShadow: '0 4px 16px rgba(26,107,74,0.25)' }}
          >
            確認無誤，開始分析
          </button>
        </div>
      )}
    </div>
  )
}
