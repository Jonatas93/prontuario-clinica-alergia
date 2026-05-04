<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Usuários</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ usersStore.users.length }} usuário(s) cadastrado(s)
        </p>
      </div>
      <NuxtLink to="/users/new" class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Novo Usuário
      </NuxtLink>
    </div>

    <!-- Search -->
    <div class="card card-body py-3">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nome ou usuário..."
          class="input pl-9"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Profissional</th>
            <th>Usuário</th>
            <th class="hidden md:table-cell">Perfil</th>
            <th class="hidden lg:table-cell">Registro</th>
            <th>Status</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="results.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 dark:text-slate-500">
              <svg class="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <p>Nenhum usuário encontrado.</p>
            </td>
          </tr>
          <tr v-for="user in results" :key="user.id">
            <td>
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                  :class="roleColors[user.role].avatar">
                  {{ initials(user.name) }}
                </div>
                <div>
                  <p class="font-medium text-slate-900 dark:text-slate-100">{{ user.name }}</p>
                  <p class="text-xs text-slate-400">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="font-mono text-xs text-slate-600 dark:text-slate-300">{{ user.username }}</td>
            <td class="hidden md:table-cell">
              <span class="px-2 py-0.5 rounded-full text-xs font-medium" :class="roleColors[user.role].badge">
                {{ roleLabels[user.role] }}
              </span>
            </td>
            <td class="hidden lg:table-cell text-xs text-slate-400">
              {{ user.crm || user.coren || '—' }}
            </td>
            <td>
              <span class="px-2 py-0.5 rounded-full text-xs font-medium"
                :class="user.status === 'ativo'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'">
                {{ user.status === 'ativo' ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td>
              <div class="flex items-center justify-end gap-2">
                <NuxtLink :to="`/users/${user.id}/edit`" class="btn-ghost px-2 py-1 text-xs">
                  Editar
                </NuxtLink>
                <button
                  v-if="user.id !== authStore.user?.id"
                  @click="confirmDelete(user)"
                  class="btn-ghost px-2 py-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Remover
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete confirm modal -->
    <AppModal v-model="showDeleteModal" title="Remover Usuário" size="sm">
      <p class="text-slate-600 dark:text-slate-300 text-sm">
        Deseja realmente remover o usuário
        <strong class="text-slate-900 dark:text-slate-100">{{ userToDelete?.name }}</strong>?
        Esta ação não pode ser desfeita.
      </p>
      <template #footer>
        <button class="btn-secondary" @click="showDeleteModal = false">Cancelar</button>
        <button class="btn-danger" @click="doDelete">Remover</button>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import type { User, UserRole } from '~/types'
definePageMeta({ middleware: 'auth' })

const usersStore = useUsersStore()
const authStore = useAuthStore()
const notifications = useNotificationsStore()
const { canManageUsers } = usePermissions()

if (!canManageUsers.value) {
  await navigateTo('/dashboard')
}

const searchQuery = ref('')
const results = computed(() => usersStore.search(searchQuery.value))

const showDeleteModal = ref(false)
const userToDelete = ref<User | null>(null)

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrador',
  medico: 'Médico',
  enfermeiro: 'Enfermeiro'
}

const roleColors: Record<UserRole, { avatar: string; badge: string }> = {
  admin: {
    avatar: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
  },
  medico: {
    avatar: 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300',
    badge: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
  },
  enfermeiro: {
    avatar: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
  }
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function confirmDelete(user: User) {
  userToDelete.value = user
  showDeleteModal.value = true
}

function doDelete() {
  if (!userToDelete.value) return
  usersStore.remove(userToDelete.value.id)
  notifications.success('Usuário removido', `${userToDelete.value.name} foi removido do sistema.`)
  showDeleteModal.value = false
  userToDelete.value = null
}
</script>
