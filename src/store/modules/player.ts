import { defineStore } from 'pinia'

interface State {
  isShow: boolean
  isPause: boolean
}

// interface MusicItem {}

export const usePlayerStore = defineStore('player', {
  state: (): State => ({
    isShow: true,
    isPause: false,
  }),
  actions: {
    play() {},
    pause() {},
  },
})
