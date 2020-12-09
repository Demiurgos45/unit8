<template>
  <section class="catalog">
    <goods-list :goods="goods" />
    <base-pagination v-model="currentPage" :elements-count="goodsCount" :elements-per-page="goodsPerPage" />
  </section>
</template>

<script>
import BasePagination from './components/BasePagination.vue'
import GoodsList from './components/GoodsList'
import goods from './data/goods'

export default {
  name: 'App',
  components: {GoodsList, BasePagination},
  data() {
    return {
      currentPage: 1,
      goodsPerPage: 3,
    }
  },

  computed: {
    goods() {
      const listOffset = (this.currentPage - 1) * this.goodsPerPage
      return goods.slice(listOffset, listOffset + this.goodsPerPage)
    },

    goodsCount() {
      return goods.length
    }
  }
}

</script>
