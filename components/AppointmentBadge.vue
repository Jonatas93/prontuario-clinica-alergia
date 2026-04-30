<template>
  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" :class="styles[status]">
    <span class="w-1.5 h-1.5 rounded-full" :class="dotStyles[status]"></span>
    {{ labels[status] }}
  </span>
</template>

<script setup lang="ts">
import type { AppointmentStatus } from '~/types'
defineProps<{ status: AppointmentStatus }>()

const labels: Record<AppointmentStatus, string> = {
  scheduled: 'Agendado',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
  completed: 'Realizado'
}

const styles: Record<AppointmentStatus, string> = {
  scheduled: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  confirmed: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  completed: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
}

const dotStyles: Record<AppointmentStatus, string> = {
  scheduled: 'bg-blue-500',
  confirmed: 'bg-green-500',
  cancelled: 'bg-red-500',
  completed: 'bg-slate-400'
}
</script>
