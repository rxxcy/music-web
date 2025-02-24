export interface Quality {
  level: string
  bitrate: number
  format: string
  size: string
}

export interface MusicItem {
  id: number | string
  name: string
  artist: string
  album: string
  duration: number
  album_pic: string
  url: string
  artist_pic?: string
  quality: any
  lyrics?: string
}
