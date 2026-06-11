// ===== Mock Data for Classical Chinese Learning Platform =====

export interface KnowledgePoint {
  id: string
  name: string
  category: string
  definition: string
  dseFrequency: number // 1-5 stars
  relatedIds: string[]
  textIds: string[]
}

export interface WrongAnswer {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  studentAnswer: string
  source: string // photo/text/manual
  imageUrl?: string
  knowledgeId: string
  textId: string
  createdAt: string
  status: 'new' | 'analyzed' | 'learning' | 'mastered'
  nextReview: string | null
  reviewCount: number
}

export interface VariantQuestion {
  id: string
  sourceWrongId: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface ReviewTask {
  id: string
  wrongId: string
  knowledgeName: string
  questionPreview: string
  type: '7day' | '30day' | 'new'
  variantCount: number
  estimatedMinutes: number
  completed: boolean
}

export interface SocraticStep {
  id: string
  type: 'question' | 'choice' | 'hint' | 'praise' | 'conclusion'
  content: string
  options?: string[]
  nextTriggers?: Record<string, string> // answer -> next step id
}

export const KNOWLEDGE_POINTS: KnowledgePoint[] = [
  {
    id: 'k1',
    name: '宾语前置·之字标志',
    category: '虚词用法',
    definition: '"之"作为宾语前置的标志词，将宾语提到动词之前。常见句式：何……之有。',
    dseFrequency: 5,
    relatedIds: ['k2', 'k7', 'k8'],
    textIds: ['lunyu', 'shishuo'],
  },
  {
    id: 'k2',
    name: '虚词·之·代词用法',
    category: '虚词用法',
    definition: '"之"作代词，可代人、代事、代物。作宾语时相当于"他/她/它"。',
    dseFrequency: 5,
    relatedIds: ['k1', 'k3'],
    textIds: ['lunyu', 'quanxue', 'shishuo'],
  },
  {
    id: 'k3',
    name: '虚词·之·助词用法',
    category: '虚词用法',
    definition: '"之"作结构助词，相当于"的"，用于定语和中心语之间。',
    dseFrequency: 5,
    relatedIds: ['k1', 'k2'],
    textIds: ['lunyu', 'quanxue', 'yueyang'],
  },
  {
    id: 'k4',
    name: '被动句·见字式',
    category: '特殊句式',
    definition: '"见+动词"表被动，相当于"被……"。如"见笑于大方之家"。',
    dseFrequency: 4,
    relatedIds: ['k5', 'k7'],
    textIds: ['xiaoyao', 'lianpo'],
  },
  {
    id: 'k5',
    name: '被动句·为字式',
    category: '特殊句式',
    definition: '"为……所……"表被动。如"为天下笑者"。',
    dseFrequency: 4,
    relatedIds: ['k4', 'k7'],
    textIds: ['liuguo', 'lianpo'],
  },
  {
    id: 'k6',
    name: '互文修辞',
    category: '修辞手法',
    definition: '上下文各举一语，其义互相具备。如"不以物喜，不以己悲"。',
    dseFrequency: 3,
    relatedIds: ['k10'],
    textIds: ['yueyang'],
  },
  {
    id: 'k7',
    name: '倒装句·总论',
    category: '特殊句式',
    definition: '文言文中语序与现代汉语不同的句子，包括宾语前置、状语后置、定语后置等。',
    dseFrequency: 5,
    relatedIds: ['k1', 'k4', 'k8', 'k9'],
    textIds: ['lunyu', 'shishuo', 'xiaoyao'],
  },
  {
    id: 'k8',
    name: '疑问代词宾语前置',
    category: '特殊句式',
    definition: '疑问句中疑问代词作宾语时，宾语提到动词前。如"吾谁欺？"',
    dseFrequency: 3,
    relatedIds: ['k1', 'k7'],
    textIds: ['lunyu'],
  },
  {
    id: 'k9',
    name: '定语后置·者字结构',
    category: '特殊句式',
    definition: '"中心词+定语+者"结构，定语放在中心词之后。如"马之千里者"。',
    dseFrequency: 3,
    relatedIds: ['k3', 'k7'],
    textIds: ['quanxue'],
  },
  {
    id: 'k10',
    name: '对偶修辞',
    category: '修辞手法',
    definition: '用字数相等、结构相同的一对语句表达相关或相对的意思。',
    dseFrequency: 3,
    relatedIds: ['k6'],
    textIds: ['yueyang', 'zuiweng'],
  },
]

export const MOCK_WRONG_ANSWERS: WrongAnswer[] = [
  {
    id: 'w1',
    question: '下列句中"之"字用法不同於其他三項的是：\nA. 何厭之有\nB. 吾欲之南海\nC. 句讀之不知\nD. 何陋之有',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'B',
    studentAnswer: 'C',
    source: 'photo',
    imageUrl: '',
    knowledgeId: 'k1',
    textId: 'shishuo',
    createdAt: '2026-06-03',
    status: 'analyzed',
    nextReview: '2026-06-10',
    reviewCount: 0,
  },
  {
    id: 'w2',
    question: '"見笑於大方之家"中"見"的用法是：\nA. 看見\nB. 被\nC. 出現\nD. 見解',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'B',
    studentAnswer: 'A',
    source: 'text',
    knowledgeId: 'k4',
    textId: 'xiaoyao',
    createdAt: '2026-06-05',
    status: 'new',
    nextReview: null,
    reviewCount: 0,
  },
  {
    id: 'w3',
    question: '下列"之"字屬於賓語前置標誌的是：\nA. 蚓無爪牙之利\nB. 馬之千里者\nC. 句讀之不知\nD. 吾嘗終日而思矣，不如須臾之所學也',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'C',
    studentAnswer: 'A',
    source: 'manual',
    knowledgeId: 'k1',
    textId: 'shishuo',
    createdAt: '2026-06-08',
    status: 'learning',
    nextReview: '2026-06-15',
    reviewCount: 0,
  },
]

export const MOCK_VARIANTS: Record<string, VariantQuestion[]> = {
  'k1': [
    {
      id: 'v1a',
      sourceWrongId: 'w1',
      question: '下列哪句的"之"用法與"何厭之有"相同？\nA. 吾欲之南海\nB. 馬之千里者\nC. 句讀之不知\nD. 蚓無爪牙之利',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'C',
      explanation: '"句讀之不知"與"何厭之有"同屬賓語前置標誌用法，"之"將賓語提前。',
    },
    {
      id: 'v1b',
      sourceWrongId: 'w1',
      question: '"何陋之有"的正確語序是：\nA. 何有陋之\nB. 有何陋\nC. 有之何陋\nD. 陋之何有',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'B',
      explanation: '"何陋之有"即"有何陋"，"之"是賓語前置標誌，翻譯時去掉。',
    },
  ],
  'k4': [
    {
      id: 'v2a',
      sourceWrongId: 'w2',
      question: '"信而見疑，忠而被謗"中"見"的意思是：\nA. 看見\nB. 被\nC. 拜見\nD. 見解',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'B',
      explanation: '"見"在此表被動，與"被"字對舉，意思相同。',
    },
  ],
}

export const SOCRATIC_DIALOGUE_MOCK: Record<string, SocraticStep[]> = {
  'k1': [
    { id: 's1', type: 'choice', content: '這道題你做錯了。你覺得自己錯在哪裡？', options: ['A. 沒讀懂「之」的意思', 'B. 分不清四個選項的句式', 'C. 粗心看錯了', 'D. 完全不理解這題在考什麼'] },
    { id: 's2a', type: 'question', content: '你先不看選項——「之」在文言文中有幾種常見用法，你能說出來嗎？' },
    { id: 's2b', type: 'question', content: '好，那我們先看題目。你能把每個選項的「之」是什麼用法說出來嗎？試試看。' },
    { id: 's2c', type: 'hint', content: '沒關係，我們慢慢來。先看最簡單的——「吾欲之南海」的「之」是「去、往」的意思，這是「之」作動詞用。這個你應該知道。' },
    { id: 's2d', type: 'question', content: '沒關係。你學過「何陋之有」這句話嗎？它和題目裡的「何厭之有」結構一樣。你覺得它們有什麼共同點？' },
    { id: 's3', type: 'hint', content: '提示一下：「何厭之有」如果按現代漢語的語序來排，應該是「有何厭」。你發現什麼了嗎？' },
    { id: 's4', type: 'question', content: '對！那現在你再看C選項「句讀之不知」——它的「之」是不是也在幫賓語提前？和B選項「吾欲之南海」的「之」一樣嗎？' },
    { id: 's5', type: 'praise', content: '完全正確！「句讀之不知」的「之」是賓語前置標誌，而「吾欲之南海」的「之」是動詞「去」。所以你之前選C是錯的，正確答案是B。現在明白了嗎？' },
    { id: 's6', type: 'conclusion', content: '總結一下：「之」作賓語前置標誌時，它本身沒有實際意思，只是告訴你語序被顛倒了。記住一個口訣：何……之有 = 有何……。下次遇到類似的結構，先試著把語序調回來。' },
  ],
  'k4': [
    { id: 's1', type: 'choice', content: '你選了A「看見」。我們來看看——如果把「看見」放進去：「被看見笑於大方之家」，這說得通嗎？', options: ['好像不太通……', '我覺得可以啊', '不太確定'] },
    { id: 's2', type: 'hint', content: '文言文裡「見」除了「看見」，還有一個很重要的用法：放在動詞前面，表示「被……」。比如「見笑」就是「被取笑」。' },
    { id: 's3', type: 'question', content: '那你現在覺得「見笑於大方之家」是什麼意思？' },
    { id: 's4', type: 'praise', content: '對了！就是「被大方之家取笑」。所以正確答案是B「被」。記住這個規則：動詞前的「見」如果不是「看見」的意思，很可能就是被動用法。' },
  ],
}

export const MOCK_REVIEW_TASKS: ReviewTask[] = [
  {
    id: 'r1',
    wrongId: 'w1',
    knowledgeName: '宾语前置·之字标志',
    questionPreview: '"何厭之有"中"之"的用法……',
    type: '7day',
    variantCount: 2,
    estimatedMinutes: 3,
    completed: false,
  },
  {
    id: 'r2',
    wrongId: 'w3',
    knowledgeName: '宾语前置·之字标志',
    questionPreview: '下列"之"字屬於賓語前置標誌……',
    type: 'new',
    variantCount: 1,
    estimatedMinutes: 2,
    completed: false,
  },
]

export const MOCK_STATS = {
  totalWrong: 47,
  mastered: 28,
  streak: 12,
  currentLevel: 'Level 4',
  targetLevel: 'Level 5*',
  knowledgeMastery: [
    { name: '实词释义', mastery: 85, color: '#2d8a56' },
    { name: '虚词用法', mastery: 62, color: '#e8913a' },
    { name: '句式判断', mastery: 73, color: '#2d8a56' },
    { name: '修辞手法', mastery: 41, color: '#c75b5b' },
    { name: '篇章理解', mastery: 78, color: '#2d8a56' },
  ],
  weeklyProgress: [
    { day: '6/5', correct: 8, total: 12 },
    { day: '6/6', correct: 10, total: 14 },
    { day: '6/7', correct: 7, total: 10 },
    { day: '6/8', correct: 12, total: 15 },
    { day: '6/9', correct: 9, total: 11 },
    { day: '6/10', correct: 13, total: 16 },
    { day: '6/11', correct: 11, total: 13 },
  ],
}

// ===== Legacy Data (from original app) =====

export interface TextInfo {
  id: string
  title: string
  author: string
  dynasty: string
  themes: string[]
}

export const DSE_TEXTS: TextInfo[] = [
  { id: 'lunyu', title: '論語八則', author: '孔子', dynasty: '先秦·春秋', themes: ['修身', '為學', '處世'] },
  { id: 'yuwo', title: '魚我所欲也', author: '孟子', dynasty: '先秦·戰國', themes: ['義利之辨', '捨生取義'] },
  { id: 'xiaoyao', title: '逍遙遊', author: '莊子', dynasty: '先秦·戰國', themes: ['逍遙', '無待', '大用'] },
  { id: 'quanxue', title: '勸學', author: '荀子', dynasty: '先秦·戰國', themes: ['為學', '積累', '青出於藍'] },
  { id: 'chushi', title: '出師表', author: '諸葛亮', dynasty: '三國·蜀漢', themes: ['忠誠', '託孤', '北伐'] },
  { id: 'shishuo', title: '師說', author: '韓愈', dynasty: '唐朝', themes: ['從師', '傳道', '解惑'] },
  { id: 'xishan', title: '始得西山宴遊記', author: '柳宗元', dynasty: '唐朝', themes: ['山水', '貶謫', '寄情'] },
  { id: 'zuiweng', title: '醉翁亭記', author: '歐陽修', dynasty: '北宋', themes: ['山水', '飲酒', '與民同樂'] },
  { id: 'yueyang', title: '岳陽樓記', author: '范仲淹', dynasty: '北宋', themes: ['憂樂', '天下', '抱負'] },
  { id: 'liuguo', title: '六國論', author: '蘇洵', dynasty: '北宋', themes: ['史論', '賂秦', '存亡'] },
  { id: 'lianpo', title: '廉頗藺相如列傳', author: '司馬遷', dynasty: '西漢', themes: ['將相', '負荊', '愛國'] },
  { id: 'shengman', title: '聲聲慢·秋情', author: '李清照', dynasty: '南宋', themes: ['愁思', '孤寂', '詞'] },
]

export interface WordCard {
  id: number
  category: string
  word: string
  sentence: string
  image: string
  options: string[]
  correctAnswer: string[]
  explanation: string
  memoryTip: string
}

export const WORD_CARDS: WordCard[] = [
  { id: 1, category: '實詞', word: '厭', sentence: '何厭之有', image: 'words/goude.png', options: ['滿足', '討厭', '厭倦', '嫌棄'], correctAnswer: ['滿足'], explanation: '"厭"在文言中常解作「滿足」，而非現代漢語的「討厭」。"何厭之有"意為「有什麼滿足的呢」，即「貪得無厭」。', memoryTip: '記住：古人說「厭」= 我們說「夠」。何厭之有 = 有什麼夠的呢？' },
  { id: 2, category: '實詞', word: '師', sentence: '師者，所以傳道受業解惑也', image: 'words/shi.png', options: ['老師', '軍隊', '學習', '效法'], correctAnswer: ['老師'], explanation: '"師"在《師說》中指名詞「老師」。注意與動詞用法「吾師道也」（我學習道理）區分。', memoryTip: '名詞→老師，動詞→學習。看前面有沒有主語來判斷。' },
  { id: 3, category: '虛詞', word: '之', sentence: '句讀之不知', image: 'words/zhi.png', options: ['賓語前置標誌', '的', '代詞', '去、往'], correctAnswer: ['賓語前置標誌'], explanation: '"之"在此為賓語前置標誌，無實義。還原語序為「不知句讀」。', memoryTip: '動詞後面的「之」如果是賓語前置，把後面的名詞和前面的動詞對調就通了。' },
  { id: 4, category: '虛詞', word: '而', sentence: '青，取之於藍而青於藍', image: 'words/er.png', options: ['但是', '而且', '然後', '因為'], correctAnswer: ['但是'], explanation: '"而"表轉折，相當於「但是」「卻」。前後形成對比關係。', memoryTip: '前後意思相反 → 轉折（但是）；前後意思相近 → 並列（而且）。' },
  { id: 5, category: '虛詞', word: '於', sentence: '青，取之於藍', image: 'words/yu.png', options: ['從', '在', '比', '對'], correctAnswer: ['從'], explanation: '"於"引進動作的起點，相當於「從」「自」。', memoryTip: '於 + 地點/來源 = 從。於 + 比較對象 = 比。' },
  { id: 6, category: '實詞', word: '走', sentence: '兔走觸株', image: 'words/zou.png', options: ['跑', '走路', '離開', '移動'], correctAnswer: ['跑'], explanation: '文言文中「走」= 現代漢語「跑」。「行」才等於現代的「走」。', memoryTip: '古文「走」= 跑步🏃，古文「行」= 走路🚶。' },
]

export interface GrammarPoint {
  id: number
  name: string
  description: string
  category: string
  examples: { text: string; source: string; analysis: string }[]
}

export const GRAMMAR_POINTS: GrammarPoint[] = [
  { id: 1, name: '判斷句', description: '以「……者，……也」或單用「也」字表示判斷，相當於「……是……」。', category: '句式', examples: [{ text: '師者，所以傳道受業解惑也', source: '師說', analysis: '"……者，……也"為典型判斷句式，譯為"老師，是傳授道理、教授學業、解答疑惑的人"。' }] },
  { id: 2, name: '賓語前置', description: '賓語提到動詞或介詞之前。常見標誌：疑問代詞作賓語、「之」字標誌、「是」字標誌。', category: '句式', examples: [{ text: '何厭之有', source: '論語', analysis: '"之"為賓語前置標誌，還原為"有何厭"。' }, { text: '句讀之不知', source: '師說', analysis: '同上，"不知句讀"。' }] },
  { id: 3, name: '被動句', description: '表示主語是動作的承受者。常見形式：「見」「為……所……」「被」字。', category: '句式', examples: [{ text: '見笑於大方之家', source: '逍遙遊', analysis: '"見+動詞"表被動，"見笑"即"被取笑"。' }] },
  { id: 4, name: '定語後置', description: '修飾名詞的定語放在中心詞之後。常見標誌：「者」字結構、「之」字連接。', category: '句式', examples: [{ text: '馬之千里者', source: '勸學', analysis: '中心詞「馬」+ 之 + 定語「千里」+ 者。譯為「能跑千里的馬」。' }] },
]

export interface PastPaper {
  year: number
  source: string
  questions: { id: number; question: string; options: string[]; correctAnswer: string; explanation: string }[]
}

export const PAST_PAPERS: PastPaper[] = [
  { year: 2024, source: 'DSE 2024 卷一', questions: [
    { id: 1, question: '「何厭之有」中「之」的用法是：', options: ['助詞·的', '代詞·它', '賓語前置標誌', '動詞·去'], correctAnswer: '賓語前置標誌', explanation: '見賓語前置知識點。' },
    { id: 2, question: '下列哪項「而」的用法與其他不同？\nA. 青取之於藍而青於藍\nB. 溫故而知新\nC. 學而不思則罔\nD. 人不知而不慍', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B', explanation: 'B項「而」表遞進（而且），其餘三項均表轉折（但是）。' },
  ]},
  { year: 2023, source: 'DSE 2023 卷一', questions: [
    { id: 1, question: '《師說》中「師者，所以傳道受業解惑也」的句式是：', options: ['判斷句', '被動句', '倒裝句', '省略句'], correctAnswer: '判斷句', explanation: '「……者，……也」為典型判斷句式。' },
  ]},
]

export interface AncientCharacter {
  id: string
  name: string
  dynasty: string
  textId: string
  avatar: string
  greeting: string
}

export const ANCIENT_CHARACTERS: AncientCharacter[] = [
  { id: 'kongzi', name: '孔子', dynasty: '春秋', textId: 'lunyu', avatar: '📜', greeting: '學而時習之，不亦說乎？你有什麼想問老夫的？' },
  { id: 'hanYu', name: '韓愈', dynasty: '唐', textId: 'shishuo', avatar: '✍️', greeting: '吾師道也。你可知為何要從師學習？' },
  { id: 'zhuangzi', name: '莊子', dynasty: '戰國', textId: 'xiaoyao', avatar: '🦋', greeting: '不知周之夢為胡蝶與？胡蝶之夢為周與？' },
  { id: 'zhugeliang', name: '諸葛亮', dynasty: '三國', textId: 'chushi', avatar: '🎋', greeting: '臣亮言：先帝創業未半而中道崩殂。你有何要事相商？' },
  { id: 'sushi', name: '蘇軾', dynasty: '北宋', textId: 'chibi', avatar: '🍶', greeting: '大江東去，浪淘盡，千古風流人物。來，與我共飲一杯！' },
]

export interface AncientPost {
  id: number
  author: AncientCharacter
  content: string
  likes: number
  comments: number
  time: string
  gradientFrom: string
  gradientTo: string
  borderColor: string
  textColor: string
  commentList?: { name: string; text: string }[]
}

export const ANCIENT_POSTS: AncientPost[] = [
  {
    id: 1, author: ANCIENT_CHARACTERS[0],
    content: '今日與弟子論「學而不思則罔，思而不學則殆」，諸君以為然否？',
    likes: 245, comments: 3, time: '2小時前',
    gradientFrom: '#fef3c7', gradientTo: '#fde68a', borderColor: '#fcd34d', textColor: '#92400e',
    commentList: [
      { name: '子路', text: '夫子之言，弟子謹記於心！' },
      { name: '顏回', text: '學思並重，方能得其真義。' },
    ],
  },
  {
    id: 2, author: ANCIENT_CHARACTERS[2],
    content: '夢中化蝶，醒來不知自己是莊周還是蝴蝶。萬物本一，何來物我之分？',
    likes: 189, comments: 2, time: '5小時前',
    gradientFrom: '#e0e7ff', gradientTo: '#c7d2fe', borderColor: '#a5b4fc', textColor: '#3730a3',
    commentList: [
      { name: '惠施', text: '子非蝶，安知蝶之樂？' },
    ],
  },
  {
    id: 3, author: ANCIENT_CHARACTERS[1],
    content: '感概世人恥學於師，故作《師說》以警之。學無常師，道之所存，師之所存也。',
    likes: 312, comments: 4, time: '1天前',
    gradientFrom: '#dcfce7', gradientTo: '#bbf7d0', borderColor: '#86efac', textColor: '#166534',
    commentList: [
      { name: '柳宗元', text: '退之此文，振聾發聵！' },
      { name: '歐陽修', text: '師道之不傳也久矣，退之說得極是。' },
    ],
  },
  {
    id: 4, author: ANCIENT_CHARACTERS[4],
    content: '夜遊赤壁，清風徐來，水波不興。舉酒屬客，誦明月之詩，歌窈窕之章。',
    likes: 278, comments: 3, time: '2天前',
    gradientFrom: '#fce7f3', gradientTo: '#fbcfe8', borderColor: '#f9a8d4', textColor: '#9d174d',
    commentList: [
      { name: '黃庭堅', text: '東坡此賦，千古絕唱！' },
    ],
  },
  {
    id: 5, author: { name: '李白', dynasty: '唐', avatar: '🍶', textId: '', greeting: '' },
    content: '舉頭望明月，低頭思故鄉。今夜月色如霜，不知故鄉親友是否安好？',
    likes: 512, comments: 6, time: '3小時前',
    gradientFrom: '#fef3c7', gradientTo: '#fde68a', borderColor: '#fcd34d', textColor: '#92400e',
    commentList: [
      { name: '杜甫', text: '太白兄，何時歸來共飲？' },
      { name: '孟浩然', text: '月是故鄉明，情是故人深。' },
    ],
  },
  {
    id: 6, author: { name: '陶淵明', dynasty: '東晉', avatar: '🌿', textId: '', greeting: '' },
    content: '采菊東籬下，悠然見南山。山氣日夕佳，飛鳥相與還。此中有真意，欲辯已忘言。',
    likes: 367, comments: 4, time: '1天前',
    gradientFrom: '#ecfccb', gradientTo: '#d9f99d', borderColor: '#bef264', textColor: '#3f6212',
    commentList: [
      { name: '謝靈運', text: '淵明之詩，自然天成！' },
    ],
  },
  {
    id: 7, author: { name: '范仲淹', dynasty: '北宋', avatar: '🏯', textId: '', greeting: '' },
    content: '先天下之憂而憂，後天下之樂而樂。今日觀岳陽樓重修圖，感慨萬千，特此抒懷。',
    likes: 423, comments: 5, time: '6小時前',
    gradientFrom: '#e0f2fe', gradientTo: '#bae6fd', borderColor: '#7dd3fc', textColor: '#075985',
    commentList: [
      { name: '滕子京', text: '希文兄胸懷天下，令人敬佩！' },
    ],
  },
  {
    id: 8, author: { name: '歐陽修', dynasty: '北宋', avatar: '🍷', textId: '', greeting: '' },
    content: '醉翁之意不在酒，在乎山水之間也。山水之樂，得之心而寓之酒也。',
    likes: 198, comments: 2, time: '4天前',
    gradientFrom: '#f1f5f9', gradientTo: '#e2e8f0', borderColor: '#cbd5e1', textColor: '#334155',
    commentList: [
      { name: '曾鞏', text: '永叔文章，如行雲流水！' },
    ],
  },
]

export interface PuzzlePiece {
  id: number
  char: string
  currentPos: number
  correctPos: number
}

export const PUZZLE_SENTENCES = [
  { original: '學而時習之', hint: '《論語》開篇名句' },
  { original: '青出於藍', hint: '《勸學》比喻後輩勝前輩' },
  { original: '先天下之憂而憂', hint: '《岳陽樓記》名句' },
]
