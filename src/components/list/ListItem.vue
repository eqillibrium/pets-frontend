<template>
  <div class="q-pa-md items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-badge color="orange" floating transparent>{{app.status}}</q-badge>
        <q-card-section class="col-5 flex flex-center" style="max-width: 350px">
          <q-badge floating transparent :color="app.executor_user_id ? 'blue' : 'green'">{{app.executor_user_id ? 'В работе' : 'Свободно'}}</q-badge>
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">
            Дата
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ app.description }}</div>
          <div class="text-caption text-grey">
            Опциональное дополнительное описание
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section class="q-pt-xs">
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
      </q-card-section>
      <q-separator />
      <q-card-actions class="row">
        <q-btn flat class="bg-orange" color="white" @click="info" v-if="isCreator">Изменить</q-btn>
        <q-btn flat class="bg-green" color="white" @click="accept" v-if="!isExecutor && !isCreator">Принять</q-btn>
        <q-btn flat class="bg-red" color="white" v-if="isExecutor">Отказаться</q-btn>
        <q-btn flat @click="info">Инфо</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
// import { computed } from 'vue'
import { useStore } from 'vuex'
import { useGetUser } from '@/use/useGetUser'
import { useIsCreator, useIsExecutor } from '@/use/useRoles'

export default {
  name: 'ListItem',
  props: {
    app: {
      type: Object
    }
  },
  setup (props) {
    const store = useStore()
    const user = useGetUser()

    const accept = async () => {
      try {
        const payload = {
          id: props.app.id,
          executor_user_id: user.value.id
        }
        await store.dispatch('apps/updateApp', payload)
      } catch (e) {
        console.log(e)
      }
    }
    return {
      ...useIsCreator(props.app),
      ...useIsExecutor(props.app),
      info: () => { console.log(props.app) },
      accept
    }
  }
}
</script>

<style scoped>

</style>
