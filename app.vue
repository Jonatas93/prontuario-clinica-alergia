<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ToastContainer />
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const patientsStore = usePatientsStore()
const appointmentsStore = useAppointmentsStore()
const recordsStore = useRecordsStore()

onMounted(() => {
  authStore.init()
  patientsStore.init()
  appointmentsStore.init()
  recordsStore.init()
})
</script>
