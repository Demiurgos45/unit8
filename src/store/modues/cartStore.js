export default {
  state: {
    cartProducts: [{
      productId: 1,
      amount: 2
    },
    {
      productId: 2,
      amount: 1
    }]
  },

  getters: {
    itemsCount(state) {
      return state.cartProducts.reduce( (sum, item) => sum + item.amount, 0)
    },

    goodsCount(state) {
      return state.cartProducts.length
    }

  },
  mutations: {
 
  },
    
  actions: {

  }
}