import { defineStore } from 'pinia'
import type { Notification } from '~/types'

export const useNotificationsStore = defineStore('notifications', () => {
  const items = ref<Notification[]>([])

  function push(n: Omit<Notification, 'id'>) {
    const id = crypto.randomUUID()
    items.value.push({ ...n, id })
    setTimeout(() => remove(id), 4000)
    return id
  }

  function success(title: string, message?: string) {
    return push({ type: 'success', title, message })
  }

  function error(title: string, message?: string) {
    return push({ type: 'error', title, message })
  }

  function warning(title: string, message?: string) {
    return push({ type: 'warning', title, message })
  }

  function info(title: string, message?: string) {
    return push({ type: 'info', title, message })
  }

  function remove(id: string) {
    items.value = items.value.filter(n => n.id !== id)
  }

  return { items, push, success, error, warning, info, remove }
})
