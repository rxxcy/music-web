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
</template>

<script lang="ts" setup>
import { FlashOutline } from '@vicons/ionicons5'
import { onMounted, reactive, ref } from 'vue'
import {
  platform,
  search,
  type Platfrom,
  type SearchParams,
} from '~/api/source'

const platfroms = ref<Platfrom['platform'] | null>(null)
const params = reactive<SearchParams>({
  platform: 'kuwo',
  keyword: '',
  page: 1,
  limit: 10,
})

const handleGetSource = async () => {
  const res = await platform()
  platfroms.value = res.data.platform
}

const handleSearch = async () => {
  const res = await search(params)
}
onMounted(() => {
  handleGetSource()
})
</script>

<style scoped></style>
