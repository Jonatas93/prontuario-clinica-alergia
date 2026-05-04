<template>
  <div class="max-w-3xl space-y-5">
    <div class="flex items-center gap-3">
      <NuxtLink :to="`/patients/${route.params.id}`" class="btn-ghost p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Editar Paciente</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ patient?.name }}</p>
      </div>
    </div>

    <PatientForm
      v-if="patient"
      :initial-data="patient"
      @submit="handleSubmit"
      @cancel="$router.push(`/patients/${route.params.id}`)"
    />
    <div v-else class="card card-body text-center py-12 text-slate-400">Paciente não encontrado.</div>
  </div>
</template>

<script setup lang="ts">
import type { Patient } from '~/types'
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const patientsStore = usePatientsStore()
const notifications = useNotificationsStore()
const { canEditPatients } = usePermissions()

if (!canEditPatients.value) {
  await navigateTo(`/patients/${route.params.id}`)
}

const patient = computed(() => patientsStore.getById(route.params.id as string))

function handleSubmit(data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) {
  patientsStore.update(route.params.id as string, data)
  notifications.success('Dados atualizados!', 'As alterações foram salvas com sucesso.')
  router.push(`/patients/${route.params.id}`)
}
</script>
