<script setup lang="ts">
import { onMounted } from 'vue'
import NProvider from '~/components/provider/AppProvider.vue'
import { useUserStore } from './store/modules/user'

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) useUserStore().setToken(token)
})
</script>

<template>
  <n-provider>
    <router-view />
  </n-provider>
</template>

<style></style>
