<template>
  <div class="card card-body flex items-center gap-4">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="bgColor">
      <!-- users -->
      <svg v-if="icon === 'users'" class="w-6 h-6" :class="iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <!-- calendar-day -->
      <svg v-else-if="icon === 'calendar-day'" class="w-6 h-6" :class="iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <!-- clock -->
      <svg v-else-if="icon === 'clock'" class="w-6 h-6" :class="iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <!-- document -->
      <svg v-else class="w-6 h-6" :class="iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    </div>
    <div>
      <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ value }}</p>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ title }}</p>
      <p class="text-xs text-slate-400 dark:text-slate-500">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  value: number
  icon: string
  color: 'blue' | 'green' | 'purple' | 'amber'
  subtitle?: string
}>()

const bgColor = computed(() => ({
  blue: 'bg-blue-100 dark:bg-blue-900/40',
  green: 'bg-green-100 dark:bg-green-900/40',
  purple: 'bg-purple-100 dark:bg-purple-900/40',
  amber: 'bg-amber-100 dark:bg-amber-900/40'
}[props.color]))

const iconColor = computed(() => ({
  blue: 'text-blue-600 dark:text-blue-400',
  green: 'text-green-600 dark:text-green-400',
  purple: 'text-purple-600 dark:text-purple-400',
  amber: 'text-amber-600 dark:text-amber-400'
}[props.color]))
</script>
