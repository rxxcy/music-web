<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
      :content-style="{
        height: '100vh',
      }"
    >
      <div class="flex flex-col">
        <div
          class="bg-white h-59px flex justify-center items-center overflow-hidden"
        >
          <a class="text-black decoration-none" href="/">
            <b>{{ collapsed ? 'FM' : 'FreeMusic' }}</b>
            <span class="hidden">自由的音乐</span>
          </a>
        </div>
        <n-scrollbar style="height: calc(100vh - 110px)">
          <n-menu
            v-model:value="activeKey"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-scrollbar>
        <div class="pt-2 bg-gray-1 h-43px">
          <user-info :collapsed="collapsed" />
        </div>
      </div>
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <app-header />
      </n-layout-header>
      <n-layout-content>
        <main class="p-3">
          <n-scrollbar style="max-height: calc(100vh - 300px)">
            <router-view />
          </n-scrollbar>
        </main>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import AppHeader from './components/Header.vue'
import UserInfo from './components/UserInfo.vue'
import { h, ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { BookOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
// import { router } from '~/router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookOutline),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookOutline),
  },
]

const activeKey = ref<string | null>(null)
const collapsed = ref(true)
</script>
