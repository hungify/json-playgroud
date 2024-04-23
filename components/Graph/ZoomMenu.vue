<script setup lang="ts">
import { Menu } from 'floating-vue'

import { useVueFlow } from '@vue-flow/core'

const { zoomIn, zoomOut, viewport, minZoom, zoomTo, maxZoom, fitView, getViewport } = useVueFlow()

const minZoomReached = computed(() => viewport.value.zoom <= minZoom.value)

const maxZoomReached = computed(() => viewport.value.zoom >= maxZoom.value)

const menuItems = [{
  title: 'Zoom In',
  value: 'zoom-in',
  disabled: maxZoomReached.value,
  onClick: zoomIn,
}, {
  title: 'Zoom Out',
  value: 'zoom-out',
  disabled: minZoomReached.value,
  onClick: zoomOut,
}, {
  title: 'Zoom to fit',
  value: 'zoom-to-fit',
  onClick: fitView,
}, {
  title: 'Zoom to 50%',
  value: 'zoom-to-50',
  onClick: () => zoomTo(0.5),
}, {
  title: 'Zoom to 100%',
  value: 'zoom-to-100',
  onClick: () => zoomTo(1),
}, {
  title: 'Zoom to 200%',
  value: 'zoom-to-200',
  onClick: () => zoomTo(2),
}]

const zoomValue = computed(() => {
  const { zoom } = getViewport()

  return Math.round(zoom * 100)
})

function performSelectMenu(itemSelected: typeof menuItems[number]) {
  itemSelected.onClick()
}
</script>

<template>
  <Menu>
    <button
      class="block rounded-lg bg-gray-100 px-4 py-1 text-sm text-gray-700 font-medium"
    >
      {{ zoomValue }} %
    </button>

    <template #popper>
      <ul class="p-2 space-y-1">
        <li
          v-for="item in menuItems"
          :key="item.value"
          :disabled="item.disabled"
          class="block cursor-pointer select-none select-none rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 font-medium"
          @click="performSelectMenu(item)"
        >
          <span>
            {{ item.title }}
          </span>
        </li>
      </ul>
    </template>
  </Menu>
</template>
