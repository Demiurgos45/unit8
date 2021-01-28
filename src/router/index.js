import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPage from '@/pages/ListPage'
import ErrorPage from '@/pages/ErrorPage'
import ItemPage from '@/pages/ItemPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage'
import OrderInfoPage from '@/pages/OrderInfoPage'

Vue.use(VueRouter)

const routes = [
  {name: 'main', component: ListPage, path: '/main/:catId'},
  {path: '/', redirect: {name: 'main', params: {catId: 0}}},
  {name: 'itemPage', component: ItemPage, path: '/item/:id'},
  {name: 'cartPage', component: CartPage, path: '/cart/'},
  {name: 'order', component: OrderPage, path: '/order/'},
  {name: 'orderInfo', component: OrderInfoPage, path: '/order/:id'},
  {name: 'errorPage', component: ErrorPage, path: '*'},
]

const router = new VueRouter({
  routes
})

export default router
