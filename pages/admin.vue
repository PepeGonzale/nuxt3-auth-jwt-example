<template>
    <div>
        <h1>Admin Page</h1>
        <p>This page should only be visible if user is logged in and has admin role</p>
    </div>
    <div v-for="user in users">
    
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: 'admin-only'
})
const authUser = useAuthUser();

watch(authUser, () => {
  if (!authUser.value) return navigateTo({name: "login"})
  console.log(authUser)
})
const { users } = await $fetch('/api/user/users')

</script>
