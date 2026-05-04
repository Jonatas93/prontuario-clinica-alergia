<template>
  <div class="max-w-3xl space-y-5">
    <div class="flex items-center gap-3">
      <NuxtLink to="/patients" class="btn-ghost p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Novo Paciente</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Preencha os dados do paciente</p>
      </div>
    </div>

    <PatientForm @submit="handleSubmit" @cancel="$router.push('/patients')" />
  </div>
</template>

<script setup lang="ts">
import type { Patient } from '~/types'
definePageMeta({ middleware: 'auth' })

const patientsStore = usePatientsStore()
const notifications = useNotificationsStore()
const router = useRouter()
const { canEditPatients } = usePermissions()

if (!canEditPatients.value) {
  await navigateTo('/patients')
}

function handleSubmit(data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) {
  const patient = patientsStore.add(data)
  notifications.success('Paciente cadastrado!', `${patient.name} foi adicionado com sucesso.`)
  router.push(`/patients/${patient.id}`)
}
</script>
