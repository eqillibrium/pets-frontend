<template >
    <q-footer reveal class="row footer">
      <div class="col-4">
        <div class="q-pa-md justify-around" style="max-width: 350px">
          <q-list dense>
            <q-item clickable v-ripple>
              <q-item-section>О нас</q-item-section>
            </q-item>
             <q-item clickable v-ripple>
              <q-item-section>Связаться с нами</q-item-section>
            </q-item>
             <q-item clickable v-ripple>
              <q-item-section>Поддержка</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>

</style>
