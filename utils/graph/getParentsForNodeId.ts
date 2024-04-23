import { getSourceNodesForTargetId } from './getSourceNodesForTargetId'
import type { EdgeData, NodeData } from '@/types/graph'

/**
 * Given a node id, get all the parent nodes recursively.
 */
export const getParentsForNodeId = (
  nodes: NodeData[],
  edges: EdgeData[],
  startId: string,
) => {
  const result: NodeData[] = []

  const traverse = (nodeId: string) => {
    const sourceNodes = getSourceNodesForTargetId(nodes, edges, nodeId)
    for (const node of sourceNodes) {
      const has = result.find(n => n.id === node.id)
      if (!has) {
        result.push(node)
        traverse(node.id)
      }
    }
  }

  traverse(startId)

  return result
}
