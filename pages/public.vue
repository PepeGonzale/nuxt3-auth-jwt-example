<template>
  <main class="page-container public-layout">
    <!-- Page heading -->
    <header class="page-heading">
      <h1 class="page-title">Public Page</h1>
      <span class="badge badge-success">Public</span>
    </header>

    <p class="page-desc">
      This page is accessible to everyone — authenticated or not.
    </p>

    <!-- Auth status -->
    <section class="card status-card">
      <template v-if="authUser">
        <div class="status-row">
          <CheckCircle2 :size="20" class="status-icon-ok" aria-hidden="true" />
          <div class="status-body">
            <span class="status-label">You're signed in as</span>
            <span class="status-email">{{ authUser.email }}</span>
            <div class="status-roles">
              <span
                v-for="role in authUser.role"
                :key="role"
                :class="['badge', role === 'admin' ? 'badge-accent' : 'badge-primary']"
              >{{ role }}</span>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="alert alert-info">
          <Info :size="16" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px;" />
          <div>
            <span>You're browsing as a guest.</span>
            <div style="margin-top: var(--space-3);">
              <NuxtLink to="/login" class="btn btn-primary btn-sm">Sign in</NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Info box -->
    <section class="card info-box">
      <h2 class="info-heading">How it works</h2>
      <p class="info-body">
        No middleware is applied to this route. Any visitor can view this page regardless of authentication status.
      </p>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { CheckCircle2, Info } from 'lucide-vue-next'

const authUser = useAuthUser()
</script>

<style scoped>
.public-layout {
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

/* Status card */
.status-card {
  padding: var(--space-6);
  margin-bottom: var(--space-5);
}

.status-row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.status-icon-ok {
  color: var(--color-success);
  flex-shrink: 0;
  margin-top: 2px;
}

.status-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.status-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.status-email {
  font-size: var(--text-body);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.status-roles {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

/* Info box */
.info-box {
  background: var(--bg-surface-1);
  padding: var(--space-5);
}

.info-heading {
  margin: 0 0 var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.info-body {
  margin: 0;
  font-size: var(--text-body);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}
</style>
