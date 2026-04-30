<template>
  <header class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center gap-4 shrink-0">
    <button
      @click="$emit('toggle-sidebar')"
      class="btn-ghost p-2 md:hidden"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div class="flex-1">
      <h1 class="text-base font-semibold text-slate-800 dark:text-slate-100">{{ pageTitle }}</h1>
      <p class="text-xs text-slate-500 dark:text-slate-400">{{ formattedDate }}</p>
    </div>

    <div class="flex items-center gap-2">
      <!-- Theme toggle -->
      <button
        @click="toggleColorMode"
        class="btn-ghost p-2 rounded-lg"
        :title="colorMode.value === 'dark' ? 'Modo claro' : 'Modo escuro'"
      >
        <svg v-if="colorMode.value === 'dark'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

      <!-- New appointment quick btn -->
      <NuxtLink to="/appointments?new=1" class="btn-primary hidden sm:inline-flex">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agendar
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(['toggle-sidebar'])

const route = useRoute()
const colorMode = useColorMode()

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/patients': 'Pacientes',
  '/patients/new': 'Novo Paciente',
  '/appointments': 'Agendamentos'
}

const pageTitle = computed(() => {
  if (route.path.includes('/records/')) return 'Prontuário'
  if (route.path.match(/\/patients\/[^/]+\/edit/)) return 'Editar Paciente'
  if (route.path.match(/\/patients\/[^/]+/)) return 'Perfil do Paciente'
  return pageTitles[route.path] ?? 'AllergyMed'
})

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
})

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
