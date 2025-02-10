import { axios } from '~/utils/axios'

export interface LoginQrCodeResponse {
  unikey: string | null
  qrurl: string
  qrimg: string
}

export const getLoginQRCode = () => {
  return axios<LoginQrCodeResponse>({
    url: '/auth/qrcode',
  })
}

export interface LoginStatusResponse {
  code: number
  token: string
  message: string
}
export const getQRcodeStatus = (key: string) => {
  return axios<LoginStatusResponse>({
    url: '/auth/check',
    params: {
      key,
    },
  })
}
