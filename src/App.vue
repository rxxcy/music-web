<script setup lang="ts">
import { onMounted } from 'vue'
import NProvider from '~/components/provider/AppProvider.vue'
import { useUserStore } from './store/modules/user'

onMounted(() => {
  const token = localStorage.getItem('token')
  const stoer = useUserStore()
  if (token) stoer.setToken(token)
})
</script>

<template>
  <!-- <keep-alive> -->
  <n-provider>
    <router-view />
  </n-provider>
  <!-- </keep-alive> -->
</template>

<style></style>
