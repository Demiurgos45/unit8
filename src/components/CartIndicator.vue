<template>
  <router-link class="header__cart" href="#" aria-label="Корзина с товарами" :to="{name: 'cartPage'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ $store.getters.itemsCount }}
    </span>
  </router-link>
</template>

<script>
export default {

}
</script>

<style>

</style>