import { MarkerType } from '@vue-flow/core'
import type { Graph } from '../json/jsonParser'
import type { EdgeData } from '@/types/graph'

export const addEdgeToGraph = (graph: Graph, from: string, to: string) => {
  const newEdge: EdgeData = {
    id: `e${from}->${to}`,
    source: from,
    target: to,
    type: 'custom',
    markerEnd: MarkerType.ArrowClosed,
  }

  graph.edges.push(newEdge)
}
