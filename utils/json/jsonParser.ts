import { parseTree } from 'jsonc-parser'
import { addEdgeToGraph } from '../core/addEdgeToGraph'
import { addNodeToGraph } from '../core/addNodeToGraph'
import { traverse } from '../core/traverse'
import { getNodePath } from './getNodePath'
import type { CustomEdgeType, CustomNodeType } from '@/types/graph'

export interface Graph {
  nodes: CustomNodeType[]
  edges: CustomEdgeType[]
}

export interface States {
  parentName: string
  bracketOpen: { id: string, type: string }[]
  objectsFromArray: number[]
  objectsFromArrayId: number
  notHaveParent: string[]
  brothersNode: [string, string][] | string
  brothersParentId: string | undefined
  brotherKey: string
  brothersNodeProps: {
    id: string
    parentId: string | undefined
    objectsFromArrayId: number | undefined
  }[]
  graph: Graph
}

function initializeStates(): States {
  return {
    parentName: '',
    bracketOpen: [],
    objectsFromArray: [],
    objectsFromArrayId: 0,
    notHaveParent: [],
    brothersNode: [],
    brothersParentId: undefined,
    brotherKey: '',
    brothersNodeProps: [],
    graph: {
      nodes: [],
      edges: [],
    },
  }
}

export function parser(jsonStr: string): Graph {
  try {
    const states = initializeStates()
    const parsedJsonTree = parseTree(jsonStr)

    if (!parsedJsonTree)
      throw new Error('Invalid document')

    traverse({ states, objectToTraverse: parsedJsonTree })

    const { notHaveParent, graph } = states

    if (notHaveParent.length > 1 && parsedJsonTree.type !== 'array') {
      const emptyNode = { id: null, isEmpty: true, data: { text: '' }, position: { x: 0, y: 0 } }
      const emptyId = addNodeToGraph({ graph, ...emptyNode })

      notHaveParent.forEach(childId => addEdgeToGraph(graph, emptyId, childId))
    }

    if (states.graph.nodes.length === 0) {
      if (parsedJsonTree.type === 'array')
        addNodeToGraph({ graph: states.graph, data: { text: '[]' }, position: { x: 0, y: 0 } })
      else if (parsedJsonTree.type === 'object')
        addNodeToGraph({ graph: states.graph, data: { text: '{}' }, position: { x: 0, y: 0 } })
      else
        addNodeToGraph({ graph: states.graph, data: { text: parsedJsonTree.value }, position: { x: 0, y: 0 } })
    }

    states.graph.nodes = states.graph.nodes.map((node) => {
      if (node.data) {
        return {
          ...node,
          data: {
            ...node.data,
            path: getNodePath(states.graph.nodes, states.graph.edges, node.id),
          },
          type: 'custom',
        }
      }

      return node
    })

    return states.graph
  }
  catch (error) {
    console.error(error)

    return { nodes: [], edges: [] }
  }
}
