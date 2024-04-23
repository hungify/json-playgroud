<script setup lang="ts">
interface Props {
  text: string
}

const props = defineProps<Props>()

const isURL = computed(() => {
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/

  return re.test(String(props.text).toLowerCase())
})

const normalizedURL = computed(() => {
  return props.text.replace(/"/g, '')
})
</script>

<template>
  <a
    v-if="isURL"
    class="link"
    :href="normalizedURL"
    target="_blank"
    rel="noopener noreferrer"
    @click.stop
  >
    <span>
      {{ text }}
    </span>
  </a>
  <span
    v-else
    class="row"
  >
    {{ text }}
  </span>
</template>

<style lang="scss" scoped>
.row {
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
}

.link {
  overflow: hidden;
  pointer-events: all;
  text-decoration: underline;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
