import type { EdgeData, NodeData } from '@/types/graph'

/**
 * Get sources pointing to a node.
 */
export function getSourceNodesForTargetId(
  nodes: NodeData[],
  edges: EdgeData[],
  nodeId: string,
) {
  const sourceNodeIds = edges.reduce<(string)[]>((acc, edge) => {
    if (edge.target === nodeId)
      acc.push(edge.source)

    return acc
  }, [])

  const node = nodes.find(n => n.id === nodeId)

  if (node?.data?.isParent && node.parentNode)
    sourceNodeIds.push(node.parentNode)

  return nodes.filter(n => sourceNodeIds.includes(n.id))
}
