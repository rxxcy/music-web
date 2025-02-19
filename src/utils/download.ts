export const downloadFile = (fileUrl: string, fileName: string) => {
  fetch(
    `http://localhost:3090/download?url=${encodeURIComponent(
      fileUrl
    )}&name=${fileName}`
  )
    .then((res) => res.blob())
    .then((blob) => {
      let url = window.URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    })
}
