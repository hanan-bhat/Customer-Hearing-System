<script setup>
import { RouterView } from 'vue-router'
import { inject } from 'vue'

const store = inject('store')
const state = store.state
console.log('Stateeeee', state)
</script>

<template>
  <!-- <Home /> -->
  <!-- <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav> -->
  <RouterView />
</template>

<style scoped></style>
