<template>
  <component
    :is="getCurrentPage"
    :page-params="cureentPageParams"
    @selectPage="(pageName, pageParams) => selectPage(pageName, pageParams)"
  />
</template>

<script>
import ListPage from './Pages/ListPage'
import ItemPage from './Pages/ItemPage'
import ErrorPage from './Pages/ErrorPage'

const routes ={
  main: 'list-page',
  item: 'item-page'
}

export default {
  components: { ListPage, ItemPage, ErrorPage },

  data() {
    return {
      currentPage: 'main',
      cureentPageParams: {test: 'test'}
    }
  },

  computed: {
    getCurrentPage() {
      return routes[this.currentPage] || 'error-page'
    }
  },

  methods: {
    selectPage(pageName, pageParam) {
      this.currentPage = pageName
      this.cureentPageParams = pageParam
    }
  }
}

</script>
