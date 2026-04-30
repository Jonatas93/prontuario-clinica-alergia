<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <!-- Dados pessoais -->
    <div class="card">
      <div class="card-header">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100">Dados Pessoais</h3>
      </div>
      <div class="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="label">Nome completo *</label>
          <input v-model="form.name" type="text" class="input" placeholder="Nome do paciente" required />
        </div>

        <div>
          <label class="label">CPF *</label>
          <input v-model="form.cpf" type="text" class="input" placeholder="000.000.000-00" maxlength="14" @input="maskCPF" required />
        </div>

        <div>
          <label class="label">Data de nascimento *</label>
          <input v-model="form.birthDate" type="date" class="input" required />
        </div>

        <div>
          <label class="label">Telefone *</label>
          <input v-model="form.phone" type="tel" class="input" placeholder="(11) 99999-9999" @input="maskPhone" required />
        </div>

        <div>
          <label class="label">E-mail</label>
          <input v-model="form.email" type="email" class="input" placeholder="email@exemplo.com" />
        </div>

        <div>
          <label class="label">Tipo sanguíneo</label>
          <select v-model="form.bloodType" class="input">
            <option value="">Não informado</option>
            <option v-for="bt in bloodTypes" :key="bt" :value="bt">{{ bt }}</option>
          </select>
        </div>

        <div>
          <label class="label">Convênio *</label>
          <input v-model="form.insurance" type="text" class="input" placeholder="Nome do convênio ou Particular" required />
        </div>
      </div>
    </div>

    <!-- Endereço -->
    <div class="card">
      <div class="card-header">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100">Endereço</h3>
      </div>
      <div class="card-body grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="label">CEP</label>
          <input v-model="form.address.zipCode" type="text" class="input" placeholder="00000-000" maxlength="9" @input="maskCEP" />
        </div>
        <div class="md:col-span-2">
          <label class="label">Logradouro</label>
          <input v-model="form.address.street" type="text" class="input" placeholder="Rua, Avenida..." />
        </div>
        <div>
          <label class="label">Número</label>
          <input v-model="form.address.number" type="text" class="input" placeholder="123" />
        </div>
        <div>
          <label class="label">Complemento</label>
          <input v-model="form.address.complement" type="text" class="input" placeholder="Apto, Bloco..." />
        </div>
        <div>
          <label class="label">Bairro</label>
          <input v-model="form.address.neighborhood" type="text" class="input" placeholder="Bairro" />
        </div>
        <div>
          <label class="label">Cidade</label>
          <input v-model="form.address.city" type="text" class="input" placeholder="Cidade" />
        </div>
        <div>
          <label class="label">Estado</label>
          <select v-model="form.address.state" class="input">
            <option value="">UF</option>
            <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Observações -->
    <div class="card">
      <div class="card-header">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100">Observações</h3>
      </div>
      <div class="card-body">
        <label class="label">Anotações gerais</label>
        <textarea
          v-model="form.notes"
          class="input resize-none"
          rows="3"
          placeholder="Histórico familiar, informações relevantes..."
        />
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <button type="button" class="btn-secondary" @click="$emit('cancel')">Cancelar</button>
      <button type="submit" class="btn-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        {{ initialData ? 'Salvar Alterações' : 'Cadastrar Paciente' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Patient } from '~/types'

const props = defineProps<{ initialData?: Patient }>()
const emit = defineEmits<{
  submit: [data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>]
  cancel: []
}>()

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const ufs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

const form = reactive({
  name: '',
  cpf: '',
  birthDate: '',
  phone: '',
  email: '',
  bloodType: '',
  insurance: '',
  notes: '',
  address: {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  }
})

if (props.initialData) {
  Object.assign(form, {
    name: props.initialData.name,
    cpf: props.initialData.cpf,
    birthDate: props.initialData.birthDate,
    phone: props.initialData.phone,
    email: props.initialData.email,
    bloodType: props.initialData.bloodType ?? '',
    insurance: props.initialData.insurance,
    notes: props.initialData.notes ?? '',
    address: { ...props.initialData.address }
  })
}

function maskCPF() {
  let v = form.cpf.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/(\d{3})(\d)/, '$1.$2')
  v = v.replace(/(\d{3})(\d)/, '$1.$2')
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  form.cpf = v
}

function maskPhone() {
  let v = form.phone.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 10) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  else v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  form.phone = v
}

function maskCEP() {
  let v = form.address.zipCode.replace(/\D/g, '').slice(0, 8)
  v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2')
  form.address.zipCode = v
}

function handleSubmit() {
  emit('submit', { ...form })
}
</script>
