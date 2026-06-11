// ===== App Router for Classical Chinese Learning Platform Prototype =====
import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy load screens
const HomeScreen = lazy(() => import('./screens/HomeScreen'))
const LearnScreen = lazy(() => import('./screens/LearnScreen'))
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'))
const WrongEntryScreen = lazy(() => import('./screens/WrongEntryScreen'))
const AnalysisScreen = lazy(() => import('./screens/AnalysisScreen'))
const SocraticScreen = lazy(() => import('./screens/SocraticScreen'))
const AnswerScreen = lazy(() => import('./screens/AnswerScreen'))
const VariantScreen = lazy(() => import('./screens/VariantScreen'))
const WrongBookScreen = lazy(() => import('./screens/WrongBookScreen'))
const StatsScreen = lazy(() => import('./screens/StatsScreen'))
const KnowledgeScreen = lazy(() => import('./screens/KnowledgeScreen'))
const CommunityScreen = lazy(() => import('./screens/CommunityScreen'))
const BottomNav = lazy(() => import('./components/BottomNav'))

function Loading() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
      <div className="text-gray-400 text-sm">加载中...</div>
    </div>
  )
}

function WithNav({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="pb-16" />
      <BottomNav />
    </>
  )
}

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* 4-tab pages with bottom nav */}
        <Route path="/home" element={<WithNav><HomeScreen /></WithNav>} />
        <Route path="/learn" element={<WithNav><LearnScreen /></WithNav>} />
        <Route path="/knowledge" element={<WithNav><KnowledgeScreen /></WithNav>} />
        <Route path="/profile" element={<WithNav><ProfileScreen /></WithNav>} />

        {/* Sub-pages with bottom nav (not tabs but reachable from home/profile) */}
        <Route path="/wrongbook" element={<WithNav><WrongBookScreen /></WithNav>} />
        <Route path="/stats" element={<WithNav><StatsScreen /></WithNav>} />
        <Route path="/community" element={<WithNav><CommunityScreen /></WithNav>} />

        {/* Full-screen flow (no bottom nav) */}
        <Route path="/entry" element={<WrongEntryScreen />} />
        <Route path="/analysis/:wrongId" element={<AnalysisScreen />} />
        <Route path="/socratic/:knowledgeId/:wrongId" element={<SocraticScreen />} />
        <Route path="/answer/:knowledgeId/:wrongId" element={<AnswerScreen />} />
        <Route path="/variant/:knowledgeId/:wrongId" element={<VariantScreen />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  )
}
