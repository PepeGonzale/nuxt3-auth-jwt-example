<template>
  <div class="card" style="padding: var(--space-6);">
    <p class="credentials-title">Demo credentials</p>

    <div class="credentials-list">
      <!-- User row -->
      <div class="credentials-row">
        <div class="credentials-row-header">
          <User :size="14" aria-hidden="true" style="color: var(--color-primary); flex-shrink: 0;" />
          <span class="badge badge-primary">User</span>
        </div>
        <div class="credentials-fields">
          <span class="credentials-label">Email</span>
          <code class="credentials-value">user@gmail.com</code>
          <span class="credentials-label">Password</span>
          <code class="credentials-value">password</code>
        </div>
      </div>

      <div class="credentials-divider" aria-hidden="true"></div>

      <!-- Admin row -->
      <div class="credentials-row">
        <div class="credentials-row-header">
          <ShieldCheck :size="14" aria-hidden="true" style="color: var(--color-accent); flex-shrink: 0;" />
          <span class="badge badge-accent">Admin</span>
        </div>
        <div class="credentials-fields">
          <span class="credentials-label">Email</span>
          <code class="credentials-value">admin@gmail.com</code>
          <span class="credentials-label">Password</span>
          <code class="credentials-value">password</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, ShieldCheck } from 'lucide-vue-next'
</script>

<style scoped>
.credentials-title {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 var(--space-4) 0;
}

.credentials-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.credentials-divider {
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-3) 0;
}

.credentials-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.credentials-row-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.credentials-fields {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1) var(--space-3);
  align-items: center;
  padding-left: var(--space-1);
}

.credentials-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  white-space: nowrap;
}

.credentials-value {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  background: var(--bg-surface-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 2px var(--space-2);
  font-family: ui-monospace, 'Cascadia Code', monospace;
}
</style>
