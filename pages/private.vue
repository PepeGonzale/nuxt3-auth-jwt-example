<template>
  <div class="space-y-8">
    <div class="text-center space-y-2">
      <div class="flex items-center justify-center gap-2">
        <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Página Privada
        </h1>
      </div>
      <p class="text-gray-300">Esta página solo es visible para usuarios autenticados</p>
    </div>

    <div v-if="authUser" class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
      <div class="space-y-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h2 class="text-2xl font-semibold">Bienvenido, {{ authUser.email }}</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-white/5 rounded-lg p-4 border border-white/10">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-sm font-medium text-gray-400">Email</span>
            </div>
            <p class="text-lg font-semibold">{{ authUser.email }}</p>
          </div>

          <div class="bg-white/5 rounded-lg p-4 border border-white/10">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span class="text-sm font-medium text-gray-400">Roles</span>
            </div>
            <div class="flex gap-2 flex-wrap">
              <span 
                v-for="role in authUser.role" 
                :key="role"
                class="px-3 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-sm text-blue-200"
              >
                {{ role }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-200 mb-1">Información</p>
              <p class="text-sm text-gray-300">
                Has accedido exitosamente a una página protegida. Solo los usuarios autenticados pueden ver este contenido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center max-w-2xl mx-auto">
      <p class="text-red-200">No tienes acceso a esta página. Por favor, inicia sesión.</p>
      <NuxtLink 
        to="/login"
        class="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Ir a Login
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["user-only"],
})
const authUser = useAuthUser()
watch(authUser, () => {
  if (!authUser.value) return navigateTo({name: "login"})
})
</script>

