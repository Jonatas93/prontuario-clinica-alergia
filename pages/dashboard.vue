<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div>
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">
        Bom dia, {{ firstName }}!
      </h2>
      <p class="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
        Aqui está o resumo do seu dia.
      </p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Pacientes"
        :value="patientsStore.patients.length"
        icon="users"
        color="blue"
        subtitle="cadastrados"
      />
      <StatCard
        title="Hoje"
        :value="appointmentsStore.todayCount"
        icon="calendar-day"
        color="green"
        subtitle="consultas"
      />
      <StatCard
        title="Próximos"
        :value="appointmentsStore.upcomingCount"
        icon="clock"
        color="purple"
        subtitle="agendamentos"
      />
      <StatCard
        title="Prontuários"
        :value="recordsStore.total"
        icon="document"
        color="amber"
        subtitle="registros"
      />
    </div>

    <!-- Today appointments + Recent patients -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Today's schedule -->
      <div class="lg:col-span-2 card">
        <div class="card-header flex items-center justify-between">
          <h3 class="font-semibold text-slate-800 dark:text-slate-100">Agenda de Hoje</h3>
          <NuxtLink to="/appointments" class="text-primary-600 dark:text-primary-400 text-sm hover:underline font-medium">
            Ver tudo
          </NuxtLink>
        </div>
        <div class="card-body p-0">
          <div v-if="todayAppointments.length === 0" class="px-6 py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
            Nenhuma consulta agendada para hoje.
          </div>
          <div v-else class="divide-y divide-slate-100 dark:divide-slate-700">
            <div
              v-for="appt in todayAppointments"
              :key="appt.id"
              class="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
            >
              <div class="text-center shrink-0 w-14">
                <p class="font-bold text-slate-800 dark:text-slate-100 text-sm">{{ appt.time }}</p>
                <p class="text-xs text-slate-400">{{ appt.duration }}min</p>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-slate-800 dark:text-slate-100 text-sm truncate">
                  {{ getPatientName(appt.patientId) }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {{ appt.reason || appt.type }}
                </p>
                <p class="text-xs text-slate-400 mt-0.5">{{ appt.doctor }}</p>
              </div>
              <div class="shrink-0 flex flex-col items-end gap-1">
                <AppointmentBadge :status="appt.status" />
                <AppointmentTypeBadge :type="appt.type" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent patients -->
      <div class="card">
        <div class="card-header flex items-center justify-between">
          <h3 class="font-semibold text-slate-800 dark:text-slate-100">Pacientes Recentes</h3>
          <NuxtLink to="/patients" class="text-primary-600 dark:text-primary-400 text-sm hover:underline font-medium">
            Ver todos
          </NuxtLink>
        </div>
        <div class="card-body p-0">
          <div class="divide-y divide-slate-100 dark:divide-slate-700">
            <NuxtLink
              v-for="patient in recentPatients"
              :key="patient.id"
              :to="`/patients/${patient.id}`"
              class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
            >
              <div class="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-sm font-semibold shrink-0">
                {{ initials(patient.name) }}
              </div>
              <div class="min-w-0">
                <p class="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{{ patient.name }}</p>
                <p class="text-xs text-slate-400 truncate">{{ patient.insurance }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="card card-body">
      <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Ações Rápidas</h3>
      <div class="flex flex-wrap gap-3">
        <NuxtLink to="/patients/new" class="btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Novo Paciente
        </NuxtLink>
        <NuxtLink to="/appointments?new=1" class="btn-secondary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Novo Agendamento
        </NuxtLink>
        <NuxtLink to="/patients" class="btn-secondary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          Buscar Paciente
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const auth = useAuthStore()
const patientsStore = usePatientsStore()
const appointmentsStore = useAppointmentsStore()
const recordsStore = useRecordsStore()

const firstName = computed(() => auth.user?.name.split(' ')[1] ?? auth.user?.name ?? 'Médico')

const today = new Date().toISOString().split('T')[0]
const todayAppointments = computed(() =>
  appointmentsStore.byDate(today).filter(a => a.status !== 'cancelled')
)

const recentPatients = computed(() =>
  [...patientsStore.patients]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6)
)

function getPatientName(id: string) {
  return patientsStore.getById(id)?.name ?? 'Paciente não encontrado'
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}
</script>
