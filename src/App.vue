<template>
  <component
    :is="getCurrentPage"
    :page-params="cureentPageParams"
  />
</template>

<script>
import ListPage from './Pages/ListPage'
import ItemPage from './Pages/ItemPage'
import ErrorPage from './Pages/ErrorPage'
import eventBus from './eventBus'

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
    selectPage(pageName, pageParams) {
      this.currentPage = pageName
      this.cureentPageParams = pageParams
    }
  },

  created() {
    eventBus.$on('selectPage', (pageName, pageParams) => this.selectPage(pageName, pageParams))
  }
}

</script>
