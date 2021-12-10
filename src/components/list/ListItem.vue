<template>
    <q-card class="my-card" style="min-width: 225px">
        <q-img src="https://yandex-images.clstorage.net/q9X6u3v82/b14040UM/gWAFQEe5k0lqAnPPLwryxn9xVSXwwONDzf4YAm4MHSUsJttdcptUDmAfzOY8pynNxR9ar2Rn2RB5pDm3pIaw-MAUkXDjXXbNj4NWu23LQjYeYMHQ5bDml8l7fWYv_H1hHYdeCPQf5c5k-hmg7JeZvDft-J6DFAvDfmM-JWVG5W2AcICUwh6QrAtwso8c3HKkfMWmNSFiU9LZThkyS64-5xhl2X2gazQcF6pZgmoRrlvkvNuMAYc6oK5SX8QXtVcdYNB1RKJPsCkJsGG_DQ8CtQ83Zjci8PFz6A5YoTnePZXrlEmMECuUDHTJe6G4sPxbJK84zmPVyHBNUx0mFmZUn3DBh_Uyb8DKSwBRLzx8Q4etJzeWgPBx0zldeNNqXX8UOJTYXgGZRf00KKuiK5GcKibtKJ-TttugDeLeBSY3Vf1hspVHUn2hOBpjga6OrUBnPnVmhrFBgpHZ_hqDeB5ed8mFKg9hSYX-ZchI85iwLzm2jrp-8-e5AH-zbpV2h1c88kPHVYNvs9saQKKu3S7Sh161FlSRc8BwODzqcItsTaVI5gte4eoFjrbYKHOpQb2JJz8rDaH1mUCdkz5UhMR07PGwhpVhH_GJe5KhTy7sUmZN53T0QsJAUes_mTHa7O_GOpcIf3J59C52WdnAe0Hu2mc8yc7BdFvzT3DvpgRmlx9y8DSkoN_Bqnqh0I4c3YLnHLTGVJNi8fCon4tCi11NxUhEKy9SGlWOdPqI06iC7JhFnFo-UiTZ0d-iXsbXVrbOwyEmtcOdkwipEhE_nB5gRs4khOXBgkAQaG3o0CndD6Rb1fuvQUvVXhbbyYEJcY6Zd2x7ngCmyJF_09wWBiW3L5LwBhehXDAou2BhLJ8scWbtJMXFYBBDc-oMSyG7vA5nCqXIH8HahnzWm7igKAAN2yQ_Op3R9qvwD2G_Fde0hRzgMxVlIN4RuCgAMy4fTgJmTIbmx_LggWNbLGoDC79M0">
            <div class="absolute-bottom text-h6">
                {{ app.description }}
            </div>
        </q-img>

        <q-list>
          <q-badge color="orange" floating>{{app.status}}</q-badge>
            <q-item clickable>
                <q-item-section avatar>
                    <q-icon color="primary" name="room" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ app.address }}</q-item-label>
                    <q-item-label caption>Адрес</q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable>
                <q-item-section avatar>
                    <q-icon color="red" name="pets" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ app.animal_type_id === 1 ? 'Котики' : 'Собакены'}}</q-item-label>
                    <q-item-label caption>Зверёк</q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable>
                <q-item-section avatar>
                    <q-icon color="amber" name="currency_ruble" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ app.price }}</q-item-label>
                    <q-item-label caption>Вознаграждение</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
        <q-card-actions>
            <q-btn flat class="bg-green" color="white">Принять</q-btn>
            <q-btn flat>Подробнее</q-btn>
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
