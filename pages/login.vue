<template>
  <main class="page-container-sm login-shell">
    <header class="login-header">
      <h1 class="login-title">Welcome back</h1>
      <p class="login-sub">Sign in to your account</p>
    </header>

    <LoginForm />

    <div class="divider" style="margin: var(--space-6) 0;">or</div>

    <LoginCredentials />

    <p class="login-footer">
      Don't have an account?
      <NuxtLink to="/register" class="login-link">Create one</NuxtLink>
    </p>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'guest-only'
})
</script>

<style scoped>
.login-shell {
  padding-top: var(--space-20);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.login-title {
  margin: 0 0 var(--space-2);
  font-size: var(--text-h1);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.login-sub {
  margin: 0;
  font-size: var(--text-body);
  color: var(--text-secondary);
}

.login-footer {
  margin-top: var(--space-6);
  text-align: center;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.login-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.login-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}
</style>
