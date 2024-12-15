<template>
  <DataTable :value="timeSheets" showGridlines tableStyle="min-width: 50rem">
    <Column field="day" header="Day Of Week"></Column>
    <Column field="timeStart" header="Shift Start">
      <template #body="{ data }">
        {{ formatTime(data.timeStart) }}
      </template>
    </Column>
    <Column field="timeEnd" header="Shift End">
      <template #body="{ data }">
        {{ formatTime(data.timeEnd) }}
      </template>
    </Column>
    <Column
      style="display: flex; align-items: center; justify-content: space-around"
      header="Actions"
    >
      <template #body="{ data }">
        <Button :disabled="!data.timeEnd" icon="pi pi-pencil" severity="warn" />
        <Button
          :disabled="!data.timeEnd"
          icon="pi pi-trash"
          severity="danger"
          @click="() => confirmDeleteEntry(data)"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog :visible="deleteEntryDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="selectedEntry"
        >Are you sure you want to delete record for <b>{{ selectedEntry.day }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text />
      <Button label="Yes" icon="pi pi-check" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { DataTable, Column, Button, Dialog } from 'primevue'
import { formatTime } from '@/utils/timeUtils'
import { ref, type PropType } from 'vue'

const deleteEntryDialog = ref(false)
const selectedEntry = ref({})

const confirmDeleteEntry = (data) => {
  selectedEntry.value = data
  deleteEntryDialog.value = true
}

defineProps({
  timeSheets: {
    type: Array as PropType<Array<{ day: string; timeStart: string; timeEnd?: string }>>,
    required: true,
  },
})
</script>
