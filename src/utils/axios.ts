import Axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios'
import { router } from '~/router'
import { pinia } from '~/store'
import { useAppStore } from '~/store'

enum HTTP_STATUS {
  UNAUTHORIZED = 401,
}

export const axios = Axios.create({
  baseURL: 'http://localhost:3090',
  timeout: 20 * 1e3,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface BaseResponse<T> {
  data: T
  code: number
  message?: string
}

// 请求拦截器
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {}
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error: AxiosError) => {
    // 处理请求错误
    useAppStore(pinia).setIsLoading(false)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 在响应返回前做一些处理，例如统一处理错误码
    return response.data
    //  return {
    //     data: response.data,
    //     status: response.status,
    //   }
  },
  (error: AxiosError) => {
    // 处理响应错误
    const appSatore = useAppStore(pinia)
    appSatore.setIsLoading(false)
    const has = appSatore.isHasSingleDialog
    const data = error.response?.data as { code: number; message: string }
    switch (data.code) {
      case HTTP_STATUS.UNAUTHORIZED:
        if (has) return
        appSatore.setIsHasSingleDialog(true)
        window?.$dialog.warning({
          title: '警告',
          content: '未登录或登录失效,即将跳转到登录页面。',
          positiveText: '好',
          negativeText: '不',
          draggable: true,
          onPositiveClick: () => {
            appSatore.setIsHasSingleDialog(false)
            window.localStorage.removeItem('token')
            router.push({ name: 'login' })
          },
          onNegativeClick: () => {
            appSatore.setIsHasSingleDialog(false)
            window.$message.info('取消跳转')
          },
        })
    }
    return Promise.reject(error)
  }
)
