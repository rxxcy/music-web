import { defineStore } from 'pinia'

interface State {
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    token: '',
  }),
  actions: {
    setToken(token: string) {
      window.localStorage.setItem('token', token)
      this.token = token
    },
    clearToken() {
      window.localStorage.removeItem('token')
      this.token = null
    },
  },
})
