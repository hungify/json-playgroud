<script lang="ts" setup>
import type * as Monaco from 'monaco-editor'

const props = defineProps<Props>()

// loader.config({
//   paths: {
//     vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs",
//   },
// });

const defaultOptions: Monaco.editor.IStandaloneEditorConstructionOptions = {
  fontFamily: '\'Input Mono\', Menlo, \'Courier New\', monospace',
  fontSize: 13,
  minimap: {
    enabled: false,
  },
  theme: 'vs-dark',
  formatOnPaste: true,
  formatOnType: true,
}

interface Props {
  modelValue: string
  options?: Monaco.editor.IStandaloneEditorConstructionOptions
}
const sourceCode = useModel(props, 'modelValue')

const loading = ref(true)

const options = computed(() => {
  return {
    ...defaultOptions,
    ...props.options,
  }
})
</script>

<template>
  <div class="grid h-full grid-cols-1 grid-rows-1">
    <div class="flex flex-col h-full select-none">
      <MonacoEditor
        v-model="sourceCode"
        class="h-screen w-full"
        :options="options"
        lang="json"
        loading="Monaco Editor..."
        @load="loading = false"
      />
    </div>
  </div>
</template>
