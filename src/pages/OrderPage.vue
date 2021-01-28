<template>
    <main class="content container">
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
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">
            <base-form-text
              v-model="formData.name"
              title="ФИО" 
              placeholder="Введите ваше полное имя"
              :error="formError.name"
            />
            
            <base-form-text
              v-model="formData.address"
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              :error="formError.address"
            />

            <base-form-text
              v-model="formData.phone"
              title="Телефон"
              type="tel"
              placeholder="Введите ваш телефон"
              :error="formError.phone"
            />

            <base-form-text
              v-model="formData.email"
              title="E-mail"
              type="email"
              placeholder="Введите ваш E-mail"
              :error="formError.email"
            />

            <base-form-textarea
              v-model="formData.comment"
              title="Ваши пожелания"
              placeholder="Ваши пожелания"
              :error="formError.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <order-items-list :itemList="items" />

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="errorMessage">
          <h4>Заявка не отправлена</h4>
          <p>
            {{ errorMessage }}
          </p>
        </div>
      </form>
    </section>
    <loading :showLoading="showLoading" />
  </main>
</template>

<script>
import BaseFormText from '@/components/common/BaseFormText.vue'
import BaseFormTextarea from '@/components/common/BaseFormTextarea.vue'
import axios from 'axios'
import {API_BASE_URL} from '@/config.js'
import Loading from '@/components/common/Loading.vue'
import OrderItemsList from '@/components/order/orderItemsList.vue'


export default {
  components: { BaseFormText, BaseFormTextarea, Loading, OrderItemsList },
  data() {
    return {
      formData: {},
      formError: {},
      errorMessage: '',
      showLoading: false
    }
  },

  computed: {
    items() {
      return this.$store.getters.getItemsListDetail
    }
  },

  methods: {
    order() {
      this.errorMessage = ''
      this.showLoading = true
      axios
        .post(API_BASE_URL + '/api/orders', {
          ...this.formData
        },
        {
          params: {
            userAccessKey: this.$store.getters.userAccessKey
          }
        })
        .then( (response) => {
          this.formError = {}
          this.$store.dispatch('resetCart')
          this.$store.dispatch('updateOrderInfo', response.data)
          this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
        })
        .catch( error => {
          this.formError = error.response.data.error.request || {}
          this.errorMessage = error.response.data.error.message
        })
        .then( () => {
          this.showLoading = false
        })
    }
  },

}
</script>

<style>

</style>