<template>
  <q-page>
    <TheCarousel />
    <AppList />
  </q-page>
</template>

<script>
// @ is an alias to /src
import AppList from '@/components/list/AppList.vue'
import TheCarousel from '../components/carousel/TheCarousel'

export default {
  name: 'Home',
  components: {
    AppList,
    TheCarousel
  }
}
</script>
