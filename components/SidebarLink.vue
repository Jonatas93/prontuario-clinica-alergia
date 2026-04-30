<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors"
    :class="isActive
      ? 'bg-primary-600 text-white'
      : 'text-slate-400 hover:text-white hover:bg-slate-800'"
    :title="collapsed ? label : undefined"
  >
    <slot />
    <Transition name="fade">
      <span v-if="!collapsed" class="truncate">{{ label }}</span>
    </Transition>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string
  label: string
  collapsed: boolean
}>()

const route = useRoute()
const isActive = computed(() => route.path === props.to || route.path.startsWith(props.to + '/'))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
