import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home';
import Scores from './pages/Scores';

export const routes = [
  {
    component: Home,
    path: '/',
  },
  {
    component: Scores,
    path: '/scores',
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});