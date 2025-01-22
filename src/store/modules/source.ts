import { defineStore } from 'pinia'
import { platform } from '~/api/source'

interface State {
  platform: []
}

export const useSourceStore = defineStore('source', {
  state: (): State => ({
    platform: [],
  }),
  actions: {
    async platform() {
      if (this.platform && this.platform.length > 0) return this.platform
      const res = await platform()
      console.log('🚀 ~ platform ~ res:', res)

      return []
    },
  },
})
