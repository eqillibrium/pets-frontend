<template>
  <div class="row">
    <div class="col-3">
      <div class="q-pa-md">
        <q-list
          bordered
          padding
          class="rounded-borders text-primary"
        >
          <q-item
            clickable
            v-ripple
            @click="getData"
            active-class="my-menu-link"
          >
            <q-item-section
              avatar
            >
              <q-icon
                name="group"
              />
            </q-item-section>

            <q-item-section>Пользователи</q-item-section>
          </q-item>

          <!--      <q-separator spaced />-->

          <q-item
            clickable
            v-ripple
            @click="link = 'outbox'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="apps" />
            </q-item-section>

            <q-item-section>Заявки</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="col">
      <AppBreadcrumbs class="q-pt-md q-pl-md q-gutter-sm" />
      <div class="q-pa-md d-flex">
        <q-table
          title="Список пользователей"
          row-key="name"
          :columns="columns"
          :rows="users"
          :pagination="{ rowsPerPage: 10 }"
          v-if="!loading"
          @row-click="getData"
        />
        <AppCubeLoader v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import AppCubeLoader from '@/components/loaders/AppCubeLoader'
import AppBreadcrumbs from '@/components/breadcrumbs/AppBreadcrumbs'

export default {
  name: 'Admin.vue',
  components: { AppBreadcrumbs, AppCubeLoader },
  setup () {
    const loading = ref(false)
    const columns = [
      {
        name: 'name',
        required: true,
        label: 'Пользователь',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'phone', align: 'center', label: 'phone', field: 'phone', sortable: true },
      { name: 'users_role', align: 'center', label: 'users_role', field: 'users_role', sortable: true }
    ]
    const users = ref([])
    const getData = () => {
      console.log(users.value)
    }
    onBeforeMount(async () => {
      try {
        loading.value = true
        const response = await fetch('http://localhost:80/api/users')
        const data = await response.json()
        users.value = data.data
        console.log('success')
        loading.value = false
      } catch (e) {
      }
    })
    return {
      getData,
      users,
      columns,
      loading
    }
  }
}
</script>

<style scoped>

</style>
