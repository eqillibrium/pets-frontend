<template>
  <div class="q-pa-md row q-gutter-xl content-center justify-center">
    <q-intersection
      transition="scale"
      class="col-3 example-item"
      v-for="app in apps"
      :key="app.id">
      <ListItem :app="app"/>
    </q-intersection>
  </div>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'AppList',
  props: {
    apps: {
      type: Array
    }
  },
  components: {
    ListItem
  }
}
</script>

<style scoped>

</style>
