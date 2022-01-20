<template>
    <div
        transition="fade"
      class="example-item"
      v-for="app in apps"
      :key="app.id">
      <ListItem :app="app"/>
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
