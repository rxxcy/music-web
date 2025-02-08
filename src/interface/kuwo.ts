export interface Quality {
  level: string
  bitrate: number
  format: string
  size: string
}

export interface MusicItem {
  id: number | string
  name: string
  artists: string
  album: string
  duration: number
  albumpic: string
  url: string
  artistpic?: string
  quality?: Quality[]
  lyrics?: string
}
