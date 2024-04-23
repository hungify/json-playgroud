import type { CustomEdgeType, CustomNodeType, NodeElementData } from '~/types/graph'
import { parser } from '~/utils/json/jsonParser'

interface Graph {
  loading: boolean
  nodes: CustomNodeType[]
  edges: CustomEdgeType[]
}

const initialStates: Graph = {
  loading: true,
  edges: [],
  nodes: [],
}

export const useGraphStore = defineStore('graph', () => {
  const graph = ref<Graph>(initialStates)
  const { getLayoutedNodes } = useLayout()

  const setGraph = (data: string, options?: Partial<Graph>[]) => {
    graph.value.loading = true

    const { nodes, edges } = parser(data)

    const newNodes = getLayoutedNodes({ nodes, edges, direction: 'LR' })

    graph.value = {
      nodes: newNodes,
      edges,
      loading: false,
      ...options,
    }
  }

  const setNodes = (nodes: CustomNodeType[]) => {
    graph.value.nodes = nodes
  }

  const setEdges = (edges: CustomEdgeType[]) => {
    graph.value.edges = edges
  }

  const clearGraph = () => {
    graph.value = initialStates
  }

  return {
    nodes: computed(() => graph.value.nodes),
    edges: computed(() => graph.value.edges),
    loading: computed(() => graph.value.loading),

    setGraph,
    setNodes,
    setEdges,
    clearGraph,
  }
})
