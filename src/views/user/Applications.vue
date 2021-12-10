<template>
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

            <q-item-section>
              Все заявки</q-item-section>
            <q-badge color="blue">
              {{ apps.length }}
            </q-badge>
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
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs class="text-brown">
            <template v-slot:separator>
              <q-icon
                size="1.5em"
                name="chevron_right"
                color="primary"
              />
            </template>

            <q-breadcrumbs-el label="Главная" icon="home" to="/"/>
            <q-breadcrumbs-el label="Профиль" icon="settings_accessibility" to="/profile"/>
            <q-breadcrumbs-el label="Заявки" icon="format_list_bulleted" exact/>
          </q-breadcrumbs>
        </div>
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
</template>

<script>
import AppList from '../../components/list/AppList'
import { useStore } from 'vuex'
import { computed, onBeforeMount, ref } from 'vue'

export default {
  name: 'Applications',
  components: {
    AppList
  },
  setup () {
    const store = useStore()

    const loading = ref(false)
    const apps = computed(() => store.getters['apps/getUserApps'])
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
      loading
    }
  }
}
</script>

<style scoped>

</style>
