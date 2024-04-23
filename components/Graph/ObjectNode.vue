<script lang="ts" setup>
import type { ArrayLikeJson, NodeElementData } from '~/types/graph'

interface Props {
  node: NodeElementData
}

const props = defineProps<Props>()
const getRowKey = (val: ArrayLikeJson[number]) => JSON.stringify(val[0]).replaceAll('"', '')
const getRowValue = (val: ArrayLikeJson[number]) => JSON.stringify(val[1])
</script>

<template>
  <ul
    v-if="Array.isArray(props.node.text)"
    class="h-full w-full flex flex-col cursor-pointer list-none justify-center pa-1 text-sm font-semibold"
  >
    <li
      v-for="(item) in props.node.text"
      :key="JSON.stringify(item)"
      class="flex items-center"
      :style="{ color: getTextColor({ value: getRowValue(item) }) }"
    >
      <GraphKeyRenderer :row-key="getRowKey(item)" />
      <GraphTextRenderer :text="getRowValue(item) " />
    </li>
  </ul>
</template>
