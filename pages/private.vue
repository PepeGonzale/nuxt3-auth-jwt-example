<template>
    <div>Private</div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: 'user-only'
})
</script>