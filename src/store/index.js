import Vue from 'vue'
import Vuex from 'vuex'
import cartStore from './modues/cartStore'
import orderStore from './modues/orderStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cartStore,
    orderStore
  }
})