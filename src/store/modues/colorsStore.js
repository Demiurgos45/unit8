export default {
  state: {
    colorsPallete: {}
  },

  getters: {
    getAllPallete(state) {
      return state.colorsPallete
    },
    getEnabledColors: (state) => (colorsId) => {
      return state.colorsPallete.filter(item => colorsId.indexOf(item.id) != -1)
    }
  },
  mutations: {
    setPallete(state, colors) {
      state.colorsPallete = colors
    },
  },
    
  actions: {
    setPallete(context, colors) {
      context.commit('setPallete', colors)
    },
  }
}