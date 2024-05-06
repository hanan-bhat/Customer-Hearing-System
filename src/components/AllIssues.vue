<!-- <script setup>
import Project from './Project.vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  LockClosedIcon,
  GlobeAltIcon,
  RectangleStackIcon,
} from '@heroicons/vue/24/outline'
import store from '@/store'
import moment from 'moment'

const toolTipForPrivate = 'Hello World'

onMounted(() => {
  store.actions.getAllProjects()
  store.actions.getAllIssues()
})
</script>

<template>
  <div class="w-[90%] grid grid-rows-1 gap-0.5">
    <div class="navbar bg-base-100 px-10">
      <div class="text-sm breadcrumbs">
        <ul>
          <li><a>Your work</a></li>
          <li class="font-semibold">All Issues</li>
        </ul>
      </div>
    </div>
    <div class="h-screen bg-white p-4">
      <div class="overflow-x-auto" v-if="store.state.projects.length">
        <table class="table">
          <thead>
            <tr>
              <th class="w-1 border-b-2 border-[#1F75CB]">
                All
                <div class="badge badge-ghost text-xs">
                  {{ store.state.projects[0].length }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in store.state.projects[0]" :key="project.id">
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
                      project.name.substring(0, 1).toUpperCase()
                    }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="flex gap-2">
                  <div
                    class="no-underline w-fit hover:underline hover: cursor-pointer"
                    @click="store.actions.getIssues(project._links.issues)"
                  >
                    <RouterLink
                      :to="{
                        path: `/project/${project.name
                          .replace(/\s+/g, '-')
                          .toLowerCase()}`,
                        query: { id: project.id },
                      }"
                    >
                      <span>{{ project.namespace.name }} / </span>
                      <span class="font-semibold">{{ project.name }}</span>
                    </RouterLink>
                  </div>
                  <div class="flex align-middle text-slate-500">
                    <lock-closed-icon
                      class="icon w-4 lg:tooltip"
                      v-if="project.visibility == 'private'"
                      data-tip="hello"
                    />
                    <globe-alt-icon class="icon w-4" v-else />
                  </div>
                </div>
              </td>
              <td class="w-30">
                <div class="text-slate-500 flex gap-2">
                  <span class="flex gap-1">
                    <rectangle-stack-icon class="icon w-5"
                  /></span>
                  <span>{{ project.open_issues_count }}</span>
                </div>
                <div>
                  <p class="text-xs text-slate-500">
                    {{
                      moment(project.created_at).fromNow() ===
                      moment(project.updated_at).fromNow()
                        ? `Created ${moment(project.created_at).fromNow()}`
                        : `Updated ${moment(project.updated_at).fromNow()}`
                    }}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="h-60 flex justify-center align-middle">
        <span class="loading loading-bars loading-lg"></span>
      </div>
    </div>
  </div>
</template>

<style scoped></style> -->
<template>
  <h1>Hello</h1>
</template>
