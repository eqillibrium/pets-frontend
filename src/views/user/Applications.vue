<template>
  <div class="row">
    <AppSidebar :count="apps.length"/>
    <div class="col-9">
      <AppBreadcrumbs class="q-pt-md q-pl-md q-gutter-sm" />
      <AppList :apps="apps" v-if="!loading"/>
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
      </div>
      <AppCubeLoader v-else/>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { usePaginator } from '@/use/usePaginator'
import AppList from '../../components/list/AppList'
import AppSidebar from '../../components/sidebar/AppSidebar'
import PaginatorDropdown from '@/components/pagination/PaginatorDropdown'
import AppBreadcrumbs from '@/components/breadcrumbs/AppBreadcrumbs'
import AppCubeLoader from '@/components/loaders/AppCubeLoader'

export default {
  name: 'Applications',
  components: {
    AppBreadcrumbs,
    AppList,
    PaginatorDropdown,
    AppSidebar,
    AppCubeLoader
  },
  setup () {
    const store = useStore()

    const loading = ref(false)
    const apps = computed(() => store.getters['apps/getUserApps'])
    const config = reactive({ pageNumber: 1, size: 4 })
    const paginator = usePaginator(apps, config)
    const pageCount = paginator.pageCount
    const paginatedData = paginator.paginatedData

    onBeforeMount(async () => {
      try {
        loading.value = true
        await store.dispatch('apps/getUserAppsByID')
        loading.value = false
      } catch (e) {
      }
    })
    return {
      apps,
      config,
      loading,
      pageCount,
      paginatedData,
      setSize: val => {
        config.size = val
      }
    }
  }
}
</script>

<style scoped>

</style>
