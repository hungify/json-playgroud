<script setup lang="ts">
import type { NodeElementData } from '@/types/graph'
import { VUE_FLOW_THEME } from '~/constants/graph'

interface Props {
  node: NodeElementData
}

const props = defineProps<Props>()

const text = computed(() => JSON.stringify(props.node.text).replaceAll('"', ''))

const isParent = computed(() => props.node.isParent)
const childrenCount = computed(() => props.node.childrenCount)

const style = computed(() => {
  return {
    count: {
      color: VUE_FLOW_THEME.light.NODE_COLORS.CHILD_COUNT,
    },
    key: {
      color: getTextColor({ value: text.value, parent: isParent.value, type: props.node.type }),
      fontSize: isParent.value ? '14px' : '12px',
    },
  }
})
</script>

<template>
  <div class="wrapper">
    <div
      class="key"
      :style="style.key"
    >
      <GraphTextRenderer :text="text" />
    </div>
    <span
      v-if="isParent"
      class="children-count"
      :style="style.count"
    >
      ({{ childrenCount }})
    </span>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 100%;
  inline-size: 100%;
}

.key {
  display: inline;
  overflow: hidden;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.children-count {
  margin-inline-start: -15px;
}
</style>
