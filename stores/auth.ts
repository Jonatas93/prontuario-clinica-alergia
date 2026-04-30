import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  function init() {
    const saved = localStorage.getItem('auth_user')
    if (saved) {
      try { user.value = JSON.parse(saved) } catch {}
    }
  }

  function login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      user.value = {
        id: '1',
        name: 'Dr. Carlos Eduardo Silva',
        email: 'carlos.silva@allergymed.com.br',
        role: 'Médico Alergologista',
        crm: 'CRM/SP 123456'
      }
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  return { user, isAuthenticated, init, login, logout }
})
