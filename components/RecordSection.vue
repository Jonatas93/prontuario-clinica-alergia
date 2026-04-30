<template>
  <div>
    <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{{ title }}</p>
    <p class="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; content: string }>()
</script>
