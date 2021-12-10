<template>
  <q-page>
    <div class="row">
      <div class="col-3">
        <div class="q-pa-md">
          <q-list
            bordered padding
            class="rounded-borders text-primary"
          >

            <!--      <q-separator spaced />-->

            <q-item
              class="primary"
              clickable
              v-ripple
              active-class="my-menu-link"
            >
              <q-item-section
                avatar
              >
                <q-icon
                  name="apps"
                />
              </q-item-section>

              <q-item-section>Все заявки</q-item-section>
              <q-badge color="blue">
                {{ apps.length }}
              </q-badge>
            </q-item>

            <q-item
              class="text-orange"
              clickable
              v-ripple
              active-class="my-menu-link"
            >
              <q-item-section
                avatar
              >
                <q-icon
                  name="wrong_location"
                />
              </q-item-section>

              <q-item-section>Отмененные</q-item-section>
            </q-item>

          </q-list>
        </div>
      </div>
      <div class="col-9">
        <AppList :apps="paginatedData" v-if="!loading"/>
        <div class="q-pa-md" v-else>
          <div class="q-gutter-md row items-center justify-center q-mt-xl">
            <q-spinner-cube
              size="25%"
              color="primary"
            />
          </div>
        </div>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="pageNumber"
            :max="pageCount"
            direction-links
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import AppList from '@/components/list/AppList.vue'

export default {
  components: {
    AppList
  },
  setup () {
    const store = useStore()

    const loading = ref(false)
    const apps = computed(() => store.getters['apps/apps'])
    const pageNumber = ref(1)
    const size = ref(4)
    // const nextPage = () => {
    //   pageNumber.value++
    // }
    // const prevPage = () => {
    //   pageNumber.value--
    // }
    const pageCount = computed(() => {
      const i = apps.value.length
      const s = size.value
      return Math.ceil(i / s)
    })
    const paginatedData = computed(() => {
      const start = (pageNumber.value - 1) * size.value
      const end = start + size.value
      return apps.value.slice(start, end)
    })
    onBeforeMount(async () => {
      try {
        loading.value = true
        await store.dispatch('apps/getApps')
        loading.value = false
      } catch (e) {
      }
    })
    return {
      apps,
      loading,
      pageNumber,
      size,
      // nextPage,
      // prevPage,
      pageCount,
      paginatedData
    }
  }
}
</script>
