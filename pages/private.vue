<template>
  <main class="page-container private-layout">
    <!-- Page heading -->
    <header class="page-heading">
      <h1 class="page-title">Private Page</h1>
      <span class="badge badge-primary">Members only</span>
    </header>

    <p class="page-desc">
      This page is protected. Only authenticated users can access it.
    </p>

    <!-- User info card -->
    <section v-if="authUser" class="card user-card">
      <div class="user-row">
        <User :size="20" class="user-icon" aria-hidden="true" />
        <span class="user-meta-label">Authenticated as</span>
      </div>

      <p class="user-email">{{ authUser.email }}</p>

      <div class="user-roles">
        <span
          v-for="role in authUser.role"
          :key="role"
          :class="['badge', role === 'admin' ? 'badge-accent' : 'badge-primary']"
        >{{ role }}</span>
      </div>

      <hr class="user-divider" />

      <div class="user-footer">
        <Lock :size="14" class="user-footer-icon" aria-hidden="true" />
        <span class="user-footer-text">
          Your session is protected by a JWT stored in an httpOnly cookie.
        </span>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { User, Lock } from 'lucide-vue-next'

definePageMeta({
  middleware: ['user-only']
})

const authUser = useAuthUser()
</script>

<style scoped>
.private-layout {
  max-width: var(--content-md);
}

.page-heading {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.page-title {
  margin: 0;
  font-size: var(--text-h1);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.page-desc {
  margin: 0 0 var(--space-8);
  font-size: var(--text-body);
  color: var(--text-secondary);
}

/* User card */
.user-card {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.user-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.user-icon {
  color: var(--color-primary);
}

.user-meta-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.user-email {
  margin: 0;
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.user-roles {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.user-divider {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: var(--space-2) 0;
}

.user-footer {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}

.user-footer-icon {
  color: var(--text-muted);
  flex-shrink: 0;
  margin-top: 1px;
}

.user-footer-text {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--leading-snug);
}
</style>
