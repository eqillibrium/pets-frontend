<template>
  <div class="q-pa-md">
    <q-btn-dropdown color="secondary" :label="defaultFirstSize" split>
      <q-list>
        <q-item
          clickable
          v-close-popup
          v-for="num in size"
          :key="num"
          @click="setSize(num)"
        >
          <q-item-section>
            <q-item-label>{{ num }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: 'PaginatorDropdown',
  props: {
    size: {
      type: Array,
      default: () => [5, 15, 25]
    },
    defaultFirstSize: {
      type: Number,
      default: 4
    }
  },
  setup (props, context) {
    function setSize (val) {
      context.emit('set-size', val)
    }
    return { setSize }
  }
}
</script>

<style scoped>

</style>
