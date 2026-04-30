import { defineStore } from 'pinia'
import type { MedicalRecord } from '~/types'
import { mockRecords } from '~/data/mock'

export const useRecordsStore = defineStore('records', () => {
  const records = ref<MedicalRecord[]>([])

  function init() {
    const saved = localStorage.getItem('records_data')
    if (saved) {
      try { records.value = JSON.parse(saved) } catch {}
    } else {
      records.value = [...mockRecords]
      persist()
    }
  }

  function persist() {
    localStorage.setItem('records_data', JSON.stringify(records.value))
  }

  function byPatient(patientId: string) {
    return records.value
      .filter(r => r.patientId === patientId)
      .sort((a, b) => b.date.localeCompare(a.date))
  }

  function getById(id: string) {
    return records.value.find(r => r.id === id)
  }

  const total = computed(() => records.value.length)

  function add(data: Omit<MedicalRecord, 'id' | 'createdAt'>) {
    const record: MedicalRecord = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    records.value.push(record)
    persist()
    return record
  }

  function update(id: string, data: Partial<Omit<MedicalRecord, 'id' | 'createdAt'>>) {
    const idx = records.value.findIndex(r => r.id === id)
    if (idx === -1) return false
    records.value[idx] = { ...records.value[idx], ...data }
    persist()
    return true
  }

  function remove(id: string) {
    records.value = records.value.filter(r => r.id !== id)
    persist()
  }

  return { records, total, init, byPatient, getById, add, update, remove }
})
