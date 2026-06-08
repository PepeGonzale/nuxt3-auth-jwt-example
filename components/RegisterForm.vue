<template>
  <form @submit.prevent="handleRegister" novalidate>
    <div class="field">
      <label for="register-email" class="label">Email</label>
      <input
        id="register-email"
        v-model="email"
        type="email"
        class="input"
        placeholder="you@example.com"
        autocomplete="email"
        required
        :disabled="loading"
        :aria-describedby="error ? 'register-error' : undefined"
      />
    </div>

    <div class="field" style="margin-top: var(--space-4);">
      <label for="register-password" class="label">Password</label>
      <div class="input-wrapper">
        <input
          id="register-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="input"
          placeholder="••••••••"
          autocomplete="new-password"
          required
          :disabled="loading"
          :aria-describedby="error ? 'register-error' : 'register-password-hint'"
        />
        <button
          type="button"
          class="input-action"
          @click="showPassword = !showPassword"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          :aria-pressed="showPassword"
        >
          <EyeOff v-if="showPassword" :size="16" aria-hidden="true" />
          <Eye v-else :size="16" aria-hidden="true" />
        </button>
      </div>
      <span id="register-password-hint" style="font-size: var(--text-xs); color: var(--text-muted);">
        Minimum 6 characters
      </span>
    </div>

    <div class="field" style="margin-top: var(--space-4);">
      <label for="register-confirm" class="label">Confirm password</label>
      <div class="input-wrapper">
        <input
          id="register-confirm"
          v-model="confirmPassword"
          :type="showConfirm ? 'text' : 'password'"
          class="input"
          placeholder="••••••••"
          autocomplete="new-password"
          required
          :disabled="loading"
          :aria-describedby="error ? 'register-error' : undefined"
        />
        <button
          type="button"
          class="input-action"
          @click="showConfirm = !showConfirm"
          :aria-label="showConfirm ? 'Hide confirm password' : 'Show confirm password'"
          :aria-pressed="showConfirm"
        >
          <EyeOff v-if="showConfirm" :size="16" aria-hidden="true" />
          <Eye v-else :size="16" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div
      v-if="error"
      id="register-error"
      class="alert alert-error"
      role="alert"
      style="margin-top: var(--space-4);"
    >
      <AlertCircle :size="16" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px;" />
      <span>{{ error }}</span>
    </div>

    <div
      v-if="success"
      class="alert alert-success"
      role="status"
      style="margin-top: var(--space-4);"
    >
      <CheckCircle2 :size="16" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px;" />
      <span>{{ success }}</span>
    </div>

    <button
      type="submit"
      class="btn btn-primary btn-full btn-lg"
      :disabled="loading"
      style="margin-top: var(--space-6);"
    >
      <span v-if="loading" class="spinner spinner-sm" aria-hidden="true"></span>
      <span class="sr-only" v-if="loading">Creating account, please wait</span>
      <span>{{ loading ? 'Creating account…' : 'Create account' }}</span>
    </button>

    <p style="text-align: center; margin-top: var(--space-6); font-size: var(--text-sm); color: var(--text-secondary);">
      Already have an account?
      <NuxtLink to="/login" style="color: var(--color-primary); font-weight: var(--font-weight-medium); text-decoration: none;">
        Sign in
      </NuxtLink>
    </p>
  </form>
</template>

<script lang="ts" setup>
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-vue-next'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const { register } = await useAuth()

const handleRegister = async () => {
  error.value = null
  success.value = null

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    const userData: UserInput = {
      email: email.value,
      password: password.value,
    }

    await register(userData)
    success.value = 'Account created! Redirecting…'
    await navigateTo('/')
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Error creating account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
