import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BGView from '../views/BGView.vue'
import GGView from '../views/GGView.vue'
import SoloView from '../views/SoloView.vue'
import GroupPageView from '../views/GroupPageView.vue'
import Birthdays from '../views/Birthdays.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/boy-groups',
    name: 'boyGroups',
    component: BGView
  },
  {
    path: '/girl-groups',
    name: 'girlGroups',
    component: GGView
  },
  {
    path: '/solo',
    name: 'solo',
    component: SoloView
  },
  {
    path: '/groupPage',
    name: 'groupPage',
    component: GroupPageView
  },
  {
    path: '/birthdays',
    name: 'birthdays',
    component: Birthdays
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
