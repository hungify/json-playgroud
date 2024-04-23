<script setup lang="ts">
import type { EdgeTypesObject, NodeMouseEvent, NodeTypesObject } from '@vue-flow/core'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import CustomNode from '../Graph/CustomNode.vue'
import CustomEdge from '../Graph/CustomEdge.vue'

const nodeTypes = {
  custom: markRaw(CustomNode),
} as NodeTypesObject

const edgeTypes = {
  custom: markRaw(CustomEdge),
} as EdgeTypesObject

const graphStore = useGraphStore()

const { getLayoutedNodes, previousDirection } = useLayout()
const { fitView } = useVueFlow()

async function perFormChangeLayoutGraph(direction: DagreDirection) {
  const newNodes = getLayoutedNodes({ nodes: graphStore.nodes, edges: graphStore.edges, direction })

  graphStore.setNodes(newNodes)
  await nextTick()

  fitView()
}

function onNodeClick(event: NodeMouseEvent) {
  // eslint-disable-next-line no-console
  console.log('Node clicked:', event)
}

const nextDirection = computed(() => {
  return {
    value: previousDirection.value === 'LR' ? 'TB' : 'LR',
    icon: 'i-carbon-flow',
  } as const
})
</script>

<template>
  <div class="layout-flow">
    <VueFlow
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
      :nodes="graphStore.nodes"
      :edges="graphStore.edges"
      fit-view-on-init
      :min-zoom="0.2"
      :max-zoom="4"
      :nodes-draggable="false"
      @node-click="onNodeClick"
    >
      <Panel
        class="process-panel"
        position="top-left"
      >
        <div class="flex gap-4">
          <button
            class="text-xl"
            :class="[nextDirection.icon, {
              ['rotate-90']: nextDirection.value === 'TB',
            }]"
            @click="perFormChangeLayoutGraph(nextDirection.value)"
          />
          <GraphZoomMenu />
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<style lang="scss">
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

.layout-flow {
  block-size: 100vh;
}

.process-panel,
.layout-panel {
  display: flex;
  gap: 10px;
}

.process-panel {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 8px;
  margin: 0;
}
</style>
