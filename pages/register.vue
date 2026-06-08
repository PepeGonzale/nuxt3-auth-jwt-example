<template>
  <main class="page-container-sm register-shell">
    <header class="register-header">
      <h1 class="register-title">Create account</h1>
      <p class="register-sub">Start with a free account today</p>
    </header>

    <RegisterForm />
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'guest-only'
})
</script>

<style scoped>
.register-shell {
  padding-top: var(--space-20);
}

.register-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.register-title {
  margin: 0 0 var(--space-2);
  font-size: var(--text-h1);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.register-sub {
  margin: 0;
  font-size: var(--text-body);
  color: var(--text-secondary);
}
</style>
