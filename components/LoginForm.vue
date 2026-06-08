<template>
  <form @submit.prevent="handleLogin" novalidate>
    <div class="field">
      <label for="login-email" class="label">Email</label>
      <input
        id="login-email"
        v-model="email"
        type="email"
        class="input"
        placeholder="you@example.com"
        autocomplete="email"
        required
        :disabled="loading"
        :aria-describedby="error ? 'login-error' : undefined"
      />
    </div>

    <div class="field" style="margin-top: var(--space-4);">
      <label for="login-password" class="label">Password</label>
      <div class="input-wrapper">
        <input
          id="login-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="input"
          placeholder="••••••••"
          autocomplete="current-password"
          required
          :disabled="loading"
          :aria-describedby="error ? 'login-error' : undefined"
        />
        <button
          type="button"
          class="input-action"
          @click="showPassword = !showPassword"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          :aria-pressed="showPassword"
          tabindex="0"
        >
          <EyeOff v-if="showPassword" :size="16" aria-hidden="true" />
          <Eye v-else :size="16" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div
      v-if="error"
      id="login-error"
      class="alert alert-error"
      role="alert"
      style="margin-top: var(--space-4);"
    >
      <AlertCircle :size="16" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px;" />
      <span>{{ error }}</span>
    </div>

    <button
      type="submit"
      class="btn btn-primary btn-full btn-lg"
      :disabled="loading"
      style="margin-top: var(--space-6);"
    >
      <span v-if="loading" class="spinner spinner-sm" aria-hidden="true"></span>
      <span class="sr-only" v-if="loading">Signing in, please wait</span>
      <span aria-hidden="loading">{{ loading ? 'Signing in…' : 'Sign in' }}</span>
    </button>
  </form>
</template>

<script lang="ts" setup>
import { Eye, EyeOff, AlertCircle } from 'lucide-vue-next'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

const { login } = await useAuth()

const handleLogin = async () => {
  error.value = null
  loading.value = true

  try {
    const userData: UserInput = {
      email: email.value,
      password: password.value,
    }
    await login(userData)
    await navigateTo('/')
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
