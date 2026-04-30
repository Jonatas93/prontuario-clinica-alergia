<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Pacientes</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ patientsStore.patients.length }} paciente(s) cadastrado(s)
        </p>
      </div>
      <NuxtLink to="/patients/new" class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Novo Paciente
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
          placeholder="Buscar por nome ou CPF..."
          class="input pl-9"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>CPF</th>
            <th class="hidden md:table-cell">Telefone</th>
            <th class="hidden lg:table-cell">Convênio</th>
            <th class="hidden lg:table-cell">Cadastro</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="results.length === 0">
            <td colspan="6" class="py-12 text-center text-slate-400 dark:text-slate-500">
              <svg class="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <p>Nenhum paciente encontrado.</p>
              <NuxtLink to="/patients/new" class="text-primary-600 dark:text-primary-400 hover:underline text-sm mt-1 inline-block">
                Cadastrar novo paciente
              </NuxtLink>
            </td>
          </tr>
          <tr v-for="patient in results" :key="patient.id">
            <td>
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-sm font-semibold shrink-0">
                  {{ initials(patient.name) }}
                </div>
                <div>
                  <p class="font-medium text-slate-900 dark:text-slate-100">{{ patient.name }}</p>
                  <p class="text-xs text-slate-400">{{ formatAge(patient.birthDate) }}</p>
                </div>
              </div>
            </td>
            <td class="font-mono text-xs">{{ patient.cpf }}</td>
            <td class="hidden md:table-cell">{{ patient.phone }}</td>
            <td class="hidden lg:table-cell">
              <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
                {{ patient.insurance }}
              </span>
            </td>
            <td class="hidden lg:table-cell text-xs text-slate-400">{{ formatDate(patient.createdAt.split('T')[0]) }}</td>
            <td>
              <div class="flex items-center justify-end gap-2">
                <NuxtLink :to="`/patients/${patient.id}`" class="btn-ghost px-2 py-1 text-xs">
                  Ver perfil
                </NuxtLink>
                <button
                  @click="confirmDelete(patient)"
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
    <AppModal v-model="showDeleteModal" title="Remover Paciente" size="sm">
      <p class="text-slate-600 dark:text-slate-300 text-sm">
        Deseja realmente remover o paciente
        <strong class="text-slate-900 dark:text-slate-100">{{ patientToDelete?.name }}</strong>?
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
import type { Patient } from '~/types'
definePageMeta({ middleware: 'auth' })

const patientsStore = usePatientsStore()
const notifications = useNotificationsStore()
const { formatDate, formatAge } = useFormatters()

const searchQuery = ref('')
const results = computed(() => patientsStore.search(searchQuery.value))

const showDeleteModal = ref(false)
const patientToDelete = ref<Patient | null>(null)

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function confirmDelete(patient: Patient) {
  patientToDelete.value = patient
  showDeleteModal.value = true
}

function doDelete() {
  if (!patientToDelete.value) return
  patientsStore.remove(patientToDelete.value.id)
  notifications.success('Paciente removido', `${patientToDelete.value.name} foi removido do sistema.`)
  showDeleteModal.value = false
  patientToDelete.value = null
}
</script>
