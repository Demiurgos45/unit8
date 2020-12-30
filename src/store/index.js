import Vue from 'vue'
import Vuex from 'vuex'
import cartStore from './modues/cartStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cartStore,
  }
})