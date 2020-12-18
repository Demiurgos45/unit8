<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        Количество наименований: {{ goodsCount }}
      </span>
    </div>

    <div class="content__catalog">
      <goods-filter 
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
        :current-page.sync="currentPage"
      />

      <section class="catalog">
        <h2 v-if="goodsList.length === 0">Ничего не найдено</h2>
        <goods-list
          :goods="goodsList"
        />
        <base-pagination
          v-model="currentPage"
          :elements-count="goodsCount"
          :elements-per-page="goodsPerPage"
        />
      </section>
      
    </div>
  </main>
</template>

<script>
import BasePagination from '@/components/BasePagination.vue'
import GoodsFilter from '@/components/GoodsFilter.vue'
import GoodsList from '@/components/GoodsList'
import goods from '@/data/goods'

export default {
  props: ['pageParams'],

  components: {GoodsList, BasePagination, GoodsFilter},

  data() {
    return {
      currentPage: 1,
      goodsPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: this.pageParams,
      filterColorId: 0
    }
  },

  computed: {
    filteredGoods() {
      let filteredGoods = goods

      if (this.filterCategoryId > 0) {
        filteredGoods = filteredGoods.filter(item => item.categoryId === this.filterCategoryId)
      }
      
      if (this.filterPriceFrom > 0) {
        filteredGoods = filteredGoods.filter(item => item.price > this.filterPriceFrom)
      }

      if (this.filterPriceTo > 0) {
        filteredGoods = filteredGoods.filter(item => item.price < this.filterPriceTo)
      }

      if (this.filterColorId > 0) {
        filteredGoods = filteredGoods.filter(item => item.colors.includes(this.filterColorId))
      }

      return filteredGoods
    },

    goodsList() {
      const listOffset = (this.currentPage - 1) * this.goodsPerPage
      return this.filteredGoods.slice(listOffset, listOffset + this.goodsPerPage)
    },

    goodsCount() {
      return this.filteredGoods.length
    }
  },
}
</script>

<style>

</style>