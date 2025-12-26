<template>
  <div class="space-y-8">
    <div class="text-center space-y-2">
      <div class="flex items-center justify-center gap-2">
        <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Panel de Administración
        </h1>
      </div>
      <p class="text-gray-300">Esta página solo es visible para usuarios con rol de administrador</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>

    <div v-else-if="error" class="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
      {{ error }}
    </div>

    <div v-else class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
      <div class="p-6 border-b border-white/10">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold">Usuarios del Sistema</h2>
          <div class="px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-lg">
            <span class="text-sm text-blue-200">Total: {{ users?.length || 0 }} usuarios</span>
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-white/5">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Roles</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr 
              v-for="user in users" 
              :key="user.id"
              class="hover:bg-white/5 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {{ user.email.charAt(0).toUpperCase() }}
                  </div>
                  <span class="font-medium">{{ user.email }}</span>
                  <span v-if="user.email === authUser?.email" class="px-2 py-1 bg-green-500/20 border border-green-400/50 rounded text-xs text-green-200">
                    Tú
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <code class="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">{{ user.id }}</code>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex gap-2">
                  <span 
                    v-for="role in user.role" 
                    :key="role"
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      role === 'admin' 
                        ? 'bg-purple-500/20 border border-purple-400/50 text-purple-200' 
                        : 'bg-blue-500/20 border border-blue-400/50 text-blue-200'
                    ]"
                  >
                    {{ role }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-sm text-gray-300">Activo</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: 'admin-only'
})

const authUser = useAuthUser()
const loading = ref(true)
const error = ref<string | null>(null)
const users = ref<User[]>([])

watch(authUser, () => {
  if (!authUser.value) return navigateTo({name: "login"})
})

try {
  const data = await $fetch('/api/user/users')
  users.value = data.users
} catch (err: any) {
  error.value = err?.message || 'Error al cargar los usuarios'
} finally {
  loading.value = false
}
</script>
