export const getCurrentTimestamp = (): string => {
  const now = new Date()
  return now.toISOString()
}

export const getCurrentDay = (): string => {
  return new Date().toLocaleString('en-us', { weekday: 'long' })
}

export const formatTime = (timestamp: string | undefined): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
