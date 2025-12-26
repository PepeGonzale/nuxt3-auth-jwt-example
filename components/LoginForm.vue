<template>
  <div class="w-full max-w-md mx-auto">
    <form class="space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20" @submit.prevent="handleLogin">
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="admin@gmail.com"
          required
          :disabled="loading"
          class="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
      </div>
      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-200">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          required
          :disabled="loading"
          class="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
      </div>
      <div v-if="error" class="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
        {{ error }}
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
        <span>{{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}</span>
      </button>
    </form>
  </div>
</template>
<script lang="ts" setup>
const email = ref('admin@gmail.com')
const password = ref('password')
const loading = ref(false)
const error = ref<string | null>(null)
const { login } = await useAuth()
const router = useRouter()

const handleLogin = async () => {
  error.value = null
  loading.value = true
  
  try {
    const userData: UserInput = {
      email: email.value,
      password: password.value
    }
    
    const data = await login(userData)
    
    if (data) {
      await router.push("/")
    } else {
      error.value = 'Credenciales incorrectas. Por favor, intenta de nuevo.'
    }
  } catch (err: any) {
    error.value = err?.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>
