import { ref, computed } from 'vue'

export const useTimer = () => {
  const timer = ref(0)
  const intervalId = ref<number | null>(null)
  const isRunning = ref(false)

  const formattedTime = computed(() => {
    const hours = String(Math.floor(timer.value / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((timer.value % 3600) / 60)).padStart(2, '0')
    const seconds = String(timer.value % 60).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  })

  const startTimer = () => {
    if (!isRunning.value) {
      isRunning.value = true
      intervalId.value = setInterval(() => {
        timer.value++
      }, 1000)
    }
  }

  const stopTimer = () => {
    if (isRunning.value) {
      isRunning.value = false
      if (intervalId.value !== null) {
        clearInterval(intervalId.value)
        intervalId.value = null
        timer.value = 0
      }
    }
  }

  return { timer, isRunning, formattedTime, startTimer, stopTimer }
}
