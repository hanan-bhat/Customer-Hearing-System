<script setup>
import router from '@/router'
import store from '@/store'
import { onMounted, reactive } from 'vue'
import {
  LockClosedIcon,
  GlobeAltIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/vue/24/outline'
import moment from 'moment'

const project = reactive([])

onMounted(() => {
  if (store?.state?.projects?.length) {
    project.push(
      store.state.projects[0].find(
        (project) => project.id === Number(router.currentRoute.value.query.id)
      )
    )
  } else {
    router.push({ path: '/' })
  }
})
</script>

<template>
  <div v-if="project.length" class="w-full grid grid-rows-1 gap-0.5">
    <div class="navbar bg-base-100 px-10">
      <div class="text-sm breadcrumbs">
        <ul>
          <!-- <li>
            <RouterLink to="/">{{
              project[0]?.path_with_namespace?.split('/')[0]
            }}</RouterLink>
          </li> -->
          <li>
            <RouterLink to="/">{{ project[0]?.name }}</RouterLink>
          </li>
          <li class="font-semibold">Issues</li>
        </ul>
      </div>
    </div>
    <div class="h-screen bg-white p-4">
      <div class="flex gap-5 mb-8">
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
              project[0]?.name.substring(0, 1).toUpperCase()
            }}</span>
          </div>
        </div>
        <div class="flex gap-3 m-auto ml-0">
          <span class="font-bold text-3xl">{{ project[0].name }}</span>
          <lock-closed-icon
            class="icon w-4 mt-1 lg:tooltip"
            v-if="project[0].visibility == 'private'"
            data-tip="hello"
          />
          <globe-alt-icon class="icon w-4 mt-2 lg:tooltip" v-else />
        </div>
      </div>
      <div>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th class="w-1 border-b-2 border-[#1F75CB]">
                  Issues
                  <div class="badge badge-ghost text-xs">
                    {{ project[0].open_issues_count }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="store.state.issues.length">
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
                            project: project[0].id,
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
            <tbody v-else>
              <div
                class="flex flex-row gap-10 w-full mb-5 mt-5"
                v-for="index in 5"
                :key="index"
              >
                <div class="skeleton w-20 h-20"></div>
                <div class="my-auto">
                  <div class="skeleton h-4 w-80 my-auto mr-40 mb-1"></div>
                  <div class="skeleton h-4 w-80 my-auto mr-40"></div>
                </div>
                <div class="my-auto">
                  <div class="skeleton h-4 w-20 mb-1"></div>
                  <div class="skeleton h-4 w-48 my-auto"></div>
                </div>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
