<script setup lang="ts">
import type { EdgeProps } from '@vue-flow/core'
import { BezierEdge } from '@vue-flow/core'

defineProps<EdgeProps>()
</script>

<template>
  <BezierEdge
    :source-x="sourceX"
    :source-y="sourceY"
    :target-x="targetX"
    :target-y="targetY"
    :source-position="sourcePosition"
    :target-position="targetPosition"
    :marker-start="markerStart"
    :marker-end="markerEnd"
  />
</template>

<style lang="css">
.vue-flow__edge-custom .vue-flow__edge-path {
  stroke: #475872;
  transition: stroke 100ms ease-in-out;
}

.vue-flow__edge-custom:hover .vue-flow__edge-path {
  stroke: #a5a9e2;
}
</style>
