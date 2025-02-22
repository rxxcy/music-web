import { axios } from '~/utils/axios'

export interface Account {
  id: number
  userName: string
  type: number
  status: number
  whitelistAuthority: number
  createTime: number
  tokenVersion: number
  ban: number
  baoyueVersion: number
  donateVersion: number
  vipType: number
  anonimousUser: boolean
  paidFee: boolean
}
export interface Profile {
  userId: number
  userType: number
  nickname: string
  avatarImgId: number
  avatarUrl: string
  backgroundImgId: number
  backgroundUrl: string
  signature: string
  createTime: number
  userName: string
  accountType: number
  shortUserName: string
  birthday: number
  authority: number
  gender: number
  accountStatus: number
  province: number
  city: number
  authStatus: number
  description?: any
  detailDescription?: any
  defaultAvatar: boolean
  expertTags?: any
  experts?: any
  djStatus: number
  locationStatus: number
  vipType: number
  followed: boolean
  mutual: boolean
  authenticated: boolean
  lastLoginTime: number
  lastLoginIP: string
  remarkName?: any
  viptypeVersion: number
  authenticationTypes: number
  avatarDetail?: any
  anchor: boolean
}

export const getAccountInfo = () => {
  return axios<{ account: Account; profile: Profile }>({
    url: '/v1/netease',
  })
}
