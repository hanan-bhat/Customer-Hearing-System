<script setup>
import { RouterView } from 'vue-router'
import { inject } from 'vue'

const store = inject('store')
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
