// ===== Socratic Dialogue Engine (mock) =====
import { SOCRATIC_DIALOGUE_MOCK, KNOWLEDGE_POINTS } from '../data/mockData'
import type { SocraticStep } from '../data/mockData'

export function getSocraticDialogue(knowledgeId: string): SocraticStep[] {
  return SOCRATIC_DIALOGUE_MOCK[knowledgeId] || SOCRATIC_DIALOGUE_MOCK['k1']
}

export function getKnowledgeName(knowledgeId: string): string {
  const kp = KNOWLEDGE_POINTS.find(k => k.id === knowledgeId)
  return kp?.name || '未知知识点'
}

export function getKnowledgeDefinition(knowledgeId: string): string {
  const kp = KNOWLEDGE_POINTS.find(k => k.id === knowledgeId)
  return kp?.definition || ''
}
