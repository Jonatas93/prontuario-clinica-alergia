import { defineStore } from 'pinia'
import type { Appointment, AppointmentStatus } from '~/types'
import { mockAppointments } from '~/data/mock'

export const useAppointmentsStore = defineStore('appointments', () => {
  const appointments = ref<Appointment[]>([])

  function init() {
    const saved = localStorage.getItem('appointments_data')
    if (saved) {
      try { appointments.value = JSON.parse(saved) } catch {}
    } else {
      appointments.value = [...mockAppointments]
      persist()
    }
  }

  function persist() {
    localStorage.setItem('appointments_data', JSON.stringify(appointments.value))
  }

  function byPatient(patientId: string) {
    return appointments.value
      .filter(a => a.patientId === patientId)
      .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`))
  }

  function byDate(date: string) {
    return appointments.value
      .filter(a => a.date === date)
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  function byMonth(year: number, month: number) {
    const prefix = `${year}-${String(month).padStart(2, '0')}`
    return appointments.value.filter(a => a.date.startsWith(prefix))
  }

  function getById(id: string) {
    return appointments.value.find(a => a.id === id)
  }

  const todayCount = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return appointments.value.filter(a => a.date === today && a.status !== 'cancelled').length
  })

  const upcomingCount = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return appointments.value.filter(a => a.date >= today && (a.status === 'scheduled' || a.status === 'confirmed')).length
  })

  function add(data: Omit<Appointment, 'id' | 'createdAt'>) {
    const appt: Appointment = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    appointments.value.push(appt)
    persist()
    return appt
  }

  function update(id: string, data: Partial<Omit<Appointment, 'id' | 'createdAt'>>) {
    const idx = appointments.value.findIndex(a => a.id === id)
    if (idx === -1) return false
    appointments.value[idx] = { ...appointments.value[idx], ...data }
    persist()
    return true
  }

  function updateStatus(id: string, status: AppointmentStatus) {
    return update(id, { status })
  }

  function remove(id: string) {
    appointments.value = appointments.value.filter(a => a.id !== id)
    persist()
  }

  return {
    appointments, todayCount, upcomingCount,
    init, byPatient, byDate, byMonth, getById, add, update, updateStatus, remove
  }
})
