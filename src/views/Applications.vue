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
              @click="info"
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
        <div class="q-pa-lg flex flex-center" v-if="!loading">
          <div class="q-pa-md">
            <q-btn-dropdown color="primary" :label="config.size" split>
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
            v-model="config.pageNumber"
            :max="pageCount"
            direction-links
          >
          </q-pagination>
        </div>
        <div class="q-pa-md" v-else>
          <div class="q-gutter-md row items-center justify-center q-mt-xl">
            <q-spinner-cube
              size="25%"
              color="primary"
            />
          </div>
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

export default {
  components: {
    AppList
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
      paginator,
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
