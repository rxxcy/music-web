<template>
  <n-drawer v-model:show="showList" :width="502">
    <n-drawer-content>
      <template #header>
        <div class="flex gap-1">
          <h3 class="m0 p0">播放列表</h3>
          <small class="text-gray-6">{{ playlist.length }}</small>
        </div>
      </template>
      <n-scrollbar style="max-height: 100%" trigger="none">
        <div class="flex flex-col gap-y-2">
          <div
            class="flex items-center gap-x-2 cursor-pointer play-list-music-item"
            v-for="(item, index) in playlist"
            :key="item.id"
          >
            <img
              class="w-52px h-52px rounded block"
              :src="item.album_pic"
              :alt="item.name"
            />
            <div class="flex-1 h-full flex flex-col justify-center">
              <h3
                @click="handlerPlayByIndex(index)"
                class="m0 font-400 duration-200"
                :class="[currentSong?.id == item.id ? 'text-green' : '']"
              >
                <n-ellipsis style="max-width: 270px">
                  {{ item.name }}
                </n-ellipsis>
              </h3>
              <p class="m0 text-xs text-gray-6">
                {{ item.artist }}
              </p>
            </div>
            <div class="opacity-0 duration-200">
              <n-button quaternary circle>
                <template #icon>
                  <n-icon>
                    <PauseCircleOutline
                      v-if="currentSong?.id == item.id && !isPaused"
                    />
                    <PlayCircleOutline v-else />
                  </n-icon>
                </template>
              </n-button>
              <n-button class="ml-1" quaternary circle>
                <template #icon>
                  <n-icon><CloseCircleOutline /></n-icon>
                </template>
              </n-button>
            </div>
            <div class="">
              {{ secondsToMinutesSeconds(item.duration) }}
            </div>
          </div>
        </div>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  PlayCircleOutline,
  PauseCircleOutline,
  CloseCircleOutline, //关闭
} from '@vicons/ionicons5'
import { usePlayerStore } from '~/store/modules/player'
import { secondsToMinutesSeconds } from '~/utils/format'

const showList = ref(false)
const playerStore = usePlayerStore()

const isPaused = computed(() => playerStore.isPaused)
const playlist = computed(() => playerStore.playlist)
const currentSong = computed(() => playerStore.currentSong)
const handlerPlayByIndex = (index: number) => {
  const t = playlist.value[index]
  if (t.id === currentSong.value?.id) {
    playerStore.togglePlay()
    return
  }
  playerStore.playSongAtIndex(index)
}

const handlerShowList = () => (showList.value = true)
defineExpose({
  handlerShowList,
})
</script>
<style></style>
