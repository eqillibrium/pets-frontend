<template>
  <div class="q-pa-lg flex flex-center">
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" :label="size" split>
        <q-list>
          <q-item clickable v-close-popup @click="setSize(5)">
            <q-item-section>
              <q-item-label>5</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="setSize(10)">
            <q-item-section>
              <q-item-label>10</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="setSize(25)">
            <q-item-section>
              <q-item-label>25</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <q-pagination
      v-model="numberOfPage"
      :max="countOfPages"
      direction-links
    >
    </q-pagination>
  </div>
</template>

<script>

import { ref } from 'vue'

export default {
  // name: 'AppPaginator',
  // props: {
  //   pageCount: {
  //     type: Object
  //   },
  //   pageNumber: {
  //     type: Number
  //   }
  // },
  // setup (props) {
  //   const numberOfPage = ref(props.pageNumber)
  //   const countOfPages = ref(props.pageCount.value)
  //   console.log(countOfPages)
  //   const store = useStore()
  //   const size = ref(4)
  //   const pageNumber = ref(1)
  //   const apps = computed(() => store.getters['apps/apps'])
  //   const pageCount = computed(() => {
  //     const i = apps.value.length
  //     const s = size.value
  //     return Math.ceil(i / s)
  //   })
  //   const paginatedData = computed(() => {
  //     const start = (pageNumber.value - 1) * size.value
  //     const end = start + size.value
  //     return apps.value.slice(start, end)
  //   })
  //   const nextPage = () => {
  //     pageNumber.value++
  //   }
  //   const prevPage = () => {
  //     pageNumber.value--
  //   }
  //   provide('paginatedData', paginatedData)
  //   return {
  //     numberOfPage,
  //     countOfPages
  //   }
  // }
}
</script>

<style scoped>

</style>
