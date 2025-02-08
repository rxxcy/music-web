<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <section>
      <img
        @click="handlerGetLoginQRCode"
        v-if="qrcode.unikey"
        class="block border border-solid border-gray-3 rounded-md w-150px h-150px"
        :src="qrcode.qrimg"
        alt="qrcode"
      />

      <div
        class="w-150px h-150px bg-gray-1 rounded-md flex items-center justify-center animate-pulse"
        v-else
      >
        加载中
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onDeactivated, onMounted, reactive, ref } from 'vue'
import {
  type LoginQrCodeResponse,
  getLoginQRCode,
  getQRcodeStatus,
} from '~/api/login'
import { router } from '~/router'
import { useUserStore } from '~/store/modules/user'

const store = useUserStore()
const times = ref<number>(0)
const timer = ref<any>(null)
const qrcode = reactive<LoginQrCodeResponse>({
  unikey: null,
  qrurl: '',
  qrimg: '',
})

const handlerGetQRcodeStatus = async () => {
  if (!qrcode.unikey) {
    return
  }
  const res = await getQRcodeStatus(qrcode.unikey)
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
  qrcode.unikey = null
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
  qrcode.unikey = res.data.unikey
  qrcode.qrurl = res.data.qrurl
  qrcode.qrimg = res.data.qrimg
}

onMounted(() => {
  handlerGetLoginQRCode()
})

onDeactivated(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style></style>
