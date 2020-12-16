<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цвет</legend>
    <ul class="colors">
      <li class="colors__item" v-if="showAllColors === true">
        <label class="colors__label">
          <input 
            class="colors__radio sr-only"
            type="radio"
            name="color"
            :value="0"
            :checked="colorId === 0"
            v-model="selectedColor"
          >
          <span class="colors__value" :style="'background: linear-gradient(red, yellow, blue);'">  
          </span>
        </label>
      </li>
      <li class="colors__item" v-for="clr in colorsList" :key="clr">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            name="color"
            :value="clr"
            :checked="colorId === clr"
            v-model="selectedColor"
          >
          <span class="colors__value" :style="'background-color: ' + getColorCode(clr) + ';'">  
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import Colors from '@/data/colors'

export default {
  
  props: ['colorsList', 'colorId', 'showAllColors'],

  methods: {
    getColorCode(colorId) {
      return Colors.filter(clr => clr.id === colorId)[0].colorCode
    },
  },

  computed: {
    selectedColor: {
            get: function(){
                return this.colorId;
            },
            set: function(newValue){
                this.$emit('update:colorId', newValue)
            }   
        },
  }
}
</script>
