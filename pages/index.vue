<template>
  <div class="text-white">
    <div class="text-center">
      <h1>Home</h1>
      <div>
        Simple authentication with Nuxt3
        <span v-if="authUser">current user: {{ authUser.email }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const {authUser} = await useAuth()
</script>
