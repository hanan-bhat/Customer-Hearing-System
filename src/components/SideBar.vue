<script setup>
import store from '@/store'
import { SwatchIcon, RectangleStackIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <div class="w-80 h-screen">
    <div class="h-16 p-1 flex align-middle">
      <img
        src="https://i.postimg.cc/cJGRCBvz/fox-007-removebg-preview.png"
        class="w-14 mx-2"
      />
      <h2 class="my-auto font-bold leading-none">
        Customer <br /><span class="text-2xl">Helpdesk</span>
      </h2>
      <div class="dropdown dropdown-end ml-8 my-auto cursor-pointer w-8 h-8">
        <div tabindex="0">
          <img
            :src="store?.state?.user[0]?.avatar_url"
            class="w-10 rounded-full"
          />
        </div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-1"
        >
          <li class="border-b pb-1 border-slate-300">
            <span class="font-bold block"
              >{{ store?.state?.user[0]?.name }}
              <span class="font-normal text-slate-400"
                >@{{ store?.state?.user[0]?.username }}</span
              ></span
            >
          </li>
          <li class="text-slate-600"><a>Edit profile</a></li>
          <li class="text-slate-600"><a>Preferences</a></li>
          <li class="text-slate-600 border-t pt-1 border-slate-300">
            <a>Sign out</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="h-screen bg-white">
      <h2 class="px-3 pt-2 font-bold text-sm">Your work</h2>
      <ul class="menu w-full menu-md font-semibold text-slate-600 grid gap-1">
        <li>
          <RouterLink to="/"
            ><swatch-icon class="icon w-5" />Projects</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/allissues"
            ><rectangle-stack-icon class="icon w-5" /> Issues</RouterLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
