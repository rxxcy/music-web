<template>
  <n-space>
    <n-button>来电东西</n-button>
    <n-button type="tertiary">Tertiary</n-button>
    <n-button type="primary">Primary</n-button>
    <n-button type="info">Info</n-button>
    <n-button type="success">Success</n-button>
    <n-button type="warning">Warning</n-button>
    <n-button type="error">Error</n-button>
  </n-space>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { getAccountInfo } from '~/api/user'

onMounted(() => {
  getAccountInfo().then(res => {
    console.log(res)
  })
})
</script>

<style scoped></style>
