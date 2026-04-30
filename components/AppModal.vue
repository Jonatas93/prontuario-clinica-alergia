<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('update:modelValue', false)" />
        <div
          class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-h-[90vh] flex flex-col"
          :class="sizeClass"
        >
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
            <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">{{ title }}</h2>
            <button
              @click="$emit('update:modelValue', false)"
              class="btn-ghost p-1 rounded-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="overflow-y-auto flex-1 px-6 py-4">
            <slot />
          </div>
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 shrink-0">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()
defineEmits(['update:modelValue'])

const sizeClass = computed(() => ({
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}[props.size ?? 'md']))
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .relative, .modal-leave-active .relative { transition: transform 0.2s; }
.modal-enter-from .relative, .modal-leave-to .relative { transform: scale(0.95); }
</style>
