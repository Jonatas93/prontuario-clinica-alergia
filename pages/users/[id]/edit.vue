<template>
  <div class="max-w-3xl space-y-5">
    <div class="flex items-center gap-3">
      <NuxtLink to="/users" class="btn-ghost p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Editar Usuário</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ user?.name }}</p>
      </div>
    </div>

    <UserForm
      v-if="user"
      :initial-data="user"
      @submit="handleSubmit"
      @cancel="$router.push('/users')"
    />
    <div v-else class="card card-body text-center py-12 text-slate-400">Usuário não encontrado.</div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()
const notifications = useNotificationsStore()
const { canManageUsers } = usePermissions()

if (!canManageUsers.value) {
  await navigateTo('/dashboard')
}

const user = computed(() => usersStore.getById(route.params.id as string))

function handleSubmit(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  const updateData = data.password
    ? data
    : { ...data, password: user.value!.password }
  usersStore.update(route.params.id as string, updateData)
  notifications.success('Usuário atualizado!', 'As alterações foram salvas com sucesso.')
  router.push('/users')
}
</script>
