<template>
  <main class="page-container">
    <!-- Page header -->
    <header class="admin-header">
      <div class="admin-header-left">
        <h1 class="page-title">Admin Panel</h1>
        <Shield :size="22" class="admin-shield" aria-hidden="true" />
      </div>
      <span v-if="!loading && !error" class="badge badge-neutral">{{ users.length }} users</span>
    </header>

    <p class="page-desc">Manage registered users and their roles.</p>

    <!-- Loading skeleton -->
    <div v-if="loading" class="card skeleton-card">
      <div v-for="i in 4" :key="i" class="skeleton skeleton-row"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-error" role="alert">
      <AlertCircle :size="16" aria-hidden="true" style="flex-shrink: 0; margin-top: 1px;" />
      <div class="error-body">
        <span>{{ error }}</span>
        <button class="btn btn-secondary btn-sm" style="margin-top: var(--space-3);" @click="fetchUsers">
          Retry
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="users.length === 0" class="card empty-state">
      <Users2 :size="40" class="empty-icon" aria-hidden="true" />
      <h2 class="empty-heading">No users found</h2>
      <p class="empty-desc">No registered users are available at this time.</p>
    </div>

    <!-- Users table -->
    <div v-else class="card table-card">
      <table class="users-table">
        <thead>
          <tr>
            <th class="th">User</th>
            <th class="th">Role</th>
            <th class="th">Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="tr"
            :class="{ 'tr-admin': user.role?.includes('admin') }"
          >
            <td class="td">
              <div class="user-cell">
                <span class="user-email">{{ user.email }}</span>
                <span class="user-id">{{ user.id }}</span>
              </div>
            </td>
            <td class="td">
              <div class="role-cell">
                <span
                  v-for="role in user.role"
                  :key="role"
                  :class="['badge', role === 'admin' ? 'badge-accent' : 'badge-primary']"
                >{{ role }}</span>
              </div>
            </td>
            <td class="td">
              <span class="joined-label">Seed user</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Shield, AlertCircle, Users2 } from 'lucide-vue-next'

definePageMeta({
  middleware: 'admin-only'
})

const { authUser, userAdmin } = await useAuth()

const users = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchUsers = async () => {
  loading.value = true
  error.value = null
  try {
    const data = await $fetch('/api/user/users')
    users.value = data.users
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
/* Header */
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
  gap: var(--space-4);
  flex-wrap: wrap;
}

.admin-header-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.page-title {
  margin: 0;
  font-size: var(--text-h1);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.admin-shield {
  color: var(--color-accent);
}

.page-desc {
  margin: 0 0 var(--space-8);
  font-size: var(--text-body);
  color: var(--text-secondary);
}

/* Skeleton */
.skeleton-card {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skeleton-row {
  height: 20px;
  width: 100%;
  border-radius: var(--radius-sm);
}

/* Error */
.error-body {
  display: flex;
  flex-direction: column;
}

/* Empty state */
.empty-state {
  padding: var(--space-16) var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-3);
}

.empty-icon {
  color: var(--text-muted);
}

.empty-heading {
  margin: 0;
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.empty-desc {
  margin: 0;
  font-size: var(--text-body);
  color: var(--text-muted);
}

/* Table */
.table-card {
  overflow: hidden;
  padding: 0;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.th {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  background: var(--bg-surface-2);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tr {
  border-top: 1px solid var(--border-subtle);
  transition: background-color var(--duration-base) var(--ease-standard);
}

.tr:hover {
  background: var(--bg-surface-1);
}

.tr-admin {
  border-left: 2px solid var(--color-accent);
}

.td {
  padding: var(--space-4);
  vertical-align: middle;
}

.user-cell {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.user-email {
  font-size: var(--text-body);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}

.user-id {
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-family: monospace;
}

.role-cell {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.joined-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
}
</style>
