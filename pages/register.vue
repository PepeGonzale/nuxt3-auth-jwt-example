<template>
  <div class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">Create Account</h1>
      <p class="text-gray-300">Sign up to access all features</p>
    </div>

    <div class="w-full max-w-md mx-auto">
      <form class="space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20" @submit.prevent="handleRegister">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="your@email.com"
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
            minlength="6"
            :disabled="loading"
            class="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
          <p class="text-xs text-gray-400">Minimum 6 characters</p>
        </div>
        <div class="space-y-2">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-200">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
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
        <div v-if="success" class="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
          {{ success }}
        </div>
        <button
          type="submit"
          :disabled="loading || password !== confirmPassword"
          class="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
          <span>{{ loading ? 'Creating account...' : 'Create Account' }}</span>
        </button>
        <div class="text-center">
          <p class="text-sm text-gray-300">
            Already have an account?
            <NuxtLink to="/login" class="text-blue-400 hover:text-blue-300 font-medium underline">
              Sign in
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: 'guest-only'
})

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)
const { register } = await useAuth()
const router = useRouter()

const handleRegister = async () => {
  error.value = null
  success.value = null
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return
  }
  
  loading.value = true
  
  try {
    const userData: UserInput = {
      email: email.value,
      password: password.value
    }
    
    await register(userData)
    success.value = 'Account created successfully. Redirecting...'
    
    setTimeout(() => {
      router.push("/")
    }, 1500)
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Error creating account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

