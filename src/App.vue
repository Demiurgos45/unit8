<template>
  <div>
    <main-header />

    <router-view />

    <main-footer />
  </div>
</template>

<script>
import MainFooter from './components/MainFooter'
import MainHeader from './components/MainHeader'
import Colors from '@/data/colors'

export default {
  components: { MainHeader, MainFooter },
  name: 'App',

  data() {
    return {
    }
  },

  created() {
    this.$store.dispatch('setPallete', Colors)
  },
}

</script>
