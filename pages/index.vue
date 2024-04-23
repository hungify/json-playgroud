<script setup lang="ts">
import { JSON_SAMPLE } from '~/constants'

const source = ref(JSON.stringify(JSON_SAMPLE, null, 2))
const jsonStore = useJsonStore()
const mode = ref<'graph' | 'tree'>('graph')

watchEffect(() => {
  jsonStore.setJson(source.value)
})
</script>

<template>
  <section class="relative flex justify-between">
    <div class="w-[400px] flex-shrink-0">
      <EditorJson v-model="source" />
    </div>
    <div class="w-full">
      <LiveStage :mode="mode" />
    </div>
  </section>
</template>
