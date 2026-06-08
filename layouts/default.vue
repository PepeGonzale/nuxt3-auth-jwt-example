<template>
  <div style="min-height: 100dvh; display: flex; flex-direction: column;">
    <header class="nav">
      <nav class="nav-inner">
        <!-- Logo -->
        <NuxtLink to="/" class="nav-logo">
          <Shield :size="18" aria-hidden="true" />
          <span>Sentinel</span>
        </NuxtLink>

        <!-- Desktop nav links -->
        <div class="nav-links" role="navigation" aria-label="Main navigation">
          <NuxtLink to="/" class="nav-link" active-class="nav-link-active" exact>Home</NuxtLink>
          <NuxtLink to="/public" class="nav-link" active-class="nav-link-active">Public</NuxtLink>
          <NuxtLink v-if="authUser" to="/private" class="nav-link" active-class="nav-link-active">Private</NuxtLink>
          <NuxtLink v-if="userAdmin" to="/admin" class="nav-link" active-class="nav-link-active">Admin</NuxtLink>
        </div>

        <!-- Right side actions -->
        <div class="nav-actions">
          <template v-if="authUser">
            <span class="nav-user-email" :title="authUser.email">{{ authUser.email }}</span>
            <button class="btn btn-ghost btn-sm" @click="handleLogout" type="button">
              <LogOut :size="14" aria-hidden="true" />
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="btn btn-ghost btn-sm">Login</NuxtLink>
            <NuxtLink to="/register" class="btn btn-primary btn-sm">Register</NuxtLink>
          </template>

          <!-- Mobile hamburger -->
          <button
            class="nav-hamburger btn btn-ghost btn-sm"
            @click="mobileOpen = !mobileOpen"
            :aria-expanded="mobileOpen"
            aria-label="Toggle navigation menu"
            type="button"
          >
            <X v-if="mobileOpen" :size="18" aria-hidden="true" />
            <Menu v-else :size="18" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <!-- Mobile drawer -->
      <div v-if="mobileOpen" class="nav-mobile" role="navigation" aria-label="Mobile navigation">
        <NuxtLink to="/" class="nav-mobile-link" @click="mobileOpen = false">Home</NuxtLink>
        <NuxtLink to="/public" class="nav-mobile-link" @click="mobileOpen = false">Public</NuxtLink>
        <NuxtLink v-if="authUser" to="/private" class="nav-mobile-link" @click="mobileOpen = false">Private</NuxtLink>
        <NuxtLink v-if="userAdmin" to="/admin" class="nav-mobile-link" @click="mobileOpen = false">Admin</NuxtLink>
        <div class="nav-mobile-divider" aria-hidden="true"></div>
        <template v-if="authUser">
          <span class="nav-mobile-email">{{ authUser.email }}</span>
          <button class="btn btn-ghost btn-sm nav-mobile-logout" @click="handleLogout" type="button">
            <LogOut :size="14" aria-hidden="true" />
            Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="btn btn-ghost btn-sm" @click="mobileOpen = false">Login</NuxtLink>
          <NuxtLink to="/register" class="btn btn-primary btn-sm" @click="mobileOpen = false">Register</NuxtLink>
        </template>
      </div>
    </header>

    <main style="flex: 1; padding-top: var(--nav-height);">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Shield, LogOut, Menu, X } from 'lucide-vue-next'

const { userAdmin, logout, authUser } = await useAuth()
const route = useRoute()
const mobileOpen = ref(false)

// Close mobile drawer on route change
watch(() => route.path, () => {
  mobileOpen.value = false
})

const handleLogout = async () => {
  await logout()
  await navigateTo('/login')
}
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  background: var(--bg-surface-1);
  border-bottom: 1px solid var(--border-subtle);
}

.nav-inner {
  display: flex;
  align-items: center;
  height: var(--nav-height);
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 var(--space-6);
  gap: var(--space-6);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-decoration: none;
  flex-shrink: 0;
  transition: opacity var(--duration-base) var(--ease-standard);
}
.nav-logo:hover { opacity: 0.8; }

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex: 1;
}

.nav-link {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--duration-base) var(--ease-standard),
              background-color var(--duration-base) var(--ease-standard);
}
.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-surface-2);
}
.nav-link-active {
  color: var(--color-primary) !important;
  background: var(--color-primary-muted) !important;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.nav-user-email {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-hamburger {
  display: none;
}

/* Mobile drawer */
.nav-mobile {
  position: fixed;
  top: var(--nav-height);
  left: 0;
  right: 0;
  background: var(--bg-surface-1);
  border-bottom: 1px solid var(--border-subtle);
  padding: var(--space-4) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  z-index: 99;
  box-shadow: var(--shadow-3);
}

.nav-mobile-link {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-body);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--duration-base) var(--ease-standard),
              background-color var(--duration-base) var(--ease-standard);
}
.nav-mobile-link:hover {
  color: var(--text-primary);
  background: var(--bg-surface-2);
}

.nav-mobile-divider {
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-2) 0;
}

.nav-mobile-email {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  padding: 0 var(--space-4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-mobile-logout {
  align-self: flex-start;
}

@media (max-width: 767px) {
  .nav-links {
    display: none;
  }
  .nav-user-email {
    display: none;
  }
  /* Hide the desktop logout/auth buttons, show only hamburger */
  .nav-actions > :not(.nav-hamburger) {
    display: none;
  }
  .nav-hamburger {
    display: inline-flex;
  }
}
</style>
