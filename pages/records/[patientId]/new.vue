<template>
  <div class="max-w-4xl space-y-5">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <NuxtLink :to="`/patients/${route.params.patientId}`" class="btn-ghost p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Nova Consulta</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ patient?.name }}</p>
      </div>
    </div>

    <!-- Alerta alergias conhecidas -->
    <div v-if="knownAllergies.length > 0" class="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
      <svg class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
      <div>
        <p class="text-sm font-semibold text-amber-800 dark:text-amber-300">Alergias registradas neste paciente</p>
        <p class="text-xs text-amber-700 dark:text-amber-400 mt-0.5">{{ knownAllergies.join(', ') }}</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Dados da consulta -->
      <div class="card">
        <div class="card-header"><h3 class="font-semibold text-slate-800 dark:text-slate-100">Dados da Consulta</h3></div>
        <div class="card-body grid md:grid-cols-3 gap-4">
          <div>
            <label class="label">Data *</label>
            <input v-model="form.date" type="date" class="input" required />
          </div>
          <div class="md:col-span-2">
            <label class="label">Médico *</label>
            <select v-model="form.doctor" class="input" required>
              <option v-for="d in doctors" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Anamnese -->
      <div class="card">
        <div class="card-header"><h3 class="font-semibold text-slate-800 dark:text-slate-100">Anamnese e Exame</h3></div>
        <div class="card-body space-y-4">
          <div>
            <label class="label">Queixa Principal *</label>
            <textarea
              v-model="form.chiefComplaint"
              class="input resize-none"
              rows="3"
              placeholder="Descreva a queixa principal do paciente nesta consulta..."
              required
            />
          </div>
          <div>
            <label class="label">Exame Físico *</label>
            <textarea
              v-model="form.physicalExam"
              class="input resize-none"
              rows="4"
              placeholder="Estado geral, ausculta, mucosa nasal, lesões cutâneas, parâmetros vitais..."
              required
            />
          </div>
        </div>
      </div>

      <!-- Diagnóstico e Conduta -->
      <div class="card">
        <div class="card-header"><h3 class="font-semibold text-slate-800 dark:text-slate-100">Diagnóstico e Conduta</h3></div>
        <div class="card-body space-y-4">
          <div>
            <label class="label">Hipótese Diagnóstica *</label>
            <textarea
              v-model="form.diagnosis"
              class="input resize-none"
              rows="2"
              placeholder="CID-10 e descrição do diagnóstico..."
              required
            />
          </div>
          <div>
            <label class="label">Conduta *</label>
            <textarea
              v-model="form.treatment"
              class="input resize-none"
              rows="3"
              placeholder="Plano terapêutico, orientações, pedidos de exames..."
              required
            />
          </div>
          <div>
            <label class="label">Retorno / Follow-up</label>
            <input v-model="form.followUp" type="text" class="input" placeholder="Ex: Retorno em 30 dias com resultado de espirometria" />
          </div>
        </div>
      </div>

      <!-- Alergias identificadas -->
      <div class="card">
        <div class="card-header"><h3 class="font-semibold text-slate-800 dark:text-slate-100">Alergias Identificadas nesta Consulta</h3></div>
        <div class="card-body space-y-3">
          <div class="flex gap-2">
            <input
              v-model="newAllergy"
              type="text"
              class="input flex-1"
              placeholder="Ex: Dermatophagoides pteronyssinus, Amendoim..."
              @keydown.enter.prevent="addAllergy"
            />
            <button type="button" class="btn-secondary shrink-0" @click="addAllergy">Adicionar</button>
          </div>
          <div v-if="form.allergiesIdentified.length > 0" class="flex flex-wrap gap-2">
            <span
              v-for="(a, i) in form.allergiesIdentified"
              :key="i"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-sm font-medium"
            >
              {{ a }}
              <button type="button" @click="removeAllergy(i)" class="hover:text-red-600 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </span>
          </div>
          <p v-else class="text-sm text-slate-400">Nenhuma alergia adicionada ainda.</p>
        </div>
      </div>

      <!-- Prescrições -->
      <div class="card">
        <div class="card-header flex items-center justify-between">
          <h3 class="font-semibold text-slate-800 dark:text-slate-100">Prescrições</h3>
          <button type="button" class="btn-secondary text-xs px-3 py-1.5" @click="addPrescription">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Adicionar medicamento
          </button>
        </div>
        <div class="card-body space-y-4">
          <div v-if="form.prescriptions.length === 0" class="text-sm text-slate-400 text-center py-4">
            Nenhum medicamento prescrito ainda.
          </div>
          <div
            v-for="(presc, i) in form.prescriptions"
            :key="i"
            class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-3"
          >
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-slate-700 dark:text-slate-300">Medicamento {{ i + 1 }}</p>
              <button type="button" @click="removePrescription(i)" class="text-red-400 hover:text-red-600 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
            <div class="grid md:grid-cols-2 gap-3">
              <div class="md:col-span-2">
                <label class="label text-xs">Nome do medicamento *</label>
                <input v-model="presc.medication" type="text" class="input" placeholder="Ex: Mometasona furoato spray nasal 50mcg" required />
              </div>
              <div>
                <label class="label text-xs">Posologia / Dosagem</label>
                <input v-model="presc.dosage" type="text" class="input" placeholder="Ex: 2 jatos em cada narina" />
              </div>
              <div>
                <label class="label text-xs">Frequência</label>
                <input v-model="presc.frequency" type="text" class="input" placeholder="Ex: 1x ao dia (pela manhã)" />
              </div>
              <div>
                <label class="label text-xs">Duração</label>
                <input v-model="presc.duration" type="text" class="input" placeholder="Ex: 30 dias" />
              </div>
              <div>
                <label class="label text-xs">Observações</label>
                <input v-model="presc.notes" type="text" class="input" placeholder="Ex: Tomar com alimento" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notas adicionais -->
      <div class="card">
        <div class="card-header"><h3 class="font-semibold text-slate-800 dark:text-slate-100">Notas Adicionais</h3></div>
        <div class="card-body">
          <textarea v-model="form.notes" class="input resize-none" rows="2"
            placeholder="Observações complementares, alertas importantes..." />
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <NuxtLink :to="`/patients/${route.params.patientId}`" class="btn-secondary">Cancelar</NuxtLink>
        <button type="submit" class="btn-primary">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          Salvar Prontuário
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Prescription } from '~/types'
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const patientsStore = usePatientsStore()
const recordsStore = useRecordsStore()
const notifications = useNotificationsStore()

