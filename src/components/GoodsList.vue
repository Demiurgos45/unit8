<template>
  <ul class="catalog__list" v-if="goods.length > 0">
    <goods-item v-for="item in goods" 
      :item="item" 
      :key="item.id"
    />
  </ul>
</template>


<script>
import GoodsItem from './GoodsItem.vue'
export default {
  components: { GoodsItem },
  props: ['goods']
}
</script>
