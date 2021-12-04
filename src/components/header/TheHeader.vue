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
          name="add"
          class="cursor-pointer"
        />
        <q-icon
          v-if="!isAuth"
          name="login"
          class="cursor-pointer"
          @click="$router.push('/login')"
        />
        <q-icon
          v-else
          name="logout"
          class="cursor-pointer"
          @click="logout"
        />
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    bordered
    class="bg-grey-2"
  >
    <q-list>
      <q-item-label header>Боковое меню</q-item-label>
      <q-item clickable tag="a" target="_blank">
        <q-item-section avatar>
          <q-icon name="school" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Название</q-item-label>
          <q-item-label caption>Дополнительная строка</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" target="_blank">
        <q-item-section avatar>
          <q-icon name="code" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Название</q-item-label>
          <q-item-label caption>Дополнительная строка</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>

import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TheHeader',

  setup () {
    const store = useStore()

    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const isAdmin = computed(() => store.getters['auth/isAdmin'])
    const logout = async () => {
      await store.dispatch('auth/logout')
    }
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
      logout
    }
  }
}
</script>

<style scoped>

</style>
