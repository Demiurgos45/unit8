<template>
  <li class="catalog__item">
      <a class="catalog__pic" href="#">
        <img
          :src="'/img/goods/' + item.id + '_350.png'"
          :srcset="'/img/goods/' + item.id + '_700.png 2x'"
          :alt="item.title"
        >
      </a>

      <h3 class="catalog__title">
        <a href="#">
          {{ item.title }}
        </a>
      </h3>

      <span class="catalog__price">
        {{ item.price }} ₽
      </span>
      <color-select
        :colors-list="item.colors"
        :color-id.sync="selectedColorId"
      />
    </li>
</template>

<script>
import ColorSelect from './ColorSelect.vue'

export default {
  components: { ColorSelect },
  props: ['item'],

  data() {
    return {
      selectedColorId: 0
    }
  }
}
</script>
