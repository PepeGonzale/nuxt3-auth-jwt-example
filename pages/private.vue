<script lang="ts" setup>
definePageMeta({
  middleware: ["user-only"],
});
const authUser = useAuthUser();
watch(authUser, () => {
  if (!authUser.value) return navigateTo({name: "login"})
  console.log(authUser)
})
</script>
<template>
  <div>Private</div>
  <div v-if="authUser">
    This page is only visible for user who logged in current user:
    {{ authUser }}
  </div>
</template>

