import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/project/:props',
      name: 'project',
      component: () => import('../views/Project.vue'),
    },
    {
      path: '/issue',
      name: 'issue',
      component: () => import('../views/Issue.vue'),
    },
    {
      path: '/allissues',
      name: 'allissues',
      component: () => import('../views/AllIssues.vue'),
    },
  ],
})

export default router
