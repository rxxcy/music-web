<template>
  <header
    class="py-3 px-4 border-solid border-x-0 border-b border-t-0 border-slate-200"
  >
    <n-flex>
      <n-flex>
        <n-button
          strong
          secondary
          circle
          :type="disabledPicPreview ? 'default' : 'success'"
          @click="handleSetDisabledPicPreview"
        >
          <template #icon>
            <n-icon><ImageOutline /></n-icon>
          </template>
        </n-button>
        <n-button strong secondary circle>
          <template #icon>
            <n-icon><BowlingBallOutline /></n-icon>
          </template>
        </n-button>
      </n-flex>
    </n-flex>
  </header>
</template>

<script lang="ts" setup>
import { ImageOutline, BowlingBallOutline } from '@vicons/ionicons5'
import { computed } from 'vue'
import { useAppStore } from '~/store'
const appStore = useAppStore()
const disabledPicPreview = computed(() => appStore.disabledPicPreview)
const handleSetDisabledPicPreview = () => {
  window.$message.info(`${disabledPicPreview.value ? '开启' : '关闭'}封面预览`)
  appStore.setDisabledPicPreview()
}
</script>
