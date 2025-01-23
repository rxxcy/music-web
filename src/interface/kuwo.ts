export interface Quality {
  level: string
  bitrate: string
  format: string
  size: string
}

export interface MusicItem {
  id: number
  name: string
  artists: string
  album: string
  duration: number
  albumpic: string
  artistpic: string
  quality: Quality[]
}
