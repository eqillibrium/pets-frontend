<template>
  <q-btn-dropdown
    v-if="isAuth"
    color="secondary"
    label="Мой профиль"
    dropdown-icon="change_history">
    <q-list>
      <q-item
        clickable
        v-close-popup
        exact
        to="/profile"
      >
        <q-item-section avatar>
          <q-avatar icon="person" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section
        >
          <q-item-label>Профиль</q-item-label>
          <q-item-label
            caption
          >{{ profile?.name }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
        :to="{ name: 'UserApps'}"
      >
        <q-item-section avatar>
          <q-avatar icon="assignment" color="secondary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label
          >Заявки</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item
        clickable
        v-close-popup
        @click="logout"
        v-if="isAuth">
        <q-item-section avatar>
          <q-avatar icon="logout" color="accent" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Выйти</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Message } from '@/utils/Message'

export default {
  name: 'HeaderProfileList',
  setup () {
    const router = useRouter()
    const store = useStore()

    const profile = computed(() => store.getters['auth/user'])
    const userApps = computed(() => store.getters['apps/getUserApps'])
    const show = () => {
      console.log(profile)
    }
    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const logout = async () => {
      try {
        await store.dispatch('auth/logout')
        Message.success('Вы вышли из системы')
        await router.push('/login')
      } catch (e) {
        console.log(e)
      }
    }
    onBeforeMount(async () => {
      await store.getters['auth/user']
    })

    return {
      isAuth,
      logout,
      profile,
      show,
      userApps
    }
  }
}
</script>

<style scoped>

</style>
