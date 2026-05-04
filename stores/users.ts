import { defineStore } from 'pinia'
import type { User } from '~/types'
import { mockUsers } from '~/data/mock'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  function init() {
    const saved = localStorage.getItem('users_data')
    if (saved) {
      try { users.value = JSON.parse(saved) } catch {}
    } else {
      users.value = [...mockUsers]
      persist()
    }
  }

  function persist() {
    localStorage.setItem('users_data', JSON.stringify(users.value))
  }

  const sorted = computed(() =>
    [...users.value].sort((a, b) => a.name.localeCompare(b.name))
  )

  function getById(id: string) {
    return users.value.find(u => u.id === id)
  }

  function findByCredentials(username: string, password: string) {
    return users.value.find(u =>
      u.username === username && u.password === password && u.status === 'ativo'
    ) ?? null
  }

  function search(query: string) {
    const q = query.toLowerCase().trim()
    if (!q) return sorted.value
    return sorted.value.filter(u =>
      u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
    )
  }

  function add(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const now = new Date().toISOString()
    const user: User = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now }
    users.value.push(user)
    persist()
    return user
  }

  function update(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): boolean {
    const idx = users.value.findIndex(u => u.id === id)
    if (idx === -1) return false
    users.value[idx] = { ...users.value[idx], ...data, updatedAt: new Date().toISOString() }
    persist()
    return true
  }

  function remove(id: string) {
    users.value = users.value.filter(u => u.id !== id)
    persist()
  }

  return { users, sorted, init, getById, findByCredentials, search, add, update, remove }
})
