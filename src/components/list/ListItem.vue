<template>
    <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom text-h6">
                {{ app.description }}
            </div>
        </q-img>

        <q-list>
            <q-item clickable>
                <q-item-section avatar>
                    <q-icon color="primary" name="local_bar" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Bar XYZ</q-item-label>
                    <q-item-label caption>Have a drink.</q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable>
                <q-item-section avatar>
                    <q-icon color="red" name="local_gas_station" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Gas Station</q-item-label>
                    <q-item-label caption>Fill your gas tank.</q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable>
                <q-item-section avatar>
                    <q-icon color="amber" name="local_movies" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Cinema XYZ</q-item-label>
                    <q-item-label caption>Watch a movie.</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
        <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    app: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
