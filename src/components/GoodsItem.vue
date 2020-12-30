<template>
  <li class="catalog__item">
      <router-link class="catalog__pic" href="#" :to="{name: 'itemPage', params: {id: item.id}}">
        <img
          :src="item.image.file.url"
          :alt="item.title"
        >
      </router-link>

      <h3 class="catalog__title">
        <router-link href="#" :to="{name: 'itemPage', params: {id: item.id}}">
          {{ item.title }}
        </router-link>
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

}
</script>
