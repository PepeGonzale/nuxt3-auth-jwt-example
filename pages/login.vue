<template>
  <div class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">Iniciar Sesión</h1>
      <p class="text-gray-300">Esta página es accesible solo para invitados</p>
    </div>
    <LoginForm />
    <LoginCredentials />
  </div>
</template>
<script setup>
definePageMeta({
    middleware: 'guest-only'
})

const user = useAuthUser()
</script>
