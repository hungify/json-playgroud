<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Handle, useHandleConnections } from '@vue-flow/core'
import type { NodeElementData } from '@/types/graph'

const props = defineProps <NodeProps<NodeElementData>>()

const isObjectNode = computed(() => props.data && Array.isArray(props.data.text))

const sourceConnections = useHandleConnections({
  type: 'target',
})

const targetConnections = useHandleConnections({
  type: 'source',
})

const isSender = toRef(() => sourceConnections.value.length <= 0)

const isReceiver = toRef(() => targetConnections.value.length <= 0)
</script>

<template>
  <div class="h-full px-2">
    <template v-if="props.data">
      <GraphObjectNode
        v-if="isObjectNode"
        :node="props.data"
      />
      <GraphTextNode
        v-else
        :node="props.data"
      />
      <Handle
        v-if="!isSender"
        type="target"
        :position="targetPosition"
      />
      <Handle
        v-if="!isReceiver"
        type="source"
        :position="sourcePosition"
      />
    </template>
    <span v-else>
      No data
    </span>
  </div>
</template>

<style lang="scss">
.vue-flow__node-custom {
  border: 1px solid #475872;
  border-radius: 4px;
  background-color: #f6f8fa;
  transition: border-color 100ms ease-in-out;
}

.vue-flow__node-custom:hover {
  border-color: #a5a9e2;
}
</style>
