<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { NButton, NSlider, NIcon } from 'naive-ui'
import { Play, Pause } from '@vicons/ionicons5'

interface Song {
  title: string
  artist: string
  duration: number // seconds
  url: string
}

const playlist = ref<Song[]>([
  {
    title: 'Song 1',
    artist: 'Artist 1',
    duration: 180,
    url: 'http://lv.sycdn.kuwo.cn/70a6142f991041445a6af11a6ac016aa/67948010/resource/30106/trackmedia/M800000HY8ha2kgK2l.mp3?bitrate$320&format$mp3&source$kwplayer_ar_5.1.0.0_B_jiakong_vh.apk&type$convert_url2',
  },
  {
    title: 'Song 2',
    artist: 'Artist 2',
    duration: 200,
    url: 'http://lw.sycdn.kuwo.cn/a5d4ada1972812b525ce181e6f59bf0f/67948031/resource/30106/trackmedia/M500003ZQREs39AMVp.mp3?bitrate$128&format$mp3&source$kwplayer_ar_5.1.0.0_B_jiakong_vh.apk&type$convert_url2',
  },
])

const currentSongIndex = ref(0)
const isPlaying = ref(false)
const currentTime = ref(0)
const volume = ref(50)

const audio = new Audio()
audio.volume = volume.value / 100

const currentSong = computed(() => playlist.value[currentSongIndex.value])

watch(currentSong, song => {
  audio.src = song.url
  audio.currentTime = 0
  if (isPlaying.value) audio.play()
})

watch(volume, v => {
  audio.volume = v / 100
})

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

onMounted(() => {
  audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime
  })
})
const playPause = () => {
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play()
  }
  isPlaying.value = !isPlaying.value
}

const nextSong = () => {
  currentSongIndex.value = (currentSongIndex.value + 1) % playlist.value.length
}

const prevSong = () => {
  currentSongIndex.value =
    (currentSongIndex.value - 1 + playlist.value.length) % playlist.value.length
}

const onProgressChange = (value: number) => {
  audio.currentTime = value
  currentTime.value = value
}
</script>

<template>
  <div class="player">
    <div class="info">
      <div class="title">{{ currentSong.title }}</div>
      <div class="artist">{{ currentSong.artist }}</div>
    </div>
    <div class="controls">
      <NButton size="small" @click="prevSong">
        <NIcon><Pause /></NIcon>
      </NButton>
      <NButton size="small" @click="playPause">
        <NIcon v-if="isPlaying"><Pause /></NIcon>
        <NIcon v-else><Play /></NIcon>
      </NButton>
      <NButton size="small" @click="nextSong">
        <NIcon><Pause /></NIcon>
      </NButton>
    </div>
    <div class="progress">
      <span>{{ formatTime(currentTime) }}</span>
      <NSlider
        v-model:value="currentTime"
        :max="currentSong.duration"
        @update:value="onProgressChange"
      />
      <span>{{ formatTime(currentSong.duration) }}</span>
    </div>
    <div class="volume">
      <NIcon><Pause /></NIcon>
      <NSlider v-model:value="volume" :max="100" />
    </div>
  </div>
</template>

<style scoped>
.player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.info {
  flex: 1;
  margin-right: 20px;
}

.title {
  font-weight: bold;
}

.artist {
  color: gray;
  font-size: 0.9em;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 2;
}

.volume {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}
</style>
