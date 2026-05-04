<template>
  <div class="max-w-3xl space-y-5">
    <div class="flex items-center gap-3">
      <NuxtLink to="/users" class="btn-ghost p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Novo Usuário</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Cadastre um médico ou enfermeiro</p>
      </div>
    </div>

    <UserForm @submit="handleSubmit" @cancel="$router.push('/users')" />
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'
definePageMeta({ middleware: 'auth' })

const usersStore = useUsersStore()
const notifications = useNotificationsStore()
const router = useRouter()
const { canManageUsers } = usePermissions()

if (!canManageUsers.value) {
  await navigateTo('/dashboard')
}

function handleSubmit(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  const user = usersStore.add(data)
  notifications.success('Usuário cadastrado!', `${user.name} foi adicionado com sucesso.`)
  router.push('/users')
}
</script>
