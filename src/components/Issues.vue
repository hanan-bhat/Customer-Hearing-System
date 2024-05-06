<script setup>
import router from '@/router'
import store from '@/store'
import { onMounted, reactive } from 'vue'
import {
  LockClosedIcon,
  GlobeAltIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/vue/24/outline'
import TipTap from './TipTap.vue'
import moment from 'moment'

const project = reactive([])
const issue = reactive([])

onMounted(() => {
  if (store?.state?.projects?.length) {
    project.push(
      store.state.projects[0].find(
        (project) =>
          project.id === Number(router.currentRoute.value.query.project)
      )
    )

    issue.push(
      store.state.issues[0].find(
        (issue) => issue.id === Number(router.currentRoute.value.query.id)
      )
    )
  } else {
    router.push({ path: '/' })
  }
})
</script>

<template>
  <div v-if="project.length" class="w-[90%] grid grid-rows-1 gap-0.5">
    <div class="navbar bg-base-100 px-10">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a>{{ project[0]?.path_with_namespace?.split('/')[0] }}</a>
          </li>
          <li>{{ project[0]?.name }}</li>
          <li class="font-semibold">Issue</li>
        </ul>
      </div>
    </div>
    <div class="h-screen bg-white p-4">
      <div class="flex gap-5 mb-8">
        <div class="avatar placeholder">
          <div
            class="bg-neutral text-neutral rounded-xl max-h-16 w-16"
            :style="{
              backgroundColor: `rgba(${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, 0.2)`,
            }"
          >
            <span class="text-3xl">{{
              issue[0].title.substring(0, 1).toUpperCase()
            }}</span>
          </div>
        </div>
        <div class="m-auto ml-0">
          <span class="font-bold text-3xl">{{ issue[0].title }}</span>
        </div>
      </div>
      <div>
        <h2 class="text-sm font-semibold w-8 border-b-2 border-[#1F75CB]">
          Description
        </h2>
        <p class="text-slate-400">
          {{
            issue[0].description.length
              ? issue[0].description
              : 'No description available'
          }}
        </p>
      </div>
      <div class="mt-6">
        <h2
          class="flex gap-2 text-sm font-semibold w-8 border-b-2 border-[#1F75CB]"
        >
          Comments
          <div class="badge badge-ghost text-xs">
            {{ issue[0].user_notes_count }}
          </div>
        </h2>
        <div v-if="store.state.notes.length">
          <div v-for="note in store.state.notes[0]" :key="note.id">
            <div class="my-4 flex gap-5">
              <div class="avatar">
                <div class="max-h-10 w-10 rounded-xl">
                  <img :src="note.author.avatar_url" />
                </div>
              </div>
              <div class="w-full border-[0.5px] rounded-md border-slate-200">
                <div class="min-h-14 w-full p-2">
                  <div class="flex gap-1">
                    <span class="text-sm font-semibold">{{
                      note.author.name
                    }}</span>
                    <span class="text-slate-500 text-sm"
                      >@{{ note.author.username }}</span
                    >
                    <span class="text-sm text-slate-500 align-middle h-auto">
                      <p>-</p>
                    </span>
                    <span class="text-sm text-slate-500">
                      {{ moment(note.created_at).fromNow() }}
                    </span>
                  </div>
                  <p class="text-sm text-slate-600">{{ note.body }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="ml-14 justify-end pb-10">
            <tip-tap :issueLink="issue[0]._links.notes" />
          </div>
        </div>
        <div v-else>
          <div class="h-60 flex justify-center align-middle">
            <span class="loading loading-bars loading-lg"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
