<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цвет</legend>
    <ul class="colors">
      <li class="colors__item" v-for="clr in colorsList" :key="clr">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color" :value="clr">
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
  
  props: ['colorsList'],

  methods: {
    getColorCode(colorId) {
      return Colors.filter(clr => clr.id === colorId)[0].colorCode
    }
  }

}
</script>

<style>
#test {
  background-color: #0000ff;

  background-color: #f7f700;
  background-color: #777777;

  background-color: #00ff00;
  background-color: #ff0000;
  background-color: #FFF;
  background-color: #000;
}
</style>