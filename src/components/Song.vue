<template>
  <article class="flex gap-8 items-center py-2 px-4 rounded hover:bg-green-1">
    <n-image
      width="40"
      :src="song.album_pic"
      class="rounded h-40px"
      object-fit="cover"
      :preview-disabled="disabledPreview"
    >
      <template #error>
        <n-icon :size="40" color="lightGrey">
          <ImageOutline />
        </n-icon>
      </template>
    </n-image>

    <!-- <h3 class="m-0 w-340px cursor-pointer" @click="handlePlay"> -->
    <h3 class="m-0 cursor-pointer" @click="handlePlay">
      <n-ellipsis>
        {{ song.name }}
      </n-ellipsis>
    </h3>
    <!-- <n-ellipsis class="m-0 w-150px"> -->
    <n-ellipsis class="m-0">
      {{ song.artist }}
    </n-ellipsis>

    <p class="m-0 text-coolGray">{{ duration }}</p>

    <n-flex
      v-if="qualitys"
      justify="space-between"
      class="flex-1 flex-shrink-0"
    >
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button type="info" size="small" tertiary @click="handleTeleport">
            上传
          </n-button>
        </template>
        默认顶级音质：{{ qualitys[0].format }} {{ qualitys[0].size }}
      </n-tooltip>
      <n-button type="success" size="small" tertiary @click="handlePlay"
        >试听
      </n-button>

      <n-dropdown
        trigger="click"
        :options="downloadOptions"
        @select="handleDownload"
      >
        <n-button type="warning" tertiary size="small">下载</n-button>
      </n-dropdown>
    </n-flex>
    <div v-else class="select-none text-gray">暂无音源</div>
  </article>
</template>
<script lang="ts" setup>
import { secondsToMinutesSeconds } from '~/utils/format'
import { ImageOutline } from '@vicons/ionicons5'
import { computed, toRefs } from 'vue'
import type { MusicItem } from '~/interface/kuwo'

const emit = defineEmits(['play', 'teleport', 'download'])

interface Props {
  song: MusicItem
  disabledPreview?: boolean
}
const props = defineProps<Props>()
const { song, disabledPreview } = toRefs(props)

const duration = computed(() => secondsToMinutesSeconds(song.value.duration))
const qualitys = computed(() => {
  const qs = parseQuality(song.value.quality)
  return qs!.sort((a, b) => b.bitrate - a.bitrate)
})
const downloadOptions = computed(() => {
  return qualitys.value?.map((item) => {
    return {
      label: `${item.format}: ${item.size}`,
      key: `${item.bitrate}${item.format}`,
    }
  })
})

const parseQuality = (str: string): { [key: string]: any }[] => {
  return str.split(';').map((item) => {
    const obj: { [key: string]: any } = {}
    item.split(',').forEach((pair) => {
      const [key, value] = pair.split(':')
      obj[key] = value
    })
    return obj
  })
}

const handlePlay = () => emit('play', song.value, '128mp3')
const handleTeleport = () =>
  emit('teleport', { ...song.value, quality: qualitys.value })
const handleDownload = (e: string) => emit('download', song.value, e)
</script>
