import { createRouter, createWebHistory } from 'vue-router';
import SchedulePage from '../views/SchedulePage.vue';
import LeaderboardPage from '../views/LeaderboardPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/schedule'
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: SchedulePage
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: LeaderboardPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
