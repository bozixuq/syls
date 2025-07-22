import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ClientManagementView from '../views/ClientManagement.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientManagementView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
