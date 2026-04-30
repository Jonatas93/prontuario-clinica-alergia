<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Agendamentos</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Gerencie as consultas da clínica</p>
      </div>
      <button @click="openNewModal" class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Novo Agendamento
      </button>
    </div>

    <!-- Calendar Nav -->
    <div class="card">
      <div class="card-header flex items-center justify-between">
        <button @click="prevMonth" class="btn-ghost p-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h3 class="font-semibold text-slate-800 dark:text-slate-100 capitalize">
          {{ currentMonthLabel }}
        </h3>
        <button @click="nextMonth" class="btn-ghost p-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Calendar grid -->
      <div class="card-body p-0">
        <div class="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700">
          <div v-for="d in ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']" :key="d"
            class="py-2 text-center text-xs font-semibold text-slate-400 dark:text-slate-500">{{ d }}</div>
        </div>
        <div class="grid grid-cols-7">
          <div
            v-for="(day, idx) in calendarDays"
            :key="idx"
            @click="day.date && selectDate(day.date)"
            class="min-h-[72px] p-1.5 border-b border-r border-slate-100 dark:border-slate-700/50 transition-colors"
            :class="[
              day.date ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30' : 'bg-slate-50/50 dark:bg-slate-900/20',
              day.isToday ? 'bg-primary-50 dark:bg-primary-900/20' : '',
              selectedDate === day.date ? 'ring-2 ring-inset ring-primary-400' : ''
            ]"
          >
            <div v-if="day.date">
              <p class="text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full"
                :class="day.isToday ? 'bg-primary-600 text-white' : 'text-slate-600 dark:text-slate-300'"
              >{{ day.day }}</p>
              <div class="space-y-0.5">
                <div
                  v-for="appt in (dayMap[day.date] || []).slice(0, 3)"
                  :key="appt.id"
                  class="text-xs px-1 py-0.5 rounded truncate"
                  :class="statusColors[appt.status]"
                >
                  {{ appt.time }} {{ getPatientFirst(appt.patientId) }}
                </div>
                <div v-if="(dayMap[day.date] || []).length > 3" class="text-xs text-slate-400 pl-1">
                  +{{ (dayMap[day.date] || []).length - 3 }} mais
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected day list -->
    <div v-if="selectedDate" class="card">
      <div class="card-header flex items-center justify-between">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100">
          Consultas em {{ formatDate(selectedDate) }}
        </h3>
        <button @click="selectedDate = null" class="btn-ghost p-1 text-xs">Limpar</button>
      </div>
      <div class="card-body p-0">
        <div v-if="!dayMap[selectedDate]?.length" class="px-6 py-8 text-center text-slate-400 text-sm">
          Nenhum agendamento neste dia.
        </div>
        <div v-else class="divide-y divide-slate-100 dark:divide-slate-700">
          <div
            v-for="appt in dayMap[selectedDate]"
            :key="appt.id"
            class="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/30"
          >
            <div class="w-14 text-center shrink-0">
              <p class="font-bold text-slate-800 dark:text-slate-100 text-sm">{{ appt.time }}</p>
              <p class="text-xs text-slate-400">{{ appt.duration }}min</p>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm text-slate-800 dark:text-slate-100">{{ getPatientName(appt.patientId) }}</p>
              <p class="text-xs text-slate-500 truncate mt-0.5">{{ appt.reason || '—' }}</p>
              <p class="text-xs text-slate-400">{{ appt.doctor }}</p>
            </div>
            <div class="flex flex-col items-end gap-1.5 shrink-0">
              <AppointmentBadge :status="appt.status" />
              <AppointmentTypeBadge :type="appt.type" />
            </div>
            <div class="shrink-0 flex gap-1">
              <NuxtLink :to="`/patients/${appt.patientId}`" class="btn-ghost px-2 py-1 text-xs">Paciente</NuxtLink>
              <button
                v-if="appt.status === 'scheduled'"
                @click="appointmentsStore.updateStatus(appt.id, 'confirmed')"
                class="btn-ghost px-2 py-1 text-xs text-green-600"
              >✓ Confirmar</button>
              <button
                v-if="appt.status === 'confirmed'"
                @click="appointmentsStore.updateStatus(appt.id, 'completed')"
                class="btn-ghost px-2 py-1 text-xs text-slate-600"
              >✓ Realizado</button>
              <button
                v-if="['scheduled','confirmed'].includes(appt.status)"
                @click="appointmentsStore.updateStatus(appt.id, 'cancelled')"
                class="btn-ghost px-2 py-1 text-xs text-red-500"
              >Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All upcoming list -->
    <div class="card">
      <div class="card-header">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100">Próximos Agendamentos</h3>
      </div>
      <div class="card-body p-0">
        <div v-if="upcomingAppointments.length === 0" class="px-6 py-8 text-center text-slate-400 text-sm">
          Nenhum agendamento futuro.
        </div>
        <div v-else class="table-wrapper border-0 rounded-none">
          <table class="table">
            <thead>
              <tr>
                <th>Data / Hora</th>
                <th>Paciente</th>
                <th class="hidden md:table-cell">Tipo</th>
                <th class="hidden lg:table-cell">Médico</th>
                <th>Status</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appt in upcomingAppointments" :key="appt.id">
                <td class="whitespace-nowrap">
                  <p class="font-medium text-sm">{{ formatDate(appt.date) }}</p>
                  <p class="text-xs text-slate-400">{{ appt.time }}</p>
                </td>
                <td>
                  <NuxtLink :to="`/patients/${appt.patientId}`" class="font-medium text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    {{ getPatientName(appt.patientId) }}
                  </NuxtLink>
                </td>
                <td class="hidden md:table-cell"><AppointmentTypeBadge :type="appt.type" /></td>
                <td class="hidden lg:table-cell text-xs text-slate-500">{{ appt.doctor }}</td>
                <td><AppointmentBadge :status="appt.status" /></td>
                <td class="text-right">
                  <div class="flex justify-end gap-1">
                    <button
                      v-if="appt.status === 'scheduled'"
                      @click="appointmentsStore.updateStatus(appt.id, 'confirmed')"
                      class="btn-ghost px-2 py-1 text-xs text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >Confirmar</button>
                    <button
                      v-if="['scheduled','confirmed'].includes(appt.status)"
                      @click="appointmentsStore.updateStatus(appt.id, 'cancelled')"
                      class="btn-ghost px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >Cancelar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- New appointment modal -->
    <AppModal v-model="showModal" title="Novo Agendamento" size="lg">
      <AppointmentForm :patients="patientsStore.sorted" @submit="handleNewAppt" @cancel="showModal = false" />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import type { Appointment, AppointmentStatus } from '~/types'
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const appointmentsStore = useAppointmentsStore()
const patientsStore = usePatientsStore()
const notifications = useNotificationsStore()
const { formatDate } = useFormatters()

