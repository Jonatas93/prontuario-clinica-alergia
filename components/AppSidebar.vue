<template>
  <aside
    class="flex flex-col bg-slate-900 text-white transition-all duration-300 shrink-0"
    :class="collapsed ? 'w-16' : 'w-64'"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50">
      <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <Transition name="fade">
        <div v-if="!collapsed" class="overflow-hidden">
          <p class="font-bold text-sm leading-tight">AllergyMed</p>
          <p class="text-slate-400 text-xs">Prontuário Eletrônico</p>
        </div>
      </Transition>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-4 space-y-1 px-2">
      <SidebarLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :label="item.label"
        :collapsed="collapsed"
      >
        <component :is="item.icon" class="w-5 h-5 shrink-0" />
      </SidebarLink>
    </nav>

    <!-- User + toggle -->
    <div class="border-t border-slate-700/50 p-3 space-y-2">
      <button
        @click="$emit('toggle')"
        class="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm"
        :title="collapsed ? 'Expandir menu' : 'Recolher menu'"
      >
        <svg class="w-5 h-5 shrink-0 transition-transform" :class="collapsed ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <Transition name="fade">
          <span v-if="!collapsed">Recolher</span>
        </Transition>
      </button>

      <div v-if="auth.user" class="flex items-center gap-3 px-2 py-2">
        <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm font-bold shrink-0">
          {{ initials }}
        </div>
        <Transition name="fade">
          <div v-if="!collapsed" class="overflow-hidden min-w-0">
            <p class="text-sm font-medium truncate">{{ auth.user.name }}</p>
            <p class="text-xs text-slate-400 truncate">{{ auth.user.role }}</p>
          </div>
        </Transition>
      </div>

      <button
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors text-sm"
        title="Sair"
      >
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <Transition name="fade">
          <span v-if="!collapsed">Sair</span>
        </Transition>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{ collapsed: boolean }>()
defineEmits(['toggle'])

const auth = useAuthStore()
const router = useRouter()

const initials = computed(() => {
  if (!auth.user) return '?'
  return auth.user.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
})

function handleLogout() {
  auth.logout()
  router.push('/login')
}

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: defineComponent({
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2',
          d: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z' })
      ])
    })
  },
  {
    to: '/patients',
    label: 'Pacientes',
    icon: defineComponent({
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2',
          d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' })
      ])
    })
  },
  {
    to: '/appointments',
    label: 'Agendamentos',
    icon: defineComponent({
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2',
          d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
      ])
    })
  }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s, width 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
