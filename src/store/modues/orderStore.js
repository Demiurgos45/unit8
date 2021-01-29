export default {
  state: {
      orderInfo: {}
  },

  getters: {
    getOrderInfo(state) {
      return state.orderInfo
    },

    orderTotalPrice(state) {
      return state.orderInfo.basket.items.reduce((total, item) => (item.price * item.quantity) + total, 0) || 0
    },

    orderTotalItems(state) {
      return state.orderInfo.basket.items.reduce((total, item) => (item.quantity) + total, 0) || 0
    }

  },

  mutations: {
    updateOrderInfo(state, info) {
      state.orderInfo = info
    },
  },

  actions: {
    updateOrderInfo(context, info) {
      context.commit('updateOrderInfo', info)
    },

  }
}