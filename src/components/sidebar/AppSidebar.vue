<template>
  <div class="col-3">
    <div class="q-pa-md">
      <q-list
        bordered padding
        class="rounded-borders text-secondary"
      >

        <!--      <q-separator spaced />-->

        <q-item
          clickable
          v-ripple
          @click="info"
        >
          <q-item-section
            avatar
          >
            <q-icon
              name="apps"
            />
          </q-item-section>

          <q-item-section>Все заявки</q-item-section>
          <q-badge color="green">
            {{ count }}
          </q-badge>
        </q-item>

        <q-item
          class="text-orange"
          clickable
          v-ripple
          active-class="my-menu-link"
          @click="info"
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
</template>

<script>
export default {
  props: ['count'],
  name: 'AppSidebar'
}
</script>

<style scoped>

</style>
