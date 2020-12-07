<template>
  <ul class="catalog__list">
    <goods-item v-for="(item, index) in goods" :item="item" :key="index" />
  </ul>  
</template>


<script>
import GoodsItem from './GoodsItem.vue'
export default {
  components: { GoodsItem },
  props: ['goods']
}
</script>
