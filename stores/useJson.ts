import { useGraphStore } from './useGraph'

export const useJsonStore = defineStore('json', () => {
  const { clearGraph, setGraph } = useGraphStore()

  const json = ref<string>('null')
  const loading = ref<boolean>(true)

  const setJson = (data: string) => {
    json.value = data
    loading.value = false
    setGraph(data)
  }

  const clearJson = () => {
    json.value = 'null'
    loading.value = true
    clearGraph()
  }

  return {
    loading: computed(() => loading.value),
    json: computed(() => json.value),

    setJson,
    clearJson,
  }
})
