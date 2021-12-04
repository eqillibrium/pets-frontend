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
      <div class="col-8">
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
    <pre>
      {{ apps }}
    </pre>
  </q-page>
</template>

<script>
import AppList from '@/components/list/AppList.vue'
import { onBeforeMount, ref } from 'vue'

export default {
  components: {
    AppList
  },
  setup () {
    const loading = ref(false)
    const apps = ref([])
    onBeforeMount(async () => {
      try {
        loading.value = true
        const response = await fetch('http://localhost:80/api/list')
        const data = await response.json()
        apps.value = data.data
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
