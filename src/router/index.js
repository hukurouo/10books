import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Show from '../views/Show.vue'
import About from '../views/About.vue'
import ReqForm from '../views/ReqForm.vue'
import Faq from '../views/Faq.vue'
import Search from '../views/Search.vue'
import Redirect from '../views/Redirect.vue'
import Timeline from '../views/Timeline.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '10冊メーカー', 
            desc: '小説10選のページが生成できます。ログイン不要です。' ,
          }
  },
  {
    path: '/create',
    name: 'Create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Create.vue')
  },
  { path: '/redirect/:id', name: 'Redirect', component: Redirect },
  { path: '/id/:id', name: 'Show', component: Show },
  { path: '/search', name: 'Search', component: Search },
  { path: '/about', name: 'About', component: About },
  { path: '/faq', name: 'Faq', component: Faq },
  { path: '/form', name: 'ReqForm', component: ReqForm },
  { path: '/timeline', name: 'Timeline', component: Timeline },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
