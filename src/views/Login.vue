<template>
  <q-page class="flex justify-center items-center">
    <div class="q-pa-md" style="max-width: 400px">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="login"
            label="Введите Ваш логин *"
            hint="Логин"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Нужно ввести логин']"
          />

          <q-toggle
            v-model="accept"
            label="Принимаю условия пользовательского соглашения" />

          <div>
            <q-btn
              label="Submit"
              type="submit"
              color="primary"/>
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup () {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const login = ref(null)
    const accept = ref(false)
    const message = computed(() => route.query.message)

    if (message.value === 'auth') {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Недостаточно прав. Авторизуйтесь'
      })
    }

    return {
      login,
      accept,

      async onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Сначала Вам нужно принять условия пользовательского соглашения'
          })
        } else {
          try {
            await store.dispatch('auth/login', 'payload')
            await $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'авторизация прошла успешно!'
            })
            await router.push('/')
          } catch (e) {
            console.log()
          }
        }
      },

      onReset () {
        login.value = null
        accept.value = false
      }
    }
  }
}
</script>

<style scoped>

</style>
