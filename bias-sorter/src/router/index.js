import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
    },
    {
      path: '/',
      name: 'home2',
      component: () => import('../views/Home2.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('../views/GroupsListView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/groupPage',
      name: 'groupPage',
      component: () => import('../views/GroupPageView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/birthdays',
      name: 'birthdays',
      component: () => import('../views/Birthdays.vue'),
      meta: {
        requiresAuth: true,
      }
    }
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  });
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser) {
      next();
    } else {
      alert("you don't have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router
