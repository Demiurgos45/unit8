<template>
  <div>
    <main-header />

    <router-view />

    <main-footer />
  </div>
</template>

<script>
import MainFooter from '@/components/TheFooter'
import MainHeader from '@/components/TheHeader'

export default {
  components: { MainHeader, MainFooter },
  name: 'App',

  data() {
    return {
    }
  },

  mounted() {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.$store.commit('updateUserAccessKey', userAccessKey)
    }
    this.$store.dispatch('loadCart')
  },
}

</script>
