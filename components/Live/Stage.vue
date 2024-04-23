<script setup lang="ts">
interface Props {
  mode: 'graph' | 'tree'
}

defineProps<Props>()
</script>

<template>
  <div v-if="mode === 'graph'">
    <LiveGraph />
  </div>
</template>
