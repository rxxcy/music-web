import { createPinia, defineStore } from 'pinia'

export const pinia = createPinia()

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    isMenuCollapsed: false,
    disabledPicPreview: false,
  }),
  actions: {
    setIsLoading(value?: boolean) {
      if (value !== undefined) return (this.isLoading = value)
      this.isLoading = !this.isLoading
    },
    setIsMenuCollapsed(value: boolean) {
      window.localStorage.setItem('isMenuCollapsed', `${value}`)
      this.isMenuCollapsed = value
    },
    setDisabledPicPreview(value?: boolean) {
      if (value !== undefined) return (this.disabledPicPreview = value)
      this.disabledPicPreview = !this.disabledPicPreview
    },
  },
})
