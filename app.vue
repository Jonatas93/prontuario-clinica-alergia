<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ToastContainer />
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const usersStore = useUsersStore()
const patientsStore = usePatientsStore()
const appointmentsStore = useAppointmentsStore()
const recordsStore = useRecordsStore()

onMounted(() => {
  usersStore.init()
  authStore.init()
  patientsStore.init()
  appointmentsStore.init()
  recordsStore.init()
})
</script>
