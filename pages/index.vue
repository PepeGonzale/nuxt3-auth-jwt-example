<template>
  <main class="page-container">
    <!-- Hero -->
    <section class="hero">
      <span class="label-chip">JWT · Role-Based · Nuxt 3</span>

      <h1 class="hero-heading">Secure by default.</h1>

      <p class="hero-sub">
        A complete authentication reference built with Nuxt 3, JWT, and role-based access control.
      </p>

      <div class="hero-cta">
        <template v-if="authUser">
          <NuxtLink to="/private" class="btn btn-primary btn-lg">View Private Page</NuxtLink>
          <NuxtLink v-if="userAdmin" to="/admin" class="btn btn-secondary btn-lg">Admin Panel</NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="btn btn-primary btn-lg">Get Started</NuxtLink>
          <NuxtLink to="/public" class="btn btn-secondary btn-lg">See Public Page</NuxtLink>
        </template>
      </div>
    </section>

    <!-- Auth status card -->
    <section v-if="authUser" class="card auth-card">
      <div class="auth-card-left">
        <User :size="20" class="auth-icon" aria-hidden="true" />
        <div class="auth-info">
          <span class="auth-email">{{ authUser.email }}</span>
          <div class="auth-roles">
            <span
              v-for="role in authUser.role"
              :key="role"
              :class="['badge', role === 'admin' ? 'badge-accent' : 'badge-primary']"
            >{{ role }}</span>
          </div>
        </div>
      </div>
      <span class="auth-session-label">Authenticated session</span>
    </section>

    <!-- Feature grid -->
    <section class="feature-grid">
      <div class="card feature-card">
        <div class="feature-icon-wrap" style="color: var(--color-primary);">
          <Lock :size="22" aria-hidden="true" />
        </div>
        <h2 class="feature-heading">JWT Auth</h2>
        <p class="feature-desc">
          Stateless, cookie-based sessions with configurable expiry and server-side verification.
        </p>
      </div>

      <div class="card feature-card">
        <div class="feature-icon-wrap" style="color: var(--color-accent);">
          <Shield :size="22" aria-hidden="true" />
        </div>
        <h2 class="feature-heading">Role Control</h2>
        <p class="feature-desc">
          Middleware guards protect routes based on roles. Admin-only, user-only, and guest-only patterns.
        </p>
      </div>

      <div class="card feature-card">
        <div class="feature-icon-wrap" style="color: var(--color-success);">
          <Zap :size="22" aria-hidden="true" />
        </div>
        <h2 class="feature-heading">Nuxt Middleware</h2>
        <p class="feature-desc">
          Route-level guards with SSR and client-side support. Automatic redirect on unauthorized access.
        </p>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { Lock, Shield, Zap, User } from 'lucide-vue-next'

const { authUser, userAdmin } = await useAuth()
</script>

<style scoped>
/* ── Hero ────────────────────────────────────────────────── */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-20) 0 var(--space-16);
  gap: var(--space-5);
}

.label-chip {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--bg-surface-2);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.06em;
  font-weight: var(--font-weight-medium);
}

.hero-heading {
  margin: 0;
  font-size: var(--text-display);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  line-height: var(--leading-tight);
}

.hero-sub {
  margin: 0;
  font-size: var(--text-body-lg);
  color: var(--text-secondary);
  max-width: 560px;
  line-height: var(--leading-normal);
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-3);
}

/* ── Auth card ───────────────────────────────────────────── */
.auth-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  margin-bottom: var(--space-12);
  flex-wrap: wrap;
  gap: var(--space-4);
}

.auth-card-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.auth-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.auth-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.auth-email {
  font-size: var(--text-body);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.auth-roles {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.auth-session-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

/* ── Feature grid ────────────────────────────────────────── */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

@media (max-width: 720px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.feature-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--bg-surface-2);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.feature-heading {
  margin: 0;
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.feature-desc {
  margin: 0;
  font-size: var(--text-body);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}
</style>
