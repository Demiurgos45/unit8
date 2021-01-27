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
        <div v-if="isLoadingError">
          <h3>Ошибка загрузки</h3>
          <input type="button" value="Попробовать ещё раз" @click.prevent="loadProducts()">
        </div>
        <h3 v-else-if="goodsList.length === 0">Ничего не найдено</h3>
        
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
    <div id="loader" v-show="showLoading">
      <img src="loader.gif" style="margin: auto;">
    </div>

    <loading :showLoading="showLoading" />
  </main>
</template>

<script>
import BasePagination from '@/components/BasePagination'
import GoodsFilter from '@/components/products/GoodsFilter'
import GoodsList from '@/components/products/GoodsList'
import axios from 'axios'
import {API_BASE_URL} from '@/config.js'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {GoodsList, BasePagination, GoodsFilter, Loading},

  data() {
    return {
      currentPage: 1,
      goodsPerPage: 3,
      filterState: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: +this.$route.params.catId || 0,
        colorId: 0,
      },
      productsData: null,
      isLoadingError: false,
      showLoading: false
    }
  },

  computed: {

    goodsList() {
      return this.productsData ? this.productsData.items : []
    },

    goodsCount() {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },

  methods: {
    loadProducts() {
      this.showLoading = true
      this.isLoadingError = false
      clearTimeout(this.loadProductsTimer)

      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + `/api/products`, {
          params: {
            page: this.currentPage,
            limit: this.goodsPerPage,
            categoryId: this.filterState.categoryId,
            minPrice: this.filterState.priceFrom,
            maxPrice: this.filterState.priceTo,
            colorId: this.filterState.colorId
          }
        })
          .then(response => this.productsData = response.data)
          .catch(() => this.isLoadingError = true)
          .then(() => this.showLoading = false)
      }, 0)
      
    }
  },

  watch: {
    currentPage() {
      this.loadProducts()
    },

    "filterState.categoryId"() {
      this.loadProducts()
    },
    "filterState.priceFrom"() {
      this.loadProducts()
    },
    "filterState.priceTo"() {
      this.loadProducts()
    },
    "filterState.colorId"() {
      this.loadProducts()
    }
  },

  created() {
    this.loadProducts()
  }
}
</script>

<style>
</style>