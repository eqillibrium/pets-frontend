<template>
  <q-page>
    <div class="row">
      <AppSidebar :count="apps.length"/>
      <div class="col-9">
        <AppList :apps="paginatedData" v-if="!loading"/>
        <div class="q-pa-lg flex flex-center" v-if="!loading">
          <PaginatorDropdown
            :default-first-size="config.size"
            @set-size="setSize"
          />
          <q-pagination
            color="secondary"
            v-model="config.pageNumber"
            :max="pageCount"
            direction-links
          >
          </q-pagination>
        </div >
          <div class="col flex items-center justify-center" v-else>
            <q-spinner
              size="10%"
              color="secondary"
              :thickness="2"
            />
        </div>
        </div>

    </div>
  </q-page>
</template>

<script>
import { onBeforeMount, ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { usePaginator } from '@/use/usePaginator'
import AppList from '@/components/list/AppList.vue'
import AppSidebar from '@/components/sidebar/AppSidebar'
import PaginatorDropdown from '@/components/pagination/PaginatorDropdown'

export default {
  components: {
    AppList,
    PaginatorDropdown,
    AppSidebar
  },
  setup () {
    const store = useStore()
    const loading = ref(false)
    const apps = computed(() => store.getters['apps/apps'])
    const config = reactive({ pageNumber: 1, size: 4 })
    const paginator = usePaginator(apps, config)
    const pageCount = paginator.pageCount
    const paginatedData = paginator.paginatedData

    onBeforeMount(async () => {
      try {
        if (store.getters['apps/apps'].length === 0) {
          loading.value = true
          await store.dispatch('apps/getApps')
          loading.value = false
        }
      } catch (e) {
      }
    })
    return {
      apps,
      loading,
      pageCount,
      paginatedData,
      config,
      info: () => { console.log(paginatedData.value) },
      setSize: val => {
        config.size = val
      }
    }
  }
}
</script>
