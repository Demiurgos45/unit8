<template>
  <div id="loader" v-show="showLoading">
    <img src="loader.gif" style="margin: auto;">
  </div>
</template>

<script>
export default {
  props: ['showLoading']
  
}
</script>

<style>
#loader {
  background-color: #777;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  opacity: 0.50;
  z-index: 100;
  display: flex;
}
</style>