<template>
  <q-dialog>
    <div class="q-pa-md bg-white">
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        filled
        label="Ориентировочный адрес *"
        hint="Например, г. Сочи, ул. Горькова, д. 22"
        lazy-rules
        v-model="newApp.address"
        :rules="[ val => val && val.length > 0 || 'Пожалуйста, укажите адрес']"
      />

      <q-input
        filled
        label="Что требуется сделать *"
        hint="Например, отвезти котика к ветеринару"
        lazy-rules
        v-model="newApp.description"
        :rules="[
          val => val && val.length > 0 && val.length < 100 || 'Укажите, что требуется сделать  '
        ]"
      />

      <q-input
        filled
        label="Вознаграждение исполнителю *"
        hint="Например, 1000 рублей "
        lazy-rules
        v-model="newApp.price"
        :rules="[ val => val && val.length > 0 || 'Пожалуйста, предложите хоть что-то']"
      />

      <div>
        <q-btn label="Создать" type="submit" color="primary"/>
        <q-btn label="Очистить поля" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
  </q-dialog>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { Message } from '@/utils/Message'

export default {
  setup () {
    const store = useStore()

    const newApp = reactive({
      address: 'г. Сочи, ул. Горькова, д. 22',
      description: 'отвезти котика к ветеринару',
      price: '1000 рублей'
    })

    return {
      newApp,
      onSubmit: async () => {
        try {
          await store.dispatch('apps/createApp', newApp)
          Message.success('Заявка была успешно создана!')
        } catch (e) {

        }
      },
      onReset: () => {
        console.log(newApp)
      }
    }
  }
}
</script>
