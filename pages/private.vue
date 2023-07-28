<template>
  <div>Private</div>
  <div v-if="authUser">
    This page is only visible for user who logged in current user:
    {{ authUser.email }}
  </div>
</template>
<script lang="ts" setup>
const { authUser } = await useAuth();
definePageMeta({
  middleware: "user-only",
});
</script>
