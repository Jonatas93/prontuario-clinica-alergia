import { defineStore } from 'pinia'
import type { Patient } from '~/types'
import { mockPatients } from '~/data/mock'

export const usePatientsStore = defineStore('patients', () => {
  const patients = ref<Patient[]>([])

  function init() {
    const saved = localStorage.getItem('patients_data')
    if (saved) {
      try { patients.value = JSON.parse(saved) } catch {}
    } else {
      patients.value = [...mockPatients]
      persist()
    }
  }

  function persist() {
    localStorage.setItem('patients_data', JSON.stringify(patients.value))
  }

  const sorted = computed(() =>
    [...patients.value].sort((a, b) => a.name.localeCompare(b.name))
  )

  function getById(id: string) {
    return patients.value.find(p => p.id === id)
  }

  function search(query: string) {
    const q = query.toLowerCase().trim()
    if (!q) return sorted.value
    return sorted.value.filter(p =>
      p.name.toLowerCase().includes(q) || p.cpf.replace(/\D/g, '').includes(q.replace(/\D/g, ''))
    )
  }

  function add(data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString()
    const patient: Patient = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    }
    patients.value.push(patient)
    persist()
    return patient
  }

  function update(id: string, data: Partial<Omit<Patient, 'id' | 'createdAt'>>) {
    const idx = patients.value.findIndex(p => p.id === id)
    if (idx === -1) return false
    patients.value[idx] = { ...patients.value[idx], ...data, updatedAt: new Date().toISOString() }
    persist()
    return true
  }

  function remove(id: string) {
    patients.value = patients.value.filter(p => p.id !== id)
    persist()
  }

  return { patients, sorted, init, getById, search, add, update, remove }
})
