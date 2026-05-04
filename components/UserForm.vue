<script setup lang="ts">
import type { User, UserRole } from '~/types'

interface Props {
  initialData?: User
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })

const emit = defineEmits<{
  'submit': [data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>]
  'cancel': []
}>()

const isEdit = computed(() => !!props.initialData)

const form = reactive({
  name: props.initialData?.name ?? '',
  email: props.initialData?.email ?? '',
  username: props.initialData?.username ?? '',
  password: '',
  role: (props.initialData?.role ?? 'enfermeiro') as UserRole,
  crm: props.initialData?.crm ?? '',
  coren: props.initialData?.coren ?? '',
  specialty: props.initialData?.specialty ?? '',
  status: (props.initialData?.status ?? 'ativo') as 'ativo' | 'inativo'
})

const showPassword = ref(false)
const errors = reactive<Record<string, string>>({})

const showCrm = computed(() => form.role === 'admin' || form.role === 'medico')
const showCoren = computed(() => form.role === 'enfermeiro')

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'medico', label: 'Médico' },
  { value: 'enfermeiro', label: 'Enfermeiro' }
]

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name.trim()) errors.name = 'Nome obrigatório.'
  if (!form.email.trim()) errors.email = 'E-mail obrigatório.'
  if (!form.username.trim()) errors.username = 'Usuário obrigatório.'
  if (!isEdit.value && !form.password) errors.password = 'Senha obrigatória.'
  return Object.keys(errors).length === 0
}

function handleSubmit() {
  if (!validate()) return
  const data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
    name: form.name.trim(),
    email: form.email.trim(),
    username: form.username.trim(),
    password: form.password || props.initialData?.password || '',
    role: form.role,
    status: form.status,
    crm: showCrm.value && form.crm ? form.crm.trim() : undefined,
    coren: showCoren.value && form.coren ? form.coren.trim() : undefined,
    specialty: showCrm.value && form.specialty ? form.specialty.trim() : undefined
  }
  emit('submit', data)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <!-- Dados pessoais -->
    <div class="card card-body space-y-4">
      <h3 class="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Dados Pessoais</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">Nome completo <span class="text-red-500">*</span></label>
          <input v-model="form.name" type="text" class="input" placeholder="Nome do profissional" />
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
        </div>
        <div>
          <label class="label">E-mail <span class="text-red-500">*</span></label>
          <input v-model="form.email" type="email" class="input" placeholder="email@allergymed.com.br" />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>
      </div>
    </div>

    <!-- Acesso -->
    <div class="card card-body space-y-4">
      <h3 class="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Acesso ao Sistema</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">Usuário <span class="text-red-500">*</span></label>
          <input v-model="form.username" type="text" class="input" placeholder="usuario.login" autocomplete="off" />
          <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>
        </div>
        <div>
          <label class="label">
            Senha <span v-if="!isEdit" class="text-red-500">*</span>
            <span v-else class="text-slate-400 font-normal">(em branco = manter atual)</span>
          </label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="input pr-10"
              placeholder="••••••••"
              autocomplete="new-password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>
        <div>
          <label class="label">Perfil <span class="text-red-500">*</span></label>
          <select v-model="form.role" class="input">
            <option v-for="opt in roleOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
        <div>
          <label class="label">Status</label>
          <select v-model="form.status" class="input">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Dados profissionais -->
    <div class="card card-body space-y-4">
      <h3 class="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">Dados Profissionais</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-if="showCrm">
          <label class="label">CRM</label>
          <input v-model="form.crm" type="text" class="input" placeholder="CRM/SP 000000" />
        </div>
        <div v-if="showCoren">
          <label class="label">COREN</label>
          <input v-model="form.coren" type="text" class="input" placeholder="COREN/SP 000000" />
        </div>
        <div v-if="showCrm">
          <label class="label">Especialidade</label>
          <input v-model="form.specialty" type="text" class="input" placeholder="Alergologia e Imunologia" />
        </div>
      </div>
    </div>

    <!-- Ações -->
    <div class="flex justify-end gap-3">
      <button type="button" class="btn-secondary" @click="emit('cancel')">Cancelar</button>
      <button type="submit" class="btn-primary" :disabled="isLoading">
        <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        {{ isEdit ? 'Salvar alterações' : 'Cadastrar usuário' }}
      </button>
    </div>
  </form>
</template>
