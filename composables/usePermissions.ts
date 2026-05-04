export function usePermissions() {
  const auth = useAuthStore()

  const canEditPatients = computed(() =>
    auth.user?.role === 'admin' || auth.user?.role === 'medico'
  )

  const canManageUsers = computed(() => auth.user?.role === 'admin')

  return { canEditPatients, canManageUsers }
}
