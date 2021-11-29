<template>
  <div class="q-pa-md row items-start q-gutter-md content-center justify-center">
    <ListItem v-for="a in 10" :key="a"/>
  </div>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'AppList',
  components: {
    ListItem
  }
}
</script>

<style scoped>

</style>
