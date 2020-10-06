import Vue from 'vue';
import VueRouter from 'vue-router';
import Pokemon from '../views/Pokemon.vue';
import Pokedex from '../views/Pokedex.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: Pokedex,
  },
  {
    path: '/pokedex/pokemon/:id',
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
