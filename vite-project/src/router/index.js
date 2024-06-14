// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import LoginView from '../views/LoginView.vue'
// import RegisterView from '../views/RegisterView.vue'
// import AppointmentsView from '../views/AppointmentsView.vue'
// import ProfileView from '../views/ProfileView.vue'
// import AdminView from '../views/AdminView.vue'

// const routes = [
//   { path: '/', component: HomeView },
//   { path: '/login', component: LoginView },
//   { path: '/register', component: RegisterView },
//   { path: '/appointments', component: AppointmentsView, meta: { requiresAuth: true } },
//   { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
//   { path: '/admin', component: AdminView, meta: { requiresAuth: true } }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// // Защита маршрутов, требующих авторизации
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem('authToken');
//   if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//     next({ path: '/login' });
//   } else {
//     next();
//   }
// })

// export default router








import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AppointmentsView from '../views/AppointmentsView.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/appointments', component: AppointmentsView },
  { path: '/profile', component: ProfileView },
  { path: '/admin', component: AdminView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
