import Goods from '@/data/goods'
export default {
  state: {
    cartProducts: [{
      id: '20201207_0014',
      amount: 2
    },
    {
      id: '20201207_0010',
      amount: 1
    }]
  },

  getters: {
    itemsCount(state) {
      return state.cartProducts.reduce( (sum, item) => sum + item.amount, 0)
    },

    goodsCount(state) {
      return state.cartProducts.length
    },

    getItemsDetail(state) {
      return state.cartProducts.map( (item) => {
        return {
          ...item,
          details: Goods.find(it => it.id === item.id)
        }
      })
    },

    cartTotalPrice(state, getters) {
      return getters.getItemsDetail.reduce((total, item) => (item.details.price * item.amount) + total, 0)
    }

  },
  mutations: {
    addItem(state, newItem) {
      state.cartProducts.push(newItem)
    },

    addAmount(state, updateItem) {
      state.cartProducts[updateItem.id].amount += updateItem.amount
    },

    updateAmount(state, {id, amount}) {
      state.cartProducts[id].amount = amount
    },

    deleteItem(state, id) {
      state.cartProducts = state.cartProducts.filter(item => item.id !== id)
    },
  },
    
  actions: {
    addToCart(context, addedItem) {
      const cartId = context.state.cartProducts.findIndex( (item) => item.id === addedItem.id)
      console.log(cartId)
      if (cartId < 0) {
        context.commit('addItem', addedItem)
      }
      else {
        addedItem.id = cartId
        context.commit('addAmount', addedItem)
      }
    },

    updateAmount(context, {id, amount}) {
      if (amount < 1) {amount = 1}
      const cartId = context.state.cartProducts.findIndex((item) => item.id === id)
      context.commit('updateAmount', {id: cartId, amount})
    },

    deleteItem(context, id) {
      context.commit('deleteItem', id)
    }
  }
}