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
    {{ isShowPlayer }}
    <div class="mt-2 w-350px">
      <n-input
        v-model:value="params.keyword"
        clearable
        placeholder="来点什么"
        @keydown.enter.prevent="handleSearch"
        :loading="isLoading"
        ref="inputInstRef"
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
        :style="{ height: `calc(100vh - ${isShowPlayer ? '250' : '170'}px)` }"
        class="skkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
        :distance="10"
        @load="handleLoadMore"
      >
        <div class="space-y-1 w-4xl mx-auto">
          <song-item
            v-for="song in song.rows"
            :key="song.id"
            :song="song"
            :disabled-preview="disabledPicPreview"
            @play="handlePlay"
            @teleport="handleTeleport"
            @download="handleDownload"
          />
        </div>
        <n-back-top v-if="!isLoading" :right="100" :bottom="200" />
        <div v-if="isLoading" class="text-center py-2">加载中...</div>
        <div v-if="noMore" class="text-center py-2">没有更多了 🤪</div>
      </n-infinite-scroll>
    </n-spin>
  </section>
</template>

<script lang="ts" setup>
import type { InputInst } from 'naive-ui'
import SongItem from '~/components/song.vue'
import { FlashOutline } from '@vicons/ionicons5'
import { computed, onMounted, reactive, ref } from 'vue'
import {
  platform,
  search,
  url,
  type Platfrom,
  type SearchParams,
} from '~/api/source'
import type { MusicItem } from '~/interface/kuwo'
import { useAppStore } from '~/store'
import { usePlayerStore } from '~/store/modules/player'

const inputInstRef = ref<InputInst | null>(null)
const playerStore = usePlayerStore()
const appStore = useAppStore()
const disabledPicPreview = computed(() => appStore.disabledPicPreview)
const isShowPlayer = computed(() => playerStore.isShow)
const isLoading = computed(() => appStore.isLoading)
const platfroms = ref<Platfrom['platform'] | null>(null)
const params = reactive<SearchParams>({
  platform: 'kuwo',
  keyword: '李荣浩',
  page: 1,
  limit: 30,
})
const song = reactive<{ rows: MusicItem[]; total: number }>({
  rows: [],
  total: 0,
})
const noMore = ref(false)

onMounted(() => {
  inputInstRef.value?.focus()
})
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

const handlePlay = async (id: number, quality: string) => {
  appStore.setIsLoading()
  const res = await url({ platform: params.platform, id, quality })
  const { url: songUrl } = res.data
  if (songUrl) {
    // window.open(songUrl, '_blank')
    console.log(songUrl)
  }
  appStore.setIsLoading()
}

const handleTeleport = (id: number) => {
  console.log('🚀 ~ handleTeleport ~ id:', id)
}

const handleDownload = async (id: number, quality: string) => {
  appStore.setIsLoading()
  const res = await url({ platform: params.platform, id, quality })
  const { url: songUrl } = res.data
  if (songUrl) {
    window.open(songUrl, '_blank')
  }
  appStore.setIsLoading()
}

onMounted(() => {
  handleGetSource()
})
</script>

<style scoped></style>
