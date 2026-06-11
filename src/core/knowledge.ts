// ===== Knowledge Graph Logic =====
import { KNOWLEDGE_POINTS } from '../data/mockData'

export interface GraphNode {
  id: string
  name: string
  category: string
  mastery: number // 0-100
  x?: number
  y?: number
}

export interface GraphLink {
  source: string
  target: string
}

export function buildKnowledgeGraph(wrongCounts: Record<string, number>): {
  nodes: GraphNode[]
  links: GraphLink[]
} {
  const masteryByKnowledge = calculateMastery(wrongCounts)

  const nodes: GraphNode[] = KNOWLEDGE_POINTS.map(kp => ({
    id: kp.id,
    name: kp.name,
    category: kp.category,
    mastery: masteryByKnowledge[kp.id] ?? 100,
  }))

  const links: GraphLink[] = []
  const linkSet = new Set<string>()

  for (const kp of KNOWLEDGE_POINTS) {
    for (const relatedId of kp.relatedIds) {
      const key = [kp.id, relatedId].sort().join('-')
      if (!linkSet.has(key)) {
        linkSet.add(key)
        links.push({ source: kp.id, target: relatedId })
      }
    }
  }

  return { nodes, links }
}

function calculateMastery(wrongCounts: Record<string, number>): Record<string, number> {
  const result: Record<string, number> = {}
  for (const kp of KNOWLEDGE_POINTS) {
    const wrong = wrongCounts[kp.id] || 0
    // Each wrong answer reduces mastery, minimum 10%
    result[kp.id] = Math.max(10, 100 - wrong * 20)
  }
  return result
}
