import Vue from 'vue'
import Vuex from 'vuex'
import cartStore from './modues/cartStore'
import colorsStore from './modues/colorsStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cartStore,
    colorsStore
  }
})