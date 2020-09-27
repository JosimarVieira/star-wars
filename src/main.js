import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Personagem from './components/Personagem.vue'
import Home from './components/Home.vue'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
Vue.use(VueRouter);

const routes = [
  {
    name: 'Personagem',
    path: '/personagem',
    component: Personagem
  },
  {
    name: 'Home',
    path: '/',
    component: Home
  }
]

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  render: h => h(App),
  router
}).$mount('#app')