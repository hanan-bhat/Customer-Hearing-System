<script setup>
import router from '@/router'
import store from '@/store'
import { onMounted } from 'vue'
import {
  ChatBubbleLeftEllipsisIcon,
  RectangleStackIcon,
  SwatchIcon,
} from '@heroicons/vue/24/outline'
import { getProjectName } from '@/utils/getProjectName'
import moment from 'moment'

onMounted(() => {
  if (store.state.projects.length) {
    store.actions.getAllIssues()
  } else {
    router.push({ path: '/' })
  }
})
</script>

<template>
  <div class="w-full grid grid-rows-1 gap-0.5">
    <div class="navbar bg-base-100 px-10">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <RouterLink to="/">Your work</RouterLink>
          </li>
          <li class="font-semibold">All Issues</li>
        </ul>
      </div>
    </div>
    <div class="h-screen bg-white p-4">
      <div v-if="store?.state?.issues[0]?.length">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th class="w-1 border-b-2 border-[#1F75CB]">
                  All Issues
                  <div class="badge badge-ghost text-xs">
                    {{ store?.state?.issues[0]?.length }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="issue in store.state.issues[0]" :key="issue.id">
                <td>
                  <div class="avatar placeholder">
                    <div
                      class="bg-neutral text-neutral rounded-xl w-16"
                      :style="{
                        backgroundColor: `rgba(${Math.floor(
                          Math.random() * 255
                        )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                          Math.random() * 255
                        )}, 0.2)`,
                      }"
                    >
                      <span class="text-3xl">{{
                        issue.title.substring(0, 1).toUpperCase()
                      }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <div
                      class="no-underline w-fit hover: cursor-pointer"
                      @click="store.actions.getNotes(issue._links.notes)"
                    >
                      <RouterLink
                        :to="{
                          path: `/issue/`,
                          query: {
                            id: issue.id,
                            project: issue.project_id,
                            iid: issue.iid,
                          },
                        }"
                      >
                        <span class="font-semibold hover:underline">{{
                          issue.title
                        }}</span>
                        <p class="text-slate-400 hover:no-underline">
                          {{
                            issue.description.length > 60
                              ? `${issue.description.substring(0, 60)}...`
                              : issue.description.length === 0
                              ? 'No description'
                              : issue.description
                          }}
                        </p>
                        <div class="flex gap-2 text-sm mt-2">
                          <div class="flex gap-1">
                            <swatch-icon class="icon w-4" />
                            <span>{{ getProjectName(issue.project_id) }}</span>
                          </div>
                          <span class="text-slate-500"
                            >@{{ issue.author.username }}</span
                          >
                        </div>
                      </RouterLink>
                    </div>
                  </div>
                </td>
                <td class="w-40">
                  <div class="text-slate-500 flex gap-2">
                    <span class="flex gap-1">
                      <chat-bubble-left-ellipsis-icon class="icon w-5"
                    /></span>
                    <span>{{ issue.user_notes_count }}</span>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500">
                      {{ `Created ${moment(issue.created_at).fromNow()}` }}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <div
          class="flex flex-row gap-10 w-full mb-5 mt-5"
          v-for="index in 5"
          :key="index"
        >
          <div class="skeleton w-20 h-20"></div>
          <div class="my-auto">
            <div class="skeleton h-4 w-80 mr-40 mb-1"></div>
            <div class="skeleton h-4 w-80 mr-40 mb-1"></div>
            <div class="skeleton h-4 w-80 mr-40"></div>
          </div>
          <div class="my-auto">
            <div class="skeleton h-4 w-20 mb-1"></div>
            <div class="skeleton h-4 w-48 my-auto"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
