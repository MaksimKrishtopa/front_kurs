import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AppointmentsView from '../views/AppointmentsView.vue'
import AppointmentForm from '../views/AppointmentForm.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'
import store from '../store/auth.js'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/appointments', component: AppointmentsView },
  { path: '/appointment-form', component: AppointmentForm },
  { path: '/profile', component: ProfileView },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = store.getters.userData;
  const isAuthenticated = !!store.getters.userToken;

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (isAuthenticated && user.role_id === 1) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router