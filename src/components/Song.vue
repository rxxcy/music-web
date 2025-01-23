<template>
  <article class="flex gap-8 items-center py-2 px-4 rounded hover:bg-green-1">
    <n-image width="40" :src="albumpic" class="rounded" preview-disabled>
      <template #error>
        <n-icon :size="40" color="lightGrey">
          <ImageOutline />
        </n-icon>
      </template>
    </n-image>

    <h3 class="m-0 w-340px cursor-pointer">
      <n-ellipsis>
        {{ song.name }}
      </n-ellipsis>
    </h3>
    <n-ellipsis class="m-0 w-150px">
      {{ song.artists }}
    </n-ellipsis>

    <p class="m-0 text-coolGray">{{ duration }}</p>

    <n-flex justify="space-between" class="flex-1 flex-shrink-0">
      <n-button type="success" size="small" @click="handlePlay">试听</n-button>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button type="success" size="small" @click="handleTeleport">
            传送
          </n-button>
        </template>
        默认顶级音质：{{ song.quality[0].format }} {{ song.quality[0].size }}
      </n-tooltip>
      <n-dropdown
        trigger="click"
        :options="downloadOptions"
        @select="handleDownload"
      >
        <n-button type="info" size="small">下载</n-button>
      </n-dropdown>
    </n-flex>
  </article>
</template>
<script lang="ts" setup>
import { secondsToMinutesSeconds } from '~/utils/format'
import { ImageOutline } from '@vicons/ionicons5'
import { computed, toRefs } from 'vue'
import type { MusicItem } from '~/interface/kuwo'

const emit = defineEmits(['play', 'teleport', 'download'])

const imgHost = 'https://img2.kuwo.cn/star/albumcover/'
interface Props {
  song: MusicItem
}
const props = defineProps<Props>()
const { song } = toRefs(props)

const albumpic = computed(() => imgHost + song.value.albumpic)
const duration = computed(() => secondsToMinutesSeconds(song.value.duration))
const downloadOptions = computed(() => {
  return song.value.quality.map(item => {
    return {
      label: `${item.format}  ->  ${item.size}`,
      key: `${item.bitrate}${item.format}`,
    }
  })
})

const handlePlay = () => emit('play', song.value.id)
const handleTeleport = () => emit('teleport', song.value.id)
const handleDownload = (e: string) => emit('download', song.value.id, e)
</script>
