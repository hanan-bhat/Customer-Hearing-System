<script setup>
import { SwatchIcon, RectangleStackIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-80 h-screen">
    <div class="h-20">Top</div>
    <div class="h-screen bg-white">
      <h2 class="px-3 pt-2 font-bold text-sm">Your work</h2>
      <ul class="menu w-full menu-md font-semibold text-slate-600 grid gap-1">
        <li>
          <RouterLink to="/"
            ><swatch-icon class="icon w-5" />Projects</RouterLink
          >
          <!-- <ul>
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul> -->
        </li>
        <li>
          <a><rectangle-stack-icon class="icon w-5" /> Issues</a>
        </li>
      </ul>
    </div>
  </div>
</template>
