<script setup lang="ts">
interface Props {
  rowKey: string
}

defineProps<Props>()

const color = computed(() => {
  return getTextColor({ type: 'object' })
})
</script>

<template>
  <span class="rowKey">{{ rowKey }}</span>
</template>

<style lang="css" scoped>
.rowKey {
  display: inline;
  color: v-bind(color);

  &::after {
    content: ':';
    margin-inline-end: 5px;
  }
}
</style>
