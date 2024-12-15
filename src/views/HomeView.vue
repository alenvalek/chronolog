<script setup lang="ts">
import { Button } from 'primevue'
import { getCurrentDay, getCurrentTimestamp } from '@/utils/timeUtils'
import TimeSheetTable from '@/components/TimeSheetDataTable.vue'
import { ref } from 'vue'
import { useTimer } from '@/composables/useTImer'
import { useToast } from 'primevue/usetoast'

const { isRunning, formattedTime, startTimer, stopTimer } = useTimer()
const toast = useToast()

const timeSheets = ref<Array<{ day: string; timeStart: string; timeEnd?: string }>>([])

const handleStartTimer = () => {
  const day = getCurrentDay()

  if (timeSheets.value.some((sheet) => sheet.day === day)) {
    toast.add({ severity: 'error', detail: "Can't log in the same day twice.", summary: 'Error' })

    return
  }

  timeSheets.value.push({
    day,
    timeStart: getCurrentTimestamp(),
  })

  startTimer()
}

const handleStopTimer = () => {
  const day = getCurrentDay()
  const existingDay = timeSheets.value.find((sheet) => sheet.day === day)

  if (existingDay) {
    existingDay.timeEnd = getCurrentTimestamp()
  }

  stopTimer()
}
</script>

<template>
  <main class="container">
    <h3>{{ formattedTime }}</h3>
    <div class="container--actions">
      <Button severity="info" icon="pi pi-clock" @click="handleStartTimer" :disabled="isRunning" />
      <Button severity="danger" icon="pi pi-stop" @click="handleStopTimer" :disabled="!isRunning" />
    </div>
    <h3 v-if="!timeSheets.length">No data for this week...</h3>
    <TimeSheetTable :timeSheets="timeSheets" v-else />
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.container--actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
