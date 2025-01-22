<template>
  <article class="flex items-center py-2 px-4 rounded hover:bg-green-1">
    <n-image width="50" :src="albumpic" class="rounded" preview-disabled>
      <template #error>
        <n-icon :size="50" color="lightGrey">
          <ImageOutline />
        </n-icon>
      </template>
    </n-image>

    <h3 class="m-0">{{ song.name }}</h3>
    <p class="m-0">{{ song.artists }}</p>
    <p class="m-0">{{ duration }}</p>
    <n-space class="">
      <n-button type="success" size="small">
        {{ song.quality[0].format }}
      </n-button>
    </n-space>
  </article>
</template>
<script lang="ts" setup>
import { secondsToMinutesSeconds } from '~/utils/format'
import { ImageOutline } from '@vicons/ionicons5'
import { computed, toRefs } from 'vue'
import type { MusicItem } from '~/iterface/kuwo'

const imgHost = 'https://img2.kuwo.cn/star/albumcover/'
interface Props {
  song: MusicItem
}
const props = defineProps<Props>()
const { song } = toRefs(props)

const albumpic = computed(() => imgHost + song.value.albumpic)
const duration = computed(() => secondsToMinutesSeconds(song.value.duration))
</script>
