import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPage from '@/Pages/ListPage'
import ErrorPage from '@/Pages/ErrorPage'
import ItemPage from '@/Pages/ItemPage'

Vue.use(VueRouter)

const routes = [
  {name: 'main', component: ListPage, path: '/main/:catId'},
  {path: '/', redirect: {name: 'main', params: {catId: 0}}},
  {name: 'itemPage', component: ItemPage, path: '/item/:id'},
  {name: 'errorPage', component: ErrorPage, path: '*'},
]

const router = new VueRouter({
  routes
})

export default router
