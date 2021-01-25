<template>
  <li class="cart__item product">
    <div class="product__pic">
      <router-link class="catalog__pic" href="#" :to="{name: 'itemPage', params: {id: item.product.id}}">
        <img :src="item.product.image.file.url" width="120" height="120" alt="item.product.title">
      </router-link>
    </div>
    
    <router-link class="catalog__pic" href="#" :to="{name: 'itemPage', params: {id: item.product.id}}">
      <h3 class="product__title">
        {{ item.product.title }}
      </h3>
    </router-link>
              
    <span class="product__code">
      {{ item.product.id }}
    </span>

    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click.prevent="amount--"
        :disabled="amount < 2"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button
        type="button"
        aria-label="Добавить один товар"
        @click.prevent="amount++"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ item.amount * item.product.price | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button" aria-label="Удалить товар из корзины"
      @click.prevent="deleteItem(item.id)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat.js'

export default {
  props: ['item'],

  filters: {
    numberFormat
  },

  computed: {
    amount: {
      get() {
        return this.item.amount
      },
      set(val) {
        this.$store.dispatch('updateAmount', {id: this.item.id, amount: val})
      }
    }
  },

  methods: {
    deleteItem(id) {
      this.$store.dispatch('deleteItem', id)
    }
  }
}
</script>

<style>

</style>