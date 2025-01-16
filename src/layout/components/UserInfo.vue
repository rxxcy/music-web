<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <div
      class="h-full flex items-center cursor-pointer overflow-hidden"
      :class="[collapsed ? 'justify-center' : 'px-7']"
    >
      <n-avatar
        round
        class="shrink-0"
        size="medium"
        :src="profile?.avatarUrl"
      />
      <template v-if="!collapsed">
        <n-ellipsis class="ml-2" style="max-width: 140px">
          {{ profile?.nickname }}
        </n-ellipsis>
      </template>
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { NAvatar, NText, useMessage } from 'naive-ui'
import { h, onMounted, toRefs, ref } from 'vue'
import type { Profile } from '~/api/user'
import { useUserStore } from '~/store/modules/user'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const { collapsed } = toRefs(props)
const profile = ref<Profile | null>(null)

const userStore = useUserStore()
onMounted(async () => {
  profile.value = await userStore.getProfile()
})

function renderCustomHeader() {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;',
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: profile.value?.avatarUrl,
      }),
      h('div', null, [
        h('div', null, [
          h(NText, { depth: 2 }, { default: () => profile.value?.nickname }),
        ]),
        h('div', { style: 'font-size: 12px;' }, [
          h(
            NText,
            { depth: 3 },
            { default: () => '毫无疑问,你是办公室最靓的吊毛' }
          ),
        ]),
      ]),
    ]
  )
}

const options = [
  {
    key: 'header',
    type: 'render',
    render: renderCustomHeader,
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: '设置',
    key: 'setting',
  },
  {
    label: '注销',
    key: 'logout',
  },
]
const message = useMessage()
const handleSelect = (key: string | number) => {
  message.info(String(key))
}
</script>
