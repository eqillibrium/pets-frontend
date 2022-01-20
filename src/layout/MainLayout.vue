<template>
  <q-layout view="lHh Lpr lFf">
    <TheHeader />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <TheFooter />
  </q-layout>
</template>
<style>

</style>
<script>
import TheHeader from '../components/header/TheHeader.vue'
import TheFooter from '../components/footer/TheFooter.vue'

export default {
  name: 'LayoutDefault',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>
