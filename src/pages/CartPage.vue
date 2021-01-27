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
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Товаров: {{ itemList.length }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <cart-item v-for="item in itemList" :key="item.id" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span> {{ totalPrice | numberFormat}} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat.js'
import {mapGetters} from 'vuex'
import CartItem from '@/components/cart/CartItem.vue'

export default {
  components: { CartItem },
  filters: {
    numberFormat
  },

  computed: {
    ...mapGetters({
      itemList: 'getItemsDetail',
      totalPrice: 'cartTotalPrice'
    })
  }

}
</script>

<style>

</style>