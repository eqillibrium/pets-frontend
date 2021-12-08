<template>
  <q-header elevated>
    <q-toolbar
      flat
    >
      <q-btn
        flat
        dense
        round
        @click="leftDrawerOpen = !leftDrawerOpen"
        aria-label="Menu"
        icon="menu"
      />

      <q-toolbar-title
        @click="$router.push('/')"
        class="cursor-pointer"
      >
        Помощь животным
      </q-toolbar-title>
      <q-space />
      <q-tabs
        shrink
        v-for="link in links"
        :key="link.name">
        <q-route-tab
          :name="link.name"
          :label="link.text"
          :to="link.to"
          exact
        />
      </q-tabs>
      <q-tabs
        shrink
      >
        <q-route-tab
          v-if="isAdmin"
          name="admin"
          label="админка"
          to="/admin"
          exact
        />
      </q-tabs>
      <div
        class="text-white q-gutter-md q-mx-md"
        style="font-size: 1.5em">
        <q-icon
          v-if="isAuth"
          name="add"
          class="cursor-pointer"
          @click="createApp = true"
        />

        <HeaderProfileList />

        <q-icon
          v-if="!isAuth"
          name="login"
          class="cursor-pointer"
          @click="$router.push('/login')"
        />
      </div>
    </q-toolbar>
  </q-header>

  <HeaderDrawer v-model="leftDrawerOpen"/>

  <AppCreateDialog v-model="createApp"/>
</template>

<script>

import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppCreateDialog from '../application/AppCreateDialog'
import HeaderDrawer from '../header/HeaderDrawer'
import HeaderProfileList from '../header/HeaderProfileList'

export default {
  name: 'TheHeader',
  components: { AppCreateDialog, HeaderDrawer, HeaderProfileList },

  setup () {
    const store = useStore()

    const createApp = ref(false)
    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const isAdmin = computed(() => store.getters['auth/isAdmin'])
    const links = [
      {
        name: 'applications',
        text: 'Объявления',
        to: '/applications'
      },
      {
        name: 'about',
        text: 'Информация',
        to: '/about'
      }
    ]

    return {
      leftDrawerOpen: ref(false),
      links,
      isAuth,
      isAdmin,
      createApp
    }
  }
}
</script>

<style scoped>

</style>
