<template>
  <div class="row items-center justify-center">
    <div class="col-8">
      <div class="q-pa-md d-flex">
        <q-card
          class="my-card"
          v-if="!loading"
          flat
        >
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs class="text-brown">
              <template v-slot:separator>
                <q-icon
                  size="1.5em"
                  name="chevron_right"
                  color="primary"
                />
              </template>

              <q-breadcrumbs-el label="Home" icon="home" to="/"/>
              <q-breadcrumbs-el label="Profile" icon="widgets" to="/profile" exact/>
            </q-breadcrumbs>
          </div>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Профиль пользователя: {{ user.name }}</q-toolbar-title>
          </q-toolbar>
          <q-list bordered class="rounded-borders">

            <q-item dense>
              <q-item-section>
                <div class="flex justify-between items-center q-my-sm">
                  <q-item-label caption>Учетные данные:</q-item-label>
                  <div class="text-grey-8 q-gutter-xs q-my-xs">
                    <q-btn size="12px" flat dense round icon="mode_edit"/>
                    <q-btn size="12px" flat dense round icon="more_vert" />
                  </div>
                </div>
              </q-item-section>
            </q-item>

            <q-item dense >
              <q-item-section avatar>
                Логин:
              </q-item-section>
              <q-item-section>
                {{ user.name }}
              </q-item-section>
            </q-item>

            <q-item dense >
              <q-item-section avatar>
                Email:
              </q-item-section>
              <q-item-section>
                {{ user.email }}
              </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item dense>
              <q-item-section>
                <div class="flex justify-between items-center q-my-sm">
                  <q-item-label caption>Данные профиля:</q-item-label>
                  <div class="text-grey-8 q-gutter-xs q-my-xs">
                    <q-btn size="12px" flat dense round icon="mode_edit"/>
                    <q-btn size="12px" flat dense round icon="more_vert" />
                  </div>
                </div>
              </q-item-section>
            </q-item>

            <q-item dense >
              <q-item-section avatar>
                Номер телефона:
              </q-item-section>
              <q-item-section>
                {{ profile.phone }}
              </q-item-section>
            </q-item>

            <q-item dense >
              <q-item-section avatar>
                Паспортные данные:
              </q-item-section>
              <q-item-section>
                {{ profile.passport_number || 'Нет данных' }}
              </q-item-section>
            </q-item>
            <q-separator spaced />
            <q-item dense>
              <q-item-section>
                <div class="flex justify-between items-center q-my-lg">
                  <q-item-label caption>Работа с порталом:</q-item-label>
                </div>
              </q-item-section>
            </q-item>
            <q-item dense @click="getData" clickable>
              <q-item-section avatar>
                Роль на портале:
              </q-item-section>
              <q-item-section>
                {{ profile.users_role == 'applicant' ? 'Заявитель' : 'Исполнитель'}}
              </q-item-section>
            </q-item>
            <q-item dense >
              <q-item-section avatar>
                Всего моих заявок:
              </q-item-section>
              <q-item-section>
                {{ userApps.length }}
              </q-item-section>
            </q-item>

          </q-list>
        </q-card>
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
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Admin.vue',
  setup () {
    const store = useStore()

    const loading = ref(false)
    const profile = computed(() => store.getters['auth/getProfile'])
    const userApps = computed(() => store.getters['apps/getUserApps'])
    const user = computed(() => store.getters['auth/user'])
    const getData = () => {
      console.log(profile.value)
    }
    onBeforeMount(async () => {
      try {
        loading.value = true
        await store.dispatch('auth/loadProfile')
        await store.dispatch('apps/getUserAppsByID')
        loading.value = false
      } catch (e) {
        console.log(e)
      }
    })
    return {
      getData,
      profile,
      user,
      loading,
      userApps
    }
  }
}
</script>

<style scoped>

</style>
