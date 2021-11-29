<template>
  <component :is="`${layout}-layout`"></component>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layout/MainLayout'

export default {
  name: 'LayoutDefault',

  components: {
    MainLayout
  },

  setup () {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  }
}
</script>
