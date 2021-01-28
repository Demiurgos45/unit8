<template>
  <main v-if="checkErr" class="content container">
    <h3>Ошибка:</h3>
    <h4> {{orderInfo.err.toJSON() }} </h4>
  </main>
  <main v-else-if="basket !== null" class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main', params: {catId: 0}}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'cartPage'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }} </span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. 
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <order-items-list v-if="basket" listType="order" :itemList="basket" />
        </div>
      </form>
    </section>
  </main>
  <main v-else class="content container">
    <loading showLoading="true"/>
  </main>

</template>

<script>
import orderItemsList from '@/components/order/orderItemsList.vue'
import {API_BASE_URL} from '@/config'
import axios from 'axios'
import Loading from '@/components/common/Loading.vue'

export default {
  components: { orderItemsList, Loading },
  data() {
    return {
      orderId: null,
      orderInfo: {}
    }
  },

  computed: {
    basket() {
      if (this.orderInfo.basket) {
        return this.orderInfo.basket.items || {}
      }
      
      return null
    },

    checkErr() {
      if ((this.orderInfo !== {}) && ('err' in this.orderInfo)) {
        return true
      }
      return false
    }
  },

  methods: {
    
  },

  created() {
    this.orderId = this.$route.params.id || null
    if (this.orderId) {
      this.orderInfo = this.$store.getters.getOrderInfo

      if ((!this.orderInfo) || (this.orderInfo.id !== this.orderId)) {
        axios.get(API_BASE_URL + '/api/orders/' + this.orderId, {
          params: {
            userAccessKey: this.$store.getters.userAccessKey
          }
        })
        .then(response => {
          this.$store.dispatch('updateOrderInfo', response.data)
        })
        .catch(error => {
          this.$store.dispatch('updateOrderInfo', {err: error})
        })
        .then ( () => {
          this.orderInfo = this.$store.getters.getOrderInfo
        })
        
        

      }
    }
  }
}
</script>

<style>

</style>