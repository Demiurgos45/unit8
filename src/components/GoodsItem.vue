<template>
  <li class="catalog__item">
      <a class="catalog__pic" href="#" @click.prevent="selectPage('item', {id: item.id})">
        <img
          :src="'/img/goods/' + item.id + '_350.png'"
          :srcset="'/img/goods/' + item.id + '_700.png 2x'"
          :alt="item.title"
        >
      </a>

      <h3 class="catalog__title">
        <a href="#" @click.prevent="selectPage('item', {id: item.id})">
          {{ item.title }}
        </a>
      </h3>

      <span class="catalog__price">
        {{ item.price | numberFormat}} ₽
      </span>
      <color-select
        :colors-list="item.colors"
        :color-id.sync="selectedColorId"
      />
    </li>
</template>

<script>
import ColorSelect from './ColorSelect.vue'
import numberFormat from '@/helpers/numberFormat'
import selectPage from '@/helpers/selectPage'

export default {
  components: { ColorSelect },
  props: ['item'],
  filters: {
    numberFormat
  },
  data() {
    return {
      selectedColorId: 0
    }
  },

  methods: {
    selectPage
  }
}
</script>
