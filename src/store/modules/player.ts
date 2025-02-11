import { defineStore } from 'pinia'
import type { MusicItem } from '~/interface/kuwo'

interface State {
  isShow: boolean
  isStop: boolean
  isPaused: boolean
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
    isStop: true,
    isPaused: false,
    playlist: [
      {
        id: '228908',
        name: '晴天',
        artists: '周杰伦',
        album: '叶惠美',
        duration: 269,
        albumpic:
          'https://img2.kuwo.cn/star/albumcover/120/s3s94/93/211513640.jpg',
        artistpic:
          'https://img2.kuwo.cn/star/albumcover/120/s4s22/47/783999746.png',
        quality: [
          { level: 'ff', bitrate: 2000, format: 'flac', size: '29.97Mb' },
          { level: 'p', bitrate: 320, format: 'mp3', size: '10.29Mb' },
          { level: 'h', bitrate: 128, format: 'mp3', size: '4.11Mb' },
          { level: 'h', bitrate: 100, format: 'ogg', size: '2.79Mb' },
          { level: 's', bitrate: 48, format: 'aac', size: '1.56Mb' },
        ],
        url: 'http://er.sycdn.kuwo.cn/4f84e1c8da1308b735fdf4f149a04fb9/67aafbb6/resource/30106/trackmedia/M5000039MnYb0qxYhV.mp3?bitrate$128&format$mp3&source$kwplayer_ar_5.1.0.0_B_jiakong_vh.apk&type$convert_url2',
      },
    ],
    currentIndex: 0,
    volume: 1,
    progress: 0,
    loopMode: 'all',
    audio: null,
  }),
  getters: {
    // 获取当前播放的歌曲
    currentSong: (state): MusicItem | null =>
      state.playlist[state.currentIndex] || null,
    volumeValue: (state): number => state.volume * 100,
  },
  actions: {
    initAudio() {
      this.isStop = false
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
        this.isPaused = false
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
        this.isPaused = true
      }
    },
    togglePlay() {
      if (this.isPaused) {
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
      console.log('🚀 ~ setVolume ~ value:', value)
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
