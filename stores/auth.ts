import { defineStore } from 'pinia'
import type { User, UserRole } from '~/types'

const VALID_ROLES: UserRole[] = ['admin', 'medico', 'enfermeiro']

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  function init() {
    const saved = localStorage.getItem('auth_user')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (VALID_ROLES.includes(parsed.role)) {
          user.value = parsed
        } else {
          localStorage.removeItem('auth_user')
        }
      } catch {}
    }
  }

  function setUser(loggedUser: User) {
    user.value = loggedUser
    localStorage.setItem('auth_user', JSON.stringify(loggedUser))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  return { user, isAuthenticated, init, setUser, logout }
})
