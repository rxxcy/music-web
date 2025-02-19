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
            <p class="m-0 text-sm">
              <n-ellipsis style="max-width: 200px">
                {{ currentSong?.artist }}
              </n-ellipsis>
            </p>
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

  <n-drawer v-model:show="showList" :width="502">
    <n-drawer-content>
      <template #header>
        <div class="flex gap-1">
          <h3 class="m0 p0">播放列表</h3>
          <small class="text-gray-6">{{ playlist.length }}</small>
        </div>
      </template>
      <n-scrollbar style="max-height: 100%" trigger="none">
        <div class="" v-for="item in playlist" :key="item.id">
          {{ item }}
        </div>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
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

type SliderThemeOverrides = NonNullable<SliderProps['themeOverrides']>

const sliderThemeOverrides: SliderThemeOverrides = {
  handleSize: '15px',
}

const showList = ref(false)
const handlerSetShowList = () => (showList.value = !showList.value)
const appStore = useAppStore()
const isMenuCollapsed = computed(() => appStore.isMenuCollapsed)

const playerStore = usePlayerStore()
const playlist = computed(() => playerStore.playlist)
const isDragingProgress = computed(() => playerStore.isDragingProgress)
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
</script>

<style scoped></style>
