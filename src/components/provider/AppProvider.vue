<template>
  <n-config-provider :theme="theeme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <ContextHolder />
            <slot></slot>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { createTextVNode, defineComponent } from 'vue'
import {
  darkTheme,
  lightTheme,
  useLoadingBar,
  useDialog,
  useMessage,
  useNotification,
} from 'naive-ui'
const theeme = false ? darkTheme : lightTheme

const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup() {
    function register() {
      window.$loadingBar = useLoadingBar()
      window.$dialog = useDialog()
      window.$message = useMessage()
      window.$notification = useNotification()
    }

    register()

    return () => createTextVNode()
  },
})
</script>

<style scoped></style>
