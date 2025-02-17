<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <section class="cursor-pointer">
      <!-- <img
        @click="handlerGetLoginQRCode"
        v-if="unikey"
        class="block border border-solid border-gray-2 rounded-sm w-150px h-150px"
        :src="unikey"
        alt="qrcode"
      /> -->

      <n-qr-code
        v-if="unikey"
        @click="handlerGetLoginQRCode"
        class="block border border-solid border-gray-2 rounded-sm w-150px h-150px"
        :value="qrcode"
      />

      <div
        class="w-150px h-150px bg-gray-1 rounded-md flex items-center justify-center animate-pulse"
        v-else
      >
        加载中
      </div>
    </section>

    <div v-if="status" class="pos-fixed bottom-0 text-gray">
      {{ status }}
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, onMounted, ref } from 'vue'
import { getLoginQRCode, getQRcodeStatus } from '~/api/login'
import { router } from '~/router'
import { useUserStore } from '~/store/modules/user'

const store = useUserStore()
const times = ref<number>(0)
const timer = ref<any>(null)
const unikey = ref('')
const status = ref('')
const qrcode = computed(() => {
  const key = unikey.value
  if (!key) return
  return `https://music.163.com/login?codekey=${key}`
})

const handlerGetQRcodeStatus = async () => {
  if (!unikey.value) {
    return
  }
  const res = await getQRcodeStatus(unikey.value)
  status.value = res.data.message
  // 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功
  switch (res.data.code) {
    case 800:
      handlerGetLoginQRCode()
      break
    case 801:
      break
    case 802:
      break
    case 803:
      clearInterval(timer.value)
      store.setToken(res.data.token)
      router.push('/')
      break
    default:
  }
}

const handlerGetLoginQRCode = async () => {
  unikey.value = ''
  const res = await getLoginQRCode()

  if (timer.value) {
    clearInterval(timer.value)
  } else {
    timer.value = setInterval(() => {
      if (times.value >= 30) {
        times.value = 0
        clearInterval(timer.value)
        return
      }
      times.value++
      handlerGetQRcodeStatus()
    }, 3 * 1e3)
  }
  unikey.value = res.data.unikey
}

onMounted(() => {
  handlerGetLoginQRCode()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style></style>
