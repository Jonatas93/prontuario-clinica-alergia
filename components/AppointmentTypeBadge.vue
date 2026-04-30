<template>
  <span class="inline-flex px-2 py-0.5 rounded text-xs font-medium" :class="styles[type]">
    {{ labels[type] }}
  </span>
</template>

<script setup lang="ts">
import type { AppointmentType } from '~/types'
defineProps<{ type: AppointmentType }>()

const labels: Record<AppointmentType, string> = {
  consultation: 'Consulta',
  return: 'Retorno',
  exam: 'Exame',
  procedure: 'Procedimento'
}

const styles: Record<AppointmentType, string> = {
  consultation: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  return: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  exam: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  procedure: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
}
</script>
