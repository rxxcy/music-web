<template>
  <aside class="pos-fixed bottom-0 h-70px bg-white" :style="style">
    <div class="">
      <n-slider
        v-model:value="progress"
        :step="10"
        :theme-overrides="sliderThemeOverrides"
      />
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import type { SliderProps } from 'naive-ui'
import { usePlayerStore } from '~/store/modules/player'
import { useAppStore } from '~/store'

type SliderThemeOverrides = NonNullable<SliderProps['themeOverrides']>

const sliderThemeOverrides: SliderThemeOverrides = {
  handleSize: '15px',
}

const appStore = useAppStore()
const isMenuCollapsed = computed(() => appStore.isMenuCollapsed)

const playerStore = usePlayerStore()

const style = computed(() => {
  const collapsed = isMenuCollapsed.value
  return collapsed
    ? {
        width: 'calc(100vw - 64px)',
        left: '64px',
      }
    : {
        width: 'calc(100vw - 240px)',
        left: '240px',
      }
})
const progress = computed({
  get: () => playerStore.progress,
  set: (value) => {
    playerStore.setProgress(value)
  },
})
</script>

<style scoped></style>
