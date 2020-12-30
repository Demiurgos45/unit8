import axios from 'axios'
import { API_BASE_URL } from '../../config'

export default {
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: []
  },

  getters: {
    itemsCount(state) {
      return state.cartProducts.reduce( (sum, item) => sum + item.amount, 0)
    },

    goodsCount(state) {
      return state.cartProducts.length
    },

    getItemsDetail(state) {
      // return state.cartProducts.map( (item) => {
      //   return {
      //     ...item,
      //     //details: Goods.find(it => it.id === item.id)
      //   }
      // })
      return state.cartProductsData
    },

    cartTotalPrice(state) {
      return state.cartProductsData.reduce((total, item) => (item.price * item.quantity) + total, 0)
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

    updateUserAccessKey(state, key) {
      state.userAccessKey = key
    },
    updateCartProductsData(state, data) {
      state.cartProductsData = data
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return{
          id: item.product.id,
          amount: item.quantity
        }
      })
    }
  },
    
  actions: {
    addToCart(context, addedItem) {
      const cartId = context.state.cartProducts.findIndex( (item) => item.id === addedItem.id)
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
    },

    loadCart(context) {
      axios.get(API_BASE_URL + '/api/baskets',{
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
    }
  }
}