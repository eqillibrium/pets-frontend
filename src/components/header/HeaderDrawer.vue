<template>
  <q-drawer
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
export default {
  name: 'HeaderDrawer'
}
</script>

<style scoped>

</style>
