import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('../views/GroupListView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/groupPage',
      name: 'groupPage',
      component: () => import('../views/GroupInfoView.vue'),
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
    },
    {
      path: '/spreadsheet',
      name: 'spreadsheet',
      component: () => import('../views/Spreadsheet.vue'),
      meta: {
        requiresAuth: true,
      }
    }
  ]
});

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//         resolve(user);
//       },
//       reject
//     )
//   });
// }

// router.beforeEach(async (to) => {
//   // routes with `meta: { requiresAuth: true }` will check for
//   // the users, others won't
//   if (to.meta.requiresAuth) {
//     const currentUser = await getCurrentUser()
//     // if the user is not logged in, redirect to the login page
//     if (!currentUser) {
//       return {
//         path: '/signin',
//         query: {
//           // we keep the current path in the query so we can
//           // redirect to it after login with
//           // `router.push(route.query.redirect || '/')`
//           redirect: to.fullPath,
//         },
//       }
//     }
//   }
// })

export default router
