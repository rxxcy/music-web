import { defineStore } from 'pinia'
import { isNotEmptyObject } from '~/utils/is'
import { getAccountInfo, type Account, type Profile } from '~/api/user'

interface State {
  token: string | null
  account: Account | null
  profile: Profile | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    token: '',
    account: null,
    profile: null,
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

    async getAccount() {
      if (!isNotEmptyObject(this.account)) {
        const res = await getAccountInfo()
        const { account, profile } = res.data
        this.account = account
        this.profile = profile
      }
      return this.account
    },

    async getProfile() {
      if (!isNotEmptyObject(this.account)) {
        const res = await getAccountInfo()
        const { account, profile } = res.data
        this.account = account
        this.profile = profile
      }
      return this.profile
    },
  },
})