const showModal = ref(false)

onMounted(() => {
  if (route.query.new) showModal.value = true
})

const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth() + 1)
const selectedDate = ref<string | null>(today.toISOString().split('T')[0])

const currentMonthLabel = computed(() => {
  const d = new Date(currentYear.value, currentMonth.value - 1, 1)
  return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
})

function prevMonth() {
  if (currentMonth.value === 1) { currentMonth.value = 12; currentYear.value-- }
  else currentMonth.value--
}
function nextMonth() {
  if (currentMonth.value === 12) { currentMonth.value = 1; currentYear.value++ }
  else currentMonth.value++
}

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value, 0)
  const days: { date: string | null; day: number | null; isToday: boolean }[] = []
  const todayStr = today.toISOString().split('T')[0]

  for (let i = 0; i < firstDay.getDay(); i++) days.push({ date: null, day: null, isToday: false })

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    days.push({ date: dateStr, day: d, isToday: dateStr === todayStr })
  }
  return days
})

const monthAppointments = computed(() =>
  appointmentsStore.byMonth(currentYear.value, currentMonth.value)
)

const dayMap = computed(() => {
  const map: Record<string, typeof monthAppointments.value> = {}
  for (const appt of monthAppointments.value) {
    if (!map[appt.date]) map[appt.date] = []
    map[appt.date].push(appt)
  }
  return map
})

const statusColors: Record<AppointmentStatus, string> = {
  scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 opacity-60',
  completed: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
}

const upcomingAppointments = computed(() => {
  const todayStr = today.toISOString().split('T')[0]
  return [...appointmentsStore.appointments]
    .filter(a => a.date >= todayStr && a.status !== 'cancelled')
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .slice(0, 20)
})

function selectDate(date: string) {
  selectedDate.value = selectedDate.value === date ? null : date
}

function getPatientName(id: string) {
  return patientsStore.getById(id)?.name ?? 'Desconhecido'
}

function getPatientFirst(id: string) {
  return patientsStore.getById(id)?.name.split(' ')[0] ?? '?'
}

function openNewModal() {
  showModal.value = true
}

function handleNewAppt(data: Omit<Appointment, 'id' | 'createdAt'>) {
  appointmentsStore.add(data)
  notifications.success('Agendamento criado!', 'A consulta foi agendada com sucesso.')
  showModal.value = false
}
</script>
