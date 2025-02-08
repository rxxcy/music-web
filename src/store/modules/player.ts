import { defineStore } from 'pinia'
import type { MusicItem } from '~/interface/kuwo'

interface State {
  isShow: boolean
  isPause: boolean
  playlist: MusicItem[]
  currentIndex: number
  volume: number
  progress: number
  loopMode: 'none' | 'single' | 'all'
  audio: HTMLAudioElement | null
}

export const usePlayerStore = defineStore('player', {
  state: (): State => ({
    isShow: true,
    isPause: false,
    playlist: [
      {
        id: '71743',
        name: '我是真的爱上你',
        artists: '王杰',
        album: '爱与梦',
        duration: 302,
        albumpic: '120/s4s92/92/2381711760.jpg',
        artistpic: '120/s4s79/6/3934255369.png',
        quality: [
          { level: 'ff', bitrate: 2000, format: 'flac', size: '31.16Mb' },
          { level: 'p', bitrate: 320, format: 'mp3', size: '11.54Mb' },
          { level: 'h', bitrate: 128, format: 'mp3', size: '4.61Mb' },
          { level: 's', bitrate: 48, format: 'aac', size: '1.73Mb' },
        ],
        url: 'http://li.sycdn.kuwo.cn/3644326eed6e584e92d4bf0ab6f43f37/67a71fda/resource/n2/79/34/1108461270.mp3?bitrate$320&format$mp3&source$kwplayer_ar_5.1.0.0_B_jiakong_vh.apk&type$convert_url2',
      },
    ],
    currentIndex: 0,
    volume: 1,
    progress: 0,
    loopMode: 'none',
    audio: null,
  }),
  actions: {
    initAudio() {
      if (!this.audio) {
        this.audio = new Audio()
        this.audio.ontimeupdate = () => {
          if (this.audio && this.audio.duration) {
            this.progress = (this.audio.currentTime / this.audio.duration) * 100
          }
        }
        this.audio.onended = () => {
          if (this.loopMode === 'single') {
            this.audio?.play()
          } else {
            this.nextSong()
          }
        }
      }
    },
    play() {
      this.initAudio()
      if (this.audio) {
        this.audio.src = this.playlist[this.currentIndex]?.url || ''
        this.audio.play()
        this.isPause = false
        this.audio.ontimeupdate = () => {
          if (this.audio && this.audio.duration) {
            this.progress = (this.audio.currentTime / this.audio.duration) * 100
          }
        }
      }
    },
    playSongAtIndex(index: number) {
      if (index >= 0 && index < this.playlist.length) {
        this.currentIndex = index
        this.play()
      }
    },
    pause() {
      if (this.audio) {
        this.audio.pause()
        this.isPause = true
      }
    },
    togglePlay() {
      if (this.isPause) {
        this.play()
      } else {
        this.pause()
      }
    },
    nextSong() {
      if (this.playlist.length === 0) return
      if (this.currentIndex < this.playlist.length - 1) {
        this.currentIndex++
      } else if (this.loopMode === 'all') {
        this.currentIndex = 0
      }
      this.play()
    },
    prevSong() {
      if (this.playlist.length === 0) return
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
      this.play()
    },
    seekTo(time: number) {
      if (this.audio && this.audio.duration) {
        this.audio.currentTime = time
        this.progress = (time / this.audio.duration) * 100
      }
    },
    setProgress(value: number) {
      if (this.audio && this.audio.duration) {
        const newTime = (value / 100) * this.audio.duration
        this.audio.currentTime = newTime
        this.progress = value
      }
    },
    setVolume(value: number) {
      if (this.audio) {
        this.audio.volume = value
        this.volume = value
      }
    },
    toggleLoopMode() {
      this.loopMode =
        this.loopMode === 'none'
          ? 'single'
          : this.loopMode === 'single'
          ? 'all'
          : 'none'
    },
    addToPlaylist(song: MusicItem) {
      this.playlist.push(song)
      this.playSongAtIndex(this.playlist.length - 1)
    },
    removeFromPlaylist(id: number) {
      this.playlist = this.playlist.filter((song) => song.id !== id)
    },
    getCurrentSong(): MusicItem | null {
      return this.playlist[this.currentIndex] || null
    },
  },
})
