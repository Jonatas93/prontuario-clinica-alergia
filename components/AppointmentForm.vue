<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid md:grid-cols-2 gap-4">
      <div class="md:col-span-2">
        <label class="label">Paciente *</label>
        <select v-model="form.patientId" class="input" required>
          <option value="">Selecione o paciente</option>
          <option v-for="p in patients" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>
      </div>

      <div>
        <label class="label">Data *</label>
        <input v-model="form.date" type="date" class="input" :min="today" required />
      </div>

      <div>
        <label class="label">Horário *</label>
        <input v-model="form.time" type="time" class="input" required />
      </div>

      <div>
        <label class="label">Duração (minutos)</label>
        <select v-model.number="form.duration" class="input">
          <option :value="15">15 min</option>
          <option :value="30">30 min</option>
          <option :value="45">45 min</option>
          <option :value="60">60 min</option>
          <option :value="90">90 min</option>
        </select>
      </div>

      <div>
        <label class="label">Tipo *</label>
        <select v-model="form.type" class="input" required>
          <option value="consultation">Consulta</option>
          <option value="return">Retorno</option>
          <option value="exam">Exame</option>
          <option value="procedure">Procedimento</option>
        </select>
      </div>

      <div class="md:col-span-2">
        <label class="label">Médico *</label>
        <select v-model="form.doctor" class="input" required>
          <option value="">Selecione o médico</option>
          <option v-for="d in doctors" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>

      <div class="md:col-span-2">
        <label class="label">Motivo da consulta</label>
        <input v-model="form.reason" type="text" class="input" placeholder="Ex: Consulta inicial - rinite alérgica" />
      </div>

      <div class="md:col-span-2">
        <label class="label">Status</label>
        <select v-model="form.status" class="input">
          <option value="scheduled">Agendado</option>
          <option value="confirmed">Confirmado</option>
        </select>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <button type="button" class="btn-secondary" @click="$emit('cancel')">Cancelar</button>
      <button type="submit" class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Agendar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Patient, Appointment } from '~/types'

const props = defineProps<{ patients: Patient[] }>()
const emit = defineEmits<{
  submit: [data: Omit<Appointment, 'id' | 'createdAt'>]
  cancel: []
}>()

const doctors = [
  'Dr. Carlos Eduardo Silva',
  'Dra. Patrícia Rocha'
]

const today = new Date().toISOString().split('T')[0]

const form = reactive({
  patientId: '',
  date: today,
  time: '09:00',
  duration: 60,
  type: 'consultation' as Appointment['type'],
  doctor: 'Dr. Carlos Eduardo Silva',
  status: 'scheduled' as Appointment['status'],
  reason: '',
  notes: ''
})

function handleSubmit() {
  emit('submit', { ...form })
}
</script>
