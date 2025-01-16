import { defineStore } from 'pinia'
import { getSources as ApiGetSources } from '~/api/source'

interface State {
  sources: []
}

export const useSourceStore = defineStore('source', {
  state: (): State => ({
    sources: [],
  }),
  actions: {
    async getSources() {
      if (this.sources && this.sources.length > 0) return this.sources
      const res = await ApiGetSources()
      console.log('🚀 ~ getSources ~ res:', res)
      return []
    },
  },
})
