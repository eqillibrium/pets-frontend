<template>
  <q-page>
  </q-page>
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
