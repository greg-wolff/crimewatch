import VueRouter from 'vue-router';
import Auth from './Auth.vue';
/*export default [
  {
    path: '/form/',
    component: require('./assets/vue/pages/form.vue')
  }
]*/
const router = new VueRouter({
  mode:'history',
  routes: [
    {path: '/form/',component: require('./assets/vue/pages/form.vue')},
    {path: '/',component: Auth},
    {path:'/auth',component: Auth},
  ]
});
export default router;
