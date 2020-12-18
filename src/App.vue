<template>
  <component
    :is="getCurrentPage"
    :page-params="currentPageParams"
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
  name: 'App',
  components: { ListPage, ItemPage, ErrorPage },

  data() {
    return {
      currentPage: 'main',
      currentPageParams: 0
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
      this.currentPageParams = pageParams
    }
  },

  created() {
    eventBus.$on('selectPage', (pageName, pageParams) => {
      this.selectPage(pageName, pageParams)
    }) 
  }
}

</script>
