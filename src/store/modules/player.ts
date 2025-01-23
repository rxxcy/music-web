import { defineStore } from 'pinia'

interface State {
  isPause: boolean
}

// interface MusicItem {}

export const usePlayerStore = defineStore('player', {
  state: (): State => ({
    isPause: false,
  }),
  actions: {
    play() {},
    pause() {},
  },
})
