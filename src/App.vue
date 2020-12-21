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

export default {
  components: { MainHeader, MainFooter },
  name: 'App',

  data() {
    return {
    }
  },
}

</script>
