import Vue from 'vue';
import VueRouter from 'vue-router';
import Pokemon from '../views/Pokemon.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemon/:id',
    name: 'Pokemon',
    component: Pokemon,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
