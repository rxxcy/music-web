import { axios } from '~/utils/axios'

export const downloadFileWithProgress = (fileUrl: string, fileName: string) => {
  axios
    .get(`/download?url=${encodeURIComponent(fileUrl)}&name=${fileName}`, {
      responseType: 'blob', // 指定返回的是二进制数据
      onDownloadProgress: (progressEvent) => {
        console.log('🚀 ~ .get ~ progressEvent:', progressEvent)
      },
    })
    .then((response) => {
      // 创建 Blob 对象并下载文件
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      // a.download = fileUrl.split('/').pop() // 设置下载文件名
      a.download = fileName // 设置下载文件名
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url) // 释放 URL
    })
    .catch((error) => {
      console.error('Download failed:', error)
    })
    .finally(() => {
      // 修改状态
    })
}