const patient = computed(() => patientsStore.getById(route.params.patientId as string))

const knownAllergies = computed(() => {
  const set = new Set<string>()
  recordsStore.byPatient(route.params.patientId as string)
    .forEach(r => r.allergiesIdentified.forEach(a => set.add(a)))
  return [...set]
})

const doctors = ['Dr. Carlos Eduardo Silva', 'Dra. Patrícia Rocha']
const today = new Date().toISOString().split('T')[0]

const form = reactive({
  date: today,
  doctor: 'Dr. Carlos Eduardo Silva',
  chiefComplaint: '',
  physicalExam: '',
  diagnosis: '',
  treatment: '',
  followUp: '',
  notes: '',
  allergiesIdentified: [] as string[],
  prescriptions: [] as Prescription[]
})

const newAllergy = ref('')

function addAllergy() {
  const a = newAllergy.value.trim()
  if (a && !form.allergiesIdentified.includes(a)) {
    form.allergiesIdentified.push(a)
  }
  newAllergy.value = ''
}

function removeAllergy(i: number) {
  form.allergiesIdentified.splice(i, 1)
}

function addPrescription() {
  form.prescriptions.push({ medication: '', dosage: '', frequency: '', duration: '', notes: '' })
}

function removePrescription(i: number) {
  form.prescriptions.splice(i, 1)
}

function handleSubmit() {
  const record = recordsStore.add({
    patientId: route.params.patientId as string,
    date: form.date,
    doctor: form.doctor,
    chiefComplaint: form.chiefComplaint,
    physicalExam: form.physicalExam,
    diagnosis: form.diagnosis,
    treatment: form.treatment,
    followUp: form.followUp || undefined,
    notes: form.notes || undefined,
    allergiesIdentified: form.allergiesIdentified,
    prescriptions: form.prescriptions.filter(p => p.medication.trim())
  })
  notifications.success('Prontuário salvo!', 'A consulta foi registrada com sucesso.')
  router.push(`/patients/${route.params.patientId}?tab=records`)
}
</script>
