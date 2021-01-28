import axios from 'axios'
import { API_BASE_URL } from '../../config'

export default {
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: [],

    orderInfo: {}
  },

  getters: {
    itemsCount(state) {
      return state.cartProducts.reduce( (sum, item) => sum + item.amount, 0)
    },

    userAccessKey(state) {
      return state.userAccessKey
    },

    getOrderInfo(state) {
      return state.orderInfo
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
    },

    orderTotalPrice(state) {
      return state.orderInfo.basket.items.reduce((total, item) => (item.price * item.quantity) + total, 0) || 0
    },

    orderTotalItems(state) {
      return state.orderInfo.basket.items.reduce((total, item) => (item.quantity) + total, 0) || 0
    }

  },
  mutations: {
    addAmount(state, updateItem) {
      state.cartProducts[updateItem.id].amount += updateItem.amount
    },

    updateOrderInfo(state, info) {
      state.orderInfo = info
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
    updateOrderInfo(context, info) {
      context.commit('updateOrderInfo', info)
    },

    gettingOrderInfo(context, id) {
      if ((!context.state.orderInfo)) {
        axios.get(API_BASE_URL + '/api/orders/' + id, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateOrderInfo', response.data)
        })
        .catch(error => {
          context.commit('updateOrderInfo', error)
        })
      }
    },

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