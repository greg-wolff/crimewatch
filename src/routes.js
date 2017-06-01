import VueRouter from 'vue-router';
import App from './main.vue'
export default [
  {
    path: '/form/',
    component: require('./assets/vue/pages/form.vue')
  }
]
/*const router = new VueRouter({
  mode:'history',
  routes: [
    {path: '/form/',component: require('./assets/vue/pages/form.vue')},
    {path:'/success',component: App}
  ]
});
export default router;*/
