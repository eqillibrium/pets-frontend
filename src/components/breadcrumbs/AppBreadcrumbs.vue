<template>
  <nav>
    <q-breadcrumbs class="text-brown">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          color="secondary"
        />
      </template>

      <q-breadcrumbs-el
        :label="route.name"
        :icon="route.icon"
        :to="route.to"
        class="text-secondary"
        v-for="route in routes"
        :key="route"
        exact
      />
    </q-breadcrumbs>
  </nav>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const route = useRoute()
    const routeTranslate = {
      '/': { name: 'Главная', icon: 'home' },
      '/about': { name: 'О нас', icon: 'info' },
      '/admin': { name: 'Админка', icon: 'manage_accounts' },
      '/profile': { name: 'Профиль', icon: 'person_outline' },
      '/applications': { name: 'Заявки', icon: 'apps' }
    }
    const routes = ref([])
    onBeforeMount(() => {
      routes.value = ((route.path).split('/')).map(el => {
        return {
          to: `/${el}`,
          name: routeTranslate[`/${el}`].name,
          icon: routeTranslate[`/${el}`].icon
        }
      })
    })
    return {
      routes
    }
  }
}
</script>
