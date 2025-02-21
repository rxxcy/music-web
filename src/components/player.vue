<template>
  <aside class="pos-fixed bottom-0 h-70px" :style="style">
    <div class="pos-relative h-full w-full">
      <div class="w-full pos-absolute left-0 top--10px">
        <n-slider
          v-model:value="progress"
          :step="1"
          :theme-overrides="sliderThemeOverrides"
          :on-dragstart="handlerDragstart"
          :on-dragend="handlerDragend"
        />
      </div>
      <div class="flex h-full justify-between px-100px">
        <div class="flex-1 flex gap-x-2 items-center">
          <div>
            <n-image
              width="50"
              height="50"
              class="rounded-sm block w-50px h-50px"
              :src="currentSong?.album_pic"
              preview-disabled
            />
          </div>
          <div class="h-full flex flex-col justify-center">
            <h3 class="m-0 p-0 cursor-pointer">
              <n-ellipsis style="max-width: 200px">
                {{ currentSong?.name }}
              </n-ellipsis>
            </h3>

            <div class="flex">
              <n-ellipsis style="max-width: 200px">
                <p class="m-0 text-sm">
                  {{ currentSong?.artist }}
                </p>
              </n-ellipsis>
              <span class="ml-2 text-gray-5 flex">
                <span class="w-50px text-center">
                  {{ duration[0] }}
                </span>
                <span class="">/</span>
                <span class="w-50px text-center">{{ duration[1] }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="flex-1 flex items-center gap-x-2 justify-center">
          <n-button quaternary circle @click="handlerPrevSong">
            <template #icon>
              <n-icon>
                <PlaySkipBackSharp />
              </n-icon>
            </template>
          </n-button>
          <n-button quaternary circle size="large" @click="handlerPlayOrPause">
            <template #icon>
              <n-icon size="34">
                <PlayCircleOutline v-if="isPaused" />
                <PauseCircleOutline v-else />
              </n-icon>
            </template>
          </n-button>
          <n-button quaternary circle @click="handlerNextSong">
            <template #icon>
              <n-icon>
                <PlaySkipForwardSharp />
              </n-icon>
            </template>
          </n-button>
        </div>
        <div class="flex-1 flex items-center gap-x-2 justify-end">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button quaternary circle size="large" @click="toggleLoopMode">
                <template #icon>
                  <n-icon>
                    <SyncCircleOutline />
                  </n-icon>
                </template>
              </n-button>
            </template>
            {{ loopMode }}
          </n-tooltip>

          <div>
            <n-slider
              class="w-100px"
              v-model:value="volume"
              :step="1"
              :theme-overrides="sliderThemeOverrides"
            />
          </div>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button quaternary circle @click="handlerSetShowList">
                <template #icon>
                  <n-icon>
                    <ListCircleOutline />
                  </n-icon>
                </template>
              </n-button>
            </template>
            播放列表
          </n-tooltip>
        </div>
      </div>
    </div>
  </aside>

  <PlayList ref="playListRef" />
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
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
import { secondsToMinutesSeconds } from '~/utils/format'
import PlayList from './PlayList.vue'

type SliderThemeOverrides = NonNullable<SliderProps['themeOverrides']>

const sliderThemeOverrides: SliderThemeOverrides = {
  handleSize: '15px',
}

const playListRef = ref()

const handlerSetShowList = () => playListRef.value?.handlerShowList()
const appStore = useAppStore()
const isMenuCollapsed = computed(() => appStore.isMenuCollapsed)

const playerStore = usePlayerStore()

const isDragingProgress = computed(() => playerStore.isDragingProgress)
const duration = computed(() => {
  if (!currentSong.value?.duration) return ['00:00', '00:00']
  const c = currentSong.value.duration
  const n = Math.ceil((playerStore.progress / 100) * c)
  return [secondsToMinutesSeconds(n), secondsToMinutesSeconds(c)]
})
const volume = computed({
  set(value: number) {
    return playerStore.setVolume(value / 100)
  },
  get() {
    return playerStore.volumeValue
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

const loopMode = computed(() => {
  const mode = playerStore.loopMode
  const maps = {
    none: '无',
    single: '单曲循环',
    all: '列表循环',
  }
  return maps[mode]
})

const toggleLoopMode = () => playerStore.toggleLoopMode()
const handlerPlayOrPause = () => playerStore.togglePlay()
const handlerDragstart = () => playerStore.toggleIsDragingProgress(true)
const handlerDragend = () => playerStore.toggleIsDragingProgress(false)

const handlerNextSong = () => playerStore.nextSong()
const handlerPrevSong = () => playerStore.prevSong()

// const secondsToMinutesSeconds = (x: number) => secondsToMinutesSeconds(x)
</script>

<style>
.play-list-music-item:hover > .opacity-0 {
  opacity: 1;
}
.play-list-music-item:hover > .flex-1 {
  --un-text-opacity: 1;
  color: rgb(74 222 128 / var(--un-text-opacity)) /* #4ade80 */;
}
</style>
