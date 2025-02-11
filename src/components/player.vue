<template>
  <aside class="pos-fixed bottom-0 h-70px bg-gray" :style="style">
    <div class="flex h-full justify-between px-100px">
      <div class="flex gap-4 items-center">
        <div>
          <n-image
            width="50"
            height="50"
            class="rounded-sm block w-50px h-50px"
            :src="currentSong?.albumpic"
            preview-disabled
          />
        </div>
        <div class="h-full flex flex-col justify-center">
          <h3 class="m-0 p-0">
            <n-ellipsis style="max-width: 100px">
              {{ currentSong?.name }}
            </n-ellipsis>
          </h3>
          <p class="m-0 text-sm">
            <n-ellipsis style="max-width: 100px">
              {{ currentSong?.artists }}
            </n-ellipsis>
          </p>
        </div>
      </div>
      <div class="flex items-center">
        <!-- <n-slider
          v-model:value="progress"
          :step="10"
          :theme-overrides="sliderThemeOverrides"
        /> -->
        <n-button quaternary circle>
          <template #icon>
            <n-icon>
              <PlaySkipBackSharp />
            </n-icon>
          </template>
        </n-button>
        <n-button quaternary circle size="large">
          <template #icon>
            <n-icon size="34">
              <PlayCircleOutline v-if="isPaused" />
              <PauseCircleOutline v-else />
            </n-icon>
          </template>
        </n-button>
        <n-button quaternary circle>
          <template #icon>
            <n-icon>
              <PlaySkipForwardSharp />
            </n-icon>
          </template>
        </n-button>
      </div>
      <div class="flex items-center">
        <n-button quaternary circle size="large">
          <template #icon>
            <n-icon>
              <SyncCircleOutline />
            </n-icon>
          </template>
        </n-button>

        <div>
          <n-slider
            class="w-100px"
            v-model:value="volume"
            :step="1"
            :theme-overrides="sliderThemeOverrides"
          />
        </div>

        <n-button quaternary circle>
          <template #icon>
            <n-icon>
              <ListCircleOutline />
            </n-icon>
          </template>
        </n-button>
      </div>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import type { SliderProps } from 'naive-ui'
import { usePlayerStore } from '~/store/modules/player'
import { useAppStore } from '~/store'
import {
  PlayCircleOutline,
  PlaySkipBackSharp,
  PauseCircleOutline,
  PlaySkipForwardSharp,
  SyncCircleOutline, // 循环
  ListCircleOutline, // 列表
} from '@vicons/ionicons5'

type SliderThemeOverrides = NonNullable<SliderProps['themeOverrides']>

const sliderThemeOverrides: SliderThemeOverrides = {
  handleSize: '15px',
}

const appStore = useAppStore()
const isMenuCollapsed = computed(() => appStore.isMenuCollapsed)

const playerStore = usePlayerStore()
const volume = computed({
  set(value: number) {
    return playerStore.setVolume(value / 100)
  },
  get() {
    console.log(playerStore.volumeValue)

    return playerStore.volumeValue * 100
  },
})
const isPaused = computed(() => playerStore.isPaused)
const currentSong = computed(() => playerStore.currentSong)
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
