<script setup lang="ts">
import { onMounted } from 'vue'
import NProvider from '~/components/provider/AppProvider.vue'
import { useUserStore } from './store/modules/user'
// import { io } from 'socket.io-client'

onMounted(() => {
  const token = localStorage.getItem('token')
  const stoer = useUserStore()
  if (token) stoer.setToken(token)
})

// // 连接到服务器
// const socket = io('http://localhost:3090')

// // 监听连接成功事件
// socket.on('connect', () => {
//   console.log(`Connected with ID: ${socket.id}`)
// })

// // 发送消息
// socket.emit('message', { message: 'Hello, Server!' })

// // 接收服务器消息
// socket.on('message', (data) => {
//   console.log(`Message from server: ${data.message}`)
// })

// // 监听断开连接
// socket.on('disconnect', () => {
//   console.log('Disconnected from server')
// })
</script>

<template>
  <!-- <keep-alive> -->
  <n-provider>
    <router-view />
  </n-provider>
  <!-- </keep-alive> -->
</template>

<style></style>
