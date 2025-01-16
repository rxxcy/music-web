export const isNotEmptyObject = (value: unknown): value is object => {
  return (
    typeof value === 'object' && value !== null && Object.keys(value).length > 0
  )
}
