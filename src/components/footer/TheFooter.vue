<template >
  <q-footer
    reveal
    style="background-color: #8A8DAF;"
  >
    <div class="row">
      <div class="col-4" v-for="a in 3" :key="a">
        <div class="q-pa-md justify-around" style="max-width: 350px">
          <q-list dense>
            <q-item clickable v-ripple>
              <q-item-section>Ссылка футера</q-item-section>
            </q-item>
          </q-list>
        </div>
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
