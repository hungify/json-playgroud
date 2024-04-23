import type { XYPosition } from '@vue-flow/core'
import type { NodeType } from 'jsonc-parser'
import { calculateNodeSize } from '../graph/calculateNodeSize'
import type { Graph } from '../json/jsonParser'
import type { NodeData } from '@/types/graph'

interface Props {
  graph: Graph
  data: { text: string | [string, string][] }
  isEmpty?: boolean
  type?: NodeType
  position: XYPosition
}

export const addNodeToGraph = ({ graph, data, type = 'null', isEmpty = false, position }: Props) => {
  const id = String(graph.nodes.length + 1)
  const isParent = type === 'array' || type === 'object'
  const { width, height } = calculateNodeSize(data.text, isParent)

  const node: NodeData = {
    id,
    width,
    height,
    position,
    data: {
      type,
      text: data.text,
      isParent,
      isEmpty,
      childrenCount: isParent ? 1 : 0,
    },
  }

  graph.nodes.push(node)

  return id
}
