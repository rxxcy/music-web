<template>
  <section class="w-full flex flex-col items-center justify-center">
    <n-radio-group v-model:value="params.platform" name="radiogroup">
      <n-space>
        <n-radio
          v-for="(item, key) in platfroms"
          :key="item"
          :disabled="item == 'qq'"
          :value="item"
        >
          {{ key }}
        </n-radio>
      </n-space>
    </n-radio-group>
    <div class="mt-2 w-350px">
      <n-input
        v-model:value="params.keyword"
        clearable
        placeholder="来点什么"
        @keydown.enter.prevent="handleSearch"
      >
        <template #prefix>
          <n-icon :component="FlashOutline" />
        </template>
      </n-input>
    </div>
  </section>
  <section class="mt-4">
    <n-spin :show="isLoading">
      <n-infinite-scroll
        style="height: calc(100vh - 170px)"
        :distance="10"
        @load="handleLoadMore"
      >
        <div class="space-y-1 w-4xl mx-auto">
          <song-item v-for="song in song.rows" :key="song.id" :song="song" />
        </div>
        <n-back-top :right="100" />
        <div v-if="isLoading" class="text-center py-2">加载中...</div>
        <div v-if="noMore" class="text-center py-2">没有更多了 🤪</div>
      </n-infinite-scroll>
    </n-spin>
  </section>
</template>

<script lang="ts" setup>
import SongItem from '~/layout/components/Song.vue'
import { FlashOutline } from '@vicons/ionicons5'
import { computed, onMounted, reactive, ref } from 'vue'
import {
  platform,
  search,
  type Platfrom,
  type SearchParams,
} from '~/api/source'
import type { MusicItem } from '~/iterface/kuwo'
import { useAppStore } from '~/store'

const appStore = useAppStore()
const isLoading = computed(() => appStore.isLoading)
const platfroms = ref<Platfrom['platform'] | null>(null)
const params = reactive<SearchParams>({
  platform: 'kuwo',
  keyword: 'mickaeljackson',
  page: 1,
  limit: 10,
})
const song = reactive<{ rows: MusicItem[]; total: number }>({
  rows: [
    {
      id: 551465,
      name: 'Beat It',
      artists: 'Michael Jackson',
      album: 'Thriller',
      duration: 258,
      albumpic: '120/s4s9/73/1297382326.png',
      artistpic: '120/s4s31/12/1873185431.png',
      quality: [
        {
          level: 'ff',
          bitrate: '2000',
          format: 'flac',
          size: '31.86Mb',
        },
        {
          level: 'p',
          bitrate: '320',
          format: 'mp3',
          size: '9.85Mb',
        },
        {
          level: 's',
          bitrate: '48',
          format: 'aac',
          size: '1.47Mb',
        },
        {
          level: 'p',
          bitrate: '192',
          format: 'ogg',
          size: '6.10Mb',
        },
        {
          level: 'h',
          bitrate: '100',
          format: 'ogg',
          size: '2.98Mb',
        },
        {
          level: 'h',
          bitrate: '128',
          format: 'mp3',
          size: '3.94Mb',
        },
      ],
    },
    {
      id: 26110997,
      name: 'Billie Jean',
      artists: 'Michael Jackson',
      album: "Number 1's: The Jacksons Story",
      duration: 294,
      albumpic: '120/80/39/57774942.jpg',
      artistpic: '120/s4s31/12/1873185431.png',
      quality: [
        {
          level: 'ff',
          bitrate: '2000',
          format: 'flac',
          size: '33.92Mb',
        },
        {
          level: 'p',
          bitrate: '320',
          format: 'mp3',
          size: '11.23Mb',
        },
        {
          level: 's',
          bitrate: '48',
          format: 'aac',
          size: '1.71Mb',
        },
        {
          level: 'p',
          bitrate: '192',
          format: 'ogg',
          size: '7.22Mb',
        },
        {
          level: 'h',
          bitrate: '100',
          format: 'ogg',
          size: '3.53Mb',
        },
        {
          level: 'h',
          bitrate: '128',
          format: 'mp3',
          size: '4.49Mb',
        },
      ],
    },
    {
      id: 57942955,
      name: 'We Are the World',
      artists: 'Michael Jackson',
      album: 'Michael Jackson: The Ultimate Collection',
      duration: 319,
      albumpic: '120/12/1/1762229336.jpg',
      artistpic: '120/s4s31/12/1873185431.png',
      quality: [
        {
          level: 's',
          bitrate: '48',
          format: 'aac',
          size: '1.83Mb',
        },
        {
          level: 'p',
          bitrate: '192',
          format: 'ogg',
          size: '6.32Mb',
        },
        {
          level: 'h',
          bitrate: '100',
          format: 'ogg',
          size: '3.44Mb',
        },
        {
          level: 'h',
          bitrate: '128',
          format: 'mp3',
          size: '4.88Mb',
        },
      ],
    },
    {
      id: 291105,
      name: 'Smooth Criminal-《月球漫步》电影主题曲',
      artists: 'Michael Jackson',
      album: 'Bad',
      duration: 260,
      albumpic: '120/14/54/3269925786.jpg',
      artistpic: '120/s4s31/12/1873185431.png',
      quality: [
        {
          level: 'ff',
          bitrate: '2000',
          format: 'flac',
          size: '28.86Mb',
        },
        {
          level: 'p',
          bitrate: '320',
          format: 'mp3',
          size: '9.92Mb',
        },
        {
          level: 's',
          bitrate: '48',
          format: 'aac',
          size: '1.51Mb',
        },
        {
          level: 'p',
          bitrate: '192',
          format: 'ogg',
          size: '5.96Mb',
        },
        {
          level: 'h',
          bitrate: '100',
          format: 'ogg',
          size: '3.07Mb',
        },
        {
          level: 'h',
          bitrate: '128',
          format: 'mp3',
          size: '3.96Mb',
        },
      ],
    },
    {
      id: 1024016,
      name: 'You Are Not Alone',
      artists: 'Michael Jackson',
      album: 'HIStory - PAST, PRESENT AND FUTURE - BOOK I (Explicit)',
      duration: 344,
      albumpic: '120/29/22/3558030235.jpg',
      artistpic: '120/s4s31/12/1873185431.png',
      quality: [
        {
          level: 'ff',
          bitrate: '2000',
          format: 'flac',
          size: '36.48Mb',
        },
        {
          level: 'p',
          bitrate: '320',
          format: 'mp3',
          size: '13.15Mb',
        },
        {
          level: 's',
          bitrate: '48',
          format: 'aac',
          size: '1.97Mb',
        },
        {
          level: 'h',
          bitrate: '100',
          format: 'ogg',
          size: '3.71Mb',
        },
        {
          level: 'h',
          bitrate: '128',
          format: 'mp3',
          size: '5.26Mb',
        },
      ],
    },
  ],
  total: 0,
})
const noMore = ref(false)
const handleLoadMore = () => {
  if (isLoading.value || noMore.value) return
  params.page++
  serachSong()
}
const handleGetSource = async () => {
  const res = await platform()
  platfroms.value = res.data.platform
}

const handleSearch = () => {
  params.page = 1
  noMore.value = false
  song.rows = []
  song.total = 0
  serachSong()
}

const serachSong = async () => {
  appStore.setIsLoading()
  const res = await search(params)
  const { rows, total } = res.data
  song.rows = [...song.rows, ...rows]
  song.total = total
  if (song.rows.length >= total) noMore.value = true
  appStore.setIsLoading()
}
onMounted(() => {
  handleGetSource()
})
</script>

<style scoped></style>
