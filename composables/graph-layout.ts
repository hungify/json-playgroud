import { Position, isGraphNode, useNodesInitialized, useVueFlow } from '@vue-flow/core'
import dagre from 'dagre'
import { ref } from 'vue'
import type { CustomEdgeType, CustomNodeType } from '@/types/graph'

export type DagreDirection = 'TB' | ' BT' | 'LR' | 'RL'

interface LayoutOptions {
  nodes: CustomNodeType[]
  edges: CustomEdgeType[]
  direction: DagreDirection
}

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
export function useLayout() {
  const graph = ref(new dagre.graphlib.Graph())

  const previousDirection = ref<DagreDirection>('LR')

  function getLayoutedNodes({ nodes, edges, direction }: LayoutOptions) {
    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    const dagreGraph = new dagre.graphlib.Graph()

    graph.value = dagreGraph

    dagreGraph.setDefaultEdgeLabel(() => ({}))

    const isHorizontal = direction === 'LR'

    dagreGraph.setGraph({ rankdir: direction })

    previousDirection.value = direction

    for (const node of nodes) {
      // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)

      const graphNode = nodes.find(n => n.id === node.id)

      const width = graphNode?.width || 150
      const height = graphNode?.height || 50

      dagreGraph.setNode(node.id, { width, height })
    }

    for (const edge of edges)
      dagreGraph.setEdge(edge.source, edge.target)

    dagre.layout(dagreGraph)

    // set nodes with updated positions
    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)

      const position = {
        x: Math.round(nodeWithPosition.x - nodeWithPosition.width / 2),
        y: Math.round(nodeWithPosition.y - nodeWithPosition.height / 2),
      }

      return {
        ...node,
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        position,
      }
    })
  }

  return { graph, previousDirection, getLayoutedNodes }
}
