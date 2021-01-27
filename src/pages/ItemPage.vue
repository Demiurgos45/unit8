<template>
  <main class="content container" v-if="isLoadingError">
    <div v-if="isLoadingError">
      <h3>Ошибка загрузки</h3>
      <input type="button" value="Попробовать ещё раз" @click.prevent="loadItemInfo()">
    </div>
  </main>
  <main v-else-if="showLoading">
    <loading :showLoading="showLoading" />
  </main>
  <main v-else-if="itemInfo" class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main', params: {catId: 0}}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main', params: {catId: currentItem.category.id}}">
            {{ currentItem.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ currentItem.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img 
            width="570"
            height="570" 
            :src="currentItem.image.file.url"
            :alt="currentItem.title"
          >
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">{{ currentItem.id }}</span>
        <h2 class="item__title">
          {{ currentItem.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ currentItem.price | numberFormat }}
            </b>

            <fieldset class="form__block">
              <color-select
                :colors-list="currentItem.colors"
                :color-id="currentItem.colors[0].id"
              />
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button
                  type="button"
                  aria-label="Убрать один товар"
                  @click.prevent="itemAmount--"
                  :disabled="itemAmount < 2"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model="itemAmount">

                <button
                  type="button"
                  aria-label="Добавить один товар"
                  @click.prevent="itemAmount++"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAdded">
                В корзину
              </button>
            </div>
            <div v-show="productAdded">Товар добавлен</div>
            <div v-show="productAddSending">Добавление товара...</div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ColorSelect from '@/components/common/ColorSelect'
import numberFormat from '@/helpers/numberFormat.js'
import {API_BASE_URL} from '@/config.js'
import Loading from '@/components/common/Loading.vue'
import axios from 'axios'



export default {
  components: { ColorSelect, Loading },
  
  data() {
    return {
      itemAmount: 1,
      showLoading: false,
      isLoadingError: false,
      itemInfo: null,
      productAdded: false,
      productAddSending: false
    }
  },

  filters: {
    numberFormat
  },

  computed: {
    currentItem() {
      return this.itemInfo ? this.itemInfo : {}
    },
  },

  methods: {
    addToCart() {
      if (!this.productAddSending) {
        this.productAdded = false
        this.productAddSending = true

        this.$store.dispatch('addToCart', {id: this.currentItem.id, amount: this.itemAmount})
          .then(() => {
            this.productAdded = true
            this.productAddSending = false
          })
      }
    },

    loadItemInfo() {
      this.showLoading = true
      this.isLoadingError = false
      clearTimeout(this.loadProductsTimer)

      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + `/api/products/` + this.$route.params.id)
          .then(response => this.itemInfo = response.data)
          .catch(() => this.isLoadingError = true)
          .then(() => this.showLoading = false)
      }, 0)
    }

  },

  watch: {
    '$route.params.id': {
      handler() {
        this.loadItemInfo()
      },
      immediate: true
    }
  }
}
</script>

<style>

</style>