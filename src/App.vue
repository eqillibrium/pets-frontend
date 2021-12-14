<template>
  <component :is="`${layout}-layout`"></component>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300&display=swap');

  body  *  {
      /* font-family: 'Montserrat', sans-serif; */
      font-family: 'Montserrat', sans-serif;
      letter-spacing: 3px;

      /* color: black; */
  }
</style>

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
