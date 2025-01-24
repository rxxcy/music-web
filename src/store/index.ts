import { createPinia, defineStore } from 'pinia'

export const pinia = createPinia()

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    disabledPicPreview: false,
  }),
  actions: {
    setIsLoading(value?: boolean) {
      if (value !== undefined) return (this.isLoading = value)
      this.isLoading = !this.isLoading
    },
    setDisabledPicPreview(value?: boolean) {
      if (value !== undefined) return (this.disabledPicPreview = value)
      this.disabledPicPreview = !this.disabledPicPreview
    },
  },
})
