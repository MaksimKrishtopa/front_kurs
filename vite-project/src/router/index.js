import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AppointmentsView from '../views/AppointmentsView.vue'
import AppointmentForm from '../views/AppointmentForm.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'
import store from '../store/auth.js'
import DoctorsView from '..//views/DoctorsView.vue';
import AddDoctorView from '../views/AddDoctorView.vue';
import EditDoctorView from '../views/EditDoctorView.vue';
import AddSpecializationView from '../views/AddSpecializationView.vue';
import AddScheduleView from '../views/AddScheduleView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/appointments', component: AppointmentsView, meta: { requiresAuth: true } }, // добавляем requiresAuth
  { path: '/appointment-form', component: AppointmentForm },
  { path: '/profile', component: ProfileView },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: DoctorsView
  },
  {
    path: '/doctor/add',
    name: 'addDoctor',
    component: AddDoctorView
  },
  {
    path: '/doctor/edit/:id',
    name: 'editDoctor',
    component: EditDoctorView,
    props: true
  },
  {
    path: '/specialization/add',
    name: 'addSpecialization',
    component: AddSpecializationView
  },
  {
    path: '/schedule/add',
    name: 'addSchedule',
    component: AddScheduleView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = store.getters.userData;
  const isAuthenticated = !!store.getters.userToken;
  
  console.log("Checking route access:", to.path);
  console.log("User role_id:", user ? user.role_id : 'undefined');  // Добавлено: вывод роли пользователя

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (isAuthenticated && user.role_id === 1) {
      next();
    } else {
      console.warn("Access denied. Admin rights required.");
      next('/login');
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;