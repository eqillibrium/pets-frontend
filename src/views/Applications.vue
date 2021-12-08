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
              clickable
              v-ripple
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="apps" />
              </q-item-section>

              <q-item-section>Все заявки</q-item-section>
            </q-item>

            <q-item
              class="text-green"
              clickable
              v-ripple
              active-class="my-menu-link"
            >
              <q-item-section
                avatar
              >
                <q-icon
                  name="directions_run"
                />
              </q-item-section>

              <q-item-section>Активные</q-item-section>
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
        <AppList :apps="apps" v-if="!loading"/>
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
import { onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import AppList from '@/components/list/AppList.vue'

export default {
  components: {
    AppList
  },
  setup () {
    const store = useStore()

    const loading = ref(false)
    const apps = ref([])
    onBeforeMount(async () => {
      try {
        loading.value = true
        await store.dispatch('apps/getApps')
        apps.value = await store.getters['apps/apps']
        console.log('success')
        loading.value = false
      } catch (e) {
      }
    })
    return {
      apps,
      loading
    }
  }
}
</script>
