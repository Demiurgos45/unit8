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

    userAccessKey(state) {
      return state.userAccessKey
    },

    goodsCount(state) {
      return state.cartProducts.length
    },

    getItemsDetail(state) {
      return state.cartProducts.map( (item) => {
        const product = state.cartProductsData.find(p => p.product.id === item.id).product;
        return {
          ...item,
          product: {
            ...product,
          }
        }
      })
    },

    getItemsListDetail(state) {
      return state.cartProductsData
    },

    cartTotalPrice(state) {
      return state.cartProductsData.reduce((total, item) => (item.price * item.quantity) + total, 0)
    }

  },
  mutations: {
    addAmount(state, updateItem) {
      state.cartProducts[updateItem.id].amount += updateItem.amount
    },

    resetCart(state) {
      state.cartProducts = []
      state.cartProductsData = []
    },

    updateAmount(state, {id, amount}) {
      state.cartProducts.find(p => p.id === id).amount = amount
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
        return {
          id: item.product.id,
          amount: item.quantity
        }
      })
    }
  },
    
  actions: {
    updateAmount(context, {id, amount}) {
      context.commit("updateAmount", {id, amount})
      
      if (amount > 0) {
        axios
          .put(API_BASE_URL + '/api/baskets/products', {
            productId: id,
            quantity: amount
          }, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
          .then(response => {
            context.commit('updateCartProductsData', response.data.items)
          })
          .catch(() => {
            context.commit('syncCartProducts')
          })
      }
    },

    resetCart(context) {
      context.commit('resetCart')
    },

    addToCart(context, addedItem) {
      return axios
        .post(API_BASE_URL + '/api/baskets/products', {
          productId: addedItem.id,
          quantity: addedItem.amount
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
    },

    deleteItem(context, id) {
      context.commit('deleteItem', id)

      axios
        .delete(API_BASE_URL + '/api/baskets/products', {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId: id
          }
        })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
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