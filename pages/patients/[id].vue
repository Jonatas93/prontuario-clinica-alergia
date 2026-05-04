<template>
  <div v-if="patient" class="space-y-5">
    <!-- Header -->
    <div class="flex items-start gap-4 flex-wrap">
      <NuxtLink to="/patients" class="btn-ghost p-2 mt-1">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </NuxtLink>
      <div class="flex items-center gap-4 flex-1">
        <div class="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xl font-bold">
          {{ initials }}
        </div>
        <div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">{{ patient.name }}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{ formatAge(patient.birthDate) }} &bull; {{ patient.insurance }}
            <span v-if="patient.bloodType" class="ml-2 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium">
              {{ patient.bloodType }}
            </span>
          </p>
        </div>
      </div>
      <div v-if="canEditPatients" class="flex gap-2">
        <NuxtLink :to="`/patients/${patient.id}/edit`" class="btn-secondary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Editar
        </NuxtLink>
        <NuxtLink :to="`/records/${patient.id}/new`" class="btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Nova Consulta
        </NuxtLink>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-slate-200 dark:border-slate-700">
      <nav class="flex gap-1 -mb-px">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === tab.id
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'"
        >
          {{ tab.label }}
          <span v-if="tab.count !== undefined" class="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
            :class="activeTab === tab.id ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'"
          >{{ tab.count }}</span>
        </button>
      </nav>
    </div>

    <!-- Tab: Info -->
    <div v-if="activeTab === 'info'" class="grid md:grid-cols-2 gap-5">
      <div class="card">
        <div class="card-header"><h3 class="font-semibold text-slate-800 dark:text-slate-100">Contato</h3></div>
        <div class="card-body space-y-3">
          <InfoRow label="Telefone" :value="patient.phone" icon="phone" />
          <InfoRow label="E-mail" :value="patient.email || '—'" icon="email" />
          <InfoRow label="CPF" :value="patient.cpf" icon="id" />
          <InfoRow label="Nascimento" :value="formatDate(patient.birthDate)" icon="calendar" />
        </div>
      </div>

      <div class="card">
        <div class="card-header"><h3 class="font-semibold text-slate-800 dark:text-slate-100">Endereço</h3></div>
        <div class="card-body">
          <p class="text-sm text-slate-700 dark:text-slate-300">
            {{ patient.address.street }}, {{ patient.address.number }}
            <span v-if="patient.address.complement">, {{ patient.address.complement }}</span>
          </p>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {{ patient.address.neighborhood }} — {{ patient.address.city }}/{{ patient.address.state }}
          </p>
          <p class="text-sm text-slate-500 dark:text-slate-400">CEP: {{ patient.address.zipCode }}</p>
        </div>
      </div>

      <div v-if="patient.notes" class="card md:col-span-2">
        <div class="card-header"><h3 class="font-semibold text-slate-800 dark:text-slate-100">Observações</h3></div>
        <div class="card-body">
          <p class="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">{{ patient.notes }}</p>
        </div>
      </div>

      <!-- Alergias identificadas -->
      <div class="card md:col-span-2">
        <div class="card-header flex items-center justify-between">
          <h3 class="font-semibold text-slate-800 dark:text-slate-100">Alergias Identificadas</h3>
          <NuxtLink :to="`/records/${patient.id}/new`" class="text-primary-600 dark:text-primary-400 text-sm hover:underline font-medium">
            Nova consulta
          </NuxtLink>
        </div>
        <div class="card-body">
          <div v-if="allAllergies.length === 0" class="text-sm text-slate-400 dark:text-slate-500">
            Nenhuma alergia registrada em prontuários.
          </div>
          <div v-else class="flex flex-wrap gap-2">
            <span
              v-for="a in allAllergies"
              :key="a"
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="a.includes('ANAFILAX') ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-700' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'"
            >
              {{ a.includes('ANAFILAX') ? '⚠ ' : '' }}{{ a }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Prontuários -->
    <div v-else-if="activeTab === 'records'" class="space-y-4">
      <div v-if="patientRecords.length === 0" class="card card-body text-center py-12">
        <svg class="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <p class="text-slate-400 dark:text-slate-500 text-sm">Nenhum prontuário registrado.</p>
        <NuxtLink v-if="canEditPatients" :to="`/records/${patient.id}/new`" class="btn-primary mt-4 inline-flex">
          Registrar consulta
        </NuxtLink>
      </div>

      <div v-for="record in patientRecords" :key="record.id" class="card">
        <div class="card-header flex items-center justify-between">
          <div>
            <p class="font-semibold text-slate-800 dark:text-slate-100">
              {{ formatDate(record.date) }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ record.doctor }}</p>
          </div>
          <span class="text-xs text-slate-400 dark:text-slate-500">{{ formatDate(record.createdAt.split('T')[0]) }}</span>
        </div>
        <div class="card-body space-y-4 text-sm">
          <RecordSection title="Queixa Principal" :content="record.chiefComplaint" />
          <RecordSection title="Exame Físico" :content="record.physicalExam" />
          <RecordSection title="Hipótese Diagnóstica" :content="record.diagnosis" />
          <RecordSection title="Conduta" :content="record.treatment" />

          <div v-if="record.allergiesIdentified.length > 0">
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Alergias Identificadas</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="a in record.allergiesIdentified" :key="a"
                class="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                {{ a }}
              </span>
            </div>
          </div>

          <div v-if="record.prescriptions.length > 0">
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Prescrições</p>
            <div class="space-y-2">
              <div v-for="(p, i) in record.prescriptions" :key="i"
                class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700">
                <p class="font-medium text-slate-800 dark:text-slate-200">{{ p.medication }}</p>
                <p class="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                  {{ p.dosage }} &bull; {{ p.frequency }} &bull; {{ p.duration }}
                </p>
                <p v-if="p.notes" class="text-slate-400 dark:text-slate-500 text-xs mt-0.5 italic">{{ p.notes }}</p>
              </div>
            </div>
          </div>

          <RecordSection v-if="record.followUp" title="Retorno / Follow-up" :content="record.followUp" />
          <RecordSection v-if="record.notes" title="Notas Adicionais" :content="record.notes" />
        </div>
      </div>
    </div>

    <!-- Tab: Agendamentos -->
    <div v-else-if="activeTab === 'appointments'" class="space-y-4">
      <div class="flex justify-end">
        <NuxtLink to="/appointments?new=1" class="btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Novo Agendamento
        </NuxtLink>
      </div>

      <div v-if="patientAppointments.length === 0" class="card card-body text-center py-12">
        <p class="text-slate-400 dark:text-slate-500 text-sm">Nenhum agendamento encontrado.</p>
      </div>

      <div v-else class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Data / Hora</th>
              <th>Tipo</th>
              <th>Médico</th>
              <th>Motivo</th>
              <th>Status</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appt in patientAppointments" :key="appt.id">
              <td class="whitespace-nowrap">
                <p class="font-medium">{{ formatDate(appt.date) }}</p>
                <p class="text-xs text-slate-400">{{ appt.time }} ({{ appt.duration }}min)</p>
              </td>
              <td><AppointmentTypeBadge :type="appt.type" /></td>
              <td class="text-xs">{{ appt.doctor }}</td>
              <td class="max-w-xs truncate text-xs">{{ appt.reason || '—' }}</td>
              <td><AppointmentBadge :status="appt.status" /></td>
              <td>
                <div v-if="canEditPatients" class="flex justify-end gap-1">
                  <button
                    v-if="appt.status === 'scheduled'"
                    @click="updateStatus(appt.id, 'confirmed')"
                    class="btn-ghost px-2 py-1 text-xs text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >Confirmar</button>
                  <button
                    v-if="['scheduled','confirmed'].includes(appt.status)"
                    @click="updateStatus(appt.id, 'cancelled')"
                    class="btn-ghost px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >Cancelar</button>
                  <button
                    v-if="appt.status === 'confirmed'"
                    @click="updateStatus(appt.id, 'completed')"
                    class="btn-ghost px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >Realizado</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="text-center py-20">
    <p class="text-slate-400 text-lg">Paciente não encontrado.</p>
    <NuxtLink to="/patients" class="btn-primary mt-4 inline-flex">Voltar à lista</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const patientsStore = usePatientsStore()
const appointmentsStore = useAppointmentsStore()
const recordsStore = useRecordsStore()
const notifications = useNotificationsStore()
const { formatDate, formatAge } = useFormatters()
const { canEditPatients } = usePermissions()

const patient = computed(() => patientsStore.getById(route.params.id as string))
const patientRecords = computed(() => recordsStore.byPatient(route.params.id as string))
const patientAppointments = computed(() => appointmentsStore.byPatient(route.params.id as string))

const allAllergies = computed(() => {
  const set = new Set<string>()
  patientRecords.value.forEach(r => r.allergiesIdentified.forEach(a => set.add(a)))
  return [...set]
})

const initials = computed(() =>
  patient.value?.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() ?? '?'
)

const tabs = computed(() => [
  { id: 'info', label: 'Informações' },
  { id: 'records', label: 'Prontuários', count: patientRecords.value.length },
  { id: 'appointments', label: 'Agendamentos', count: patientAppointments.value.length }
])

const activeTab = ref('info')

function updateStatus(id: string, status: 'confirmed' | 'cancelled' | 'completed') {
  appointmentsStore.updateStatus(id, status)
  const labels = { confirmed: 'confirmado', cancelled: 'cancelado', completed: 'marcado como realizado' }
  notifications.success('Status atualizado', `Agendamento ${labels[status]}.`)
}
</script>
