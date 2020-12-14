<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="filterSubmit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
            <option :value="category.id" v-for="category in categories" :key="category.id"> {{ category.title }} </option>
          </select>
        </label>
      </fieldset>
      
      <color-select 
        :colors-list="getAllColors()"
        :color-id.sync="currentColorId"
        :show-all-colors="true"
      />

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
              <span class="check-list__desc">
                8 
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                16 
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                32 
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                64 
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                128 
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                264 
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>
      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="filterClear">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import Categories from '@/data/categories'
import ColorSelect from './ColorSelect.vue'
import Colors from '@/data/colors'

export default {
  components: { ColorSelect },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'currentPage'],

  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0
    }
  },

  computed: {
    categories() {
      return Categories
    },

    colors() {
      return Colors
    }
  },

  methods: {
    setFilter(valueFrom, valueTo, valueCategoryId, valueColorId) {
      this.$emit('update:priceFrom', valueFrom)
      this.$emit('update:priceTo', valueTo)
      this.$emit('update:categoryId', valueCategoryId)
      this.$emit('update:colorId', valueColorId)
      this.$emit('update:currentPage', 1)
    },

    filterSubmit() {
      this.setFilter(this.currentPriceFrom, this.currentPriceTo, this.currentCategoryId, this.currentColorId)
    },

    filterClear() {
      this.currentPriceFrom = 0
      this.currentPriceTo = 0
      this.currentCategoryId = 0
      this.currentColorId = 0
      this.setFilter(0, 0, 0, 0)
    },

    getAllColors() {
      return this.colors.map(clr => clr.id)
    }

  },

}
</script>
