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
        v-bind.sync="filterState"
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
  components: {GoodsList, BasePagination, GoodsFilter},

  data() {
    return {
      currentPage: 1,
      goodsPerPage: 3,
      filterState: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: +this.$route.params.catId || 0,
        colorId: 0,
      }
    }
  },

  computed: {
    filteredGoods() {
      let filteredGoods = goods
      let filter = this.filterState

      if (filter.categoryId > 0) {
        filteredGoods = filteredGoods.filter(item => item.categoryId === filter.categoryId)
      }
      
      if (filter.priceFrom > 0) {
        filteredGoods = filteredGoods.filter(item => item.price > filter.priceFrom)
      }

      if (filter.priceTo > 0) {
        filteredGoods = filteredGoods.filter(item => item.price < filter.priceTo)
      }

      if (filter.colorId > 0) {
        filteredGoods = filteredGoods.filter(item => item.colors.includes(filter.colorId))
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