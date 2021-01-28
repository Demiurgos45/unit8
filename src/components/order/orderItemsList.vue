<template>
  <div>
    <ul class="cart__orders">
      <li v-for="item in items" :key="item.id" class="cart__order">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.quantity * item.product.price | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
        <span>{{ item.quantity }} шт.</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ totalItems }}</b> товара на сумму <b>{{ totalPrice | numberFormat}} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat.js'

export default {
  filters: {
    numberFormat
  },

  props: ['itemList', 'listType'],

  computed: {
    totalPrice() {
      if (this.listType === 'order') {
        return this.$store.getters.orderTotalPrice
      }
      return this.$store.getters.cartTotalPrice
    },

    totalItems() {
      if (this.listType === 'order') {
        return this.$store.getters.orderTotalItems
      }
      return this.$store.getters.itemsCount
    },

    items() {
      return this.itemList || []
    }
  },

  mounted() {
    
  }
}
</script>

<style>

</style>