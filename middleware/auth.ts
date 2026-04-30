export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') return

  const saved = localStorage.getItem('auth_user')
  if (!saved) {
    return navigateTo('/login')
  }
})
