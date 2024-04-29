import { createRouter, createWebHistory } from 'vue-router';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/groupList',
      name: 'groupList',
      component: () => import('../views/GroupListView.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('../views/GroupsView.vue')
    },
    {
      path: '/groupPage',
      name: 'groupPage',
      component: () => import('../views/GroupInfoView.vue')
    },
    {
      path: '/birthdays',
      name: 'birthdays',
      component: () => import('../views/Birthdays.vue')
    },
    {
      path: '/spreadsheet',
      name: 'spreadsheet',
      component: () => import('../views/Spreadsheet.vue')
    },
    {
      path: '/survival',
      name: 'survival',
      component: () => import('../views/Survival.vue')
    }
  ]
});

export default router
