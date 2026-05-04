<template>
  <div class="w-full max-w-md">
    <!-- Card -->
    <div class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white">AllergyMed</h1>
        <p class="text-primary-200 text-sm mt-1">Sistema de Prontuário Eletrônico</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-primary-100 mb-1">Usuário</label>
          <input
            v-model="form.username"
            type="text"
            placeholder="Digite seu usuário"
            autocomplete="username"
            class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300
              focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-primary-100 mb-1">Senha</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Digite sua senha"
              autocomplete="current-password"
              class="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300
                focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-colors"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-primary-300 hover:text-white transition-colors"
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
        </div>

        <Transition name="error">
          <div v-if="error" class="flex items-center gap-2 text-red-300 text-sm bg-red-900/30 rounded-xl px-3 py-2 border border-red-500/30">
            <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ error }}
          </div>
        </Transition>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 px-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50
            focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <!-- Hint -->
      <div class="mt-6 text-center text-xs text-primary-300 bg-white/5 rounded-xl p-3 border border-white/10">
        <p class="font-medium mb-1 text-primary-200">Acesso de demonstração</p>
        <p>Usuário: <code class="font-mono text-white">admin</code></p>
        <p>Senha: <code class="font-mono text-white">admin123</code></p>
      </div>
    </div>

    <p class="text-center text-primary-400 text-xs mt-6">
      &copy; {{ new Date().getFullYear() }} AllergyMed. Todos os direitos reservados.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const auth = useAuthStore()
const usersStore = useUsersStore()
const router = useRouter()

const form = reactive({ username: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

if (auth.isAuthenticated) {
  await navigateTo('/dashboard')
}

async function handleLogin() {
  error.value = ''
  if (!form.username || !form.password) {
    error.value = 'Preencha todos os campos.'
    return
  }
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  const user = usersStore.findByCredentials(form.username, form.password)
  loading.value = false
  if (user) {
    auth.setUser(user)
    router.push('/dashboard')
  } else {
    error.value = 'Usuário ou senha incorretos.'
  }
}
</script>

<style scoped>
.error-enter-active, .error-leave-active { transition: all 0.2s; }
.error-enter-from, .error-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
