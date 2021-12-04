<template>
  <q-page
    class="flex justify-center items-center"
  >
    <div
      class="q-pa-md"
      style="width: 400px"
    >
      <div class="q-pb-md">
        <q-btn-group spread>
          <q-btn
            :color="isLogin ? 'purple' : 'purple-4'"
            label="Вход"
            icon="login"
            @click="$router.push({ name: 'Login' })"
          />
          <q-btn
            :color="!isLogin ? 'purple' : 'purple-4'"
            label="Регистрация"
            icon="person_add"
            @click="$router.push({ name: 'Register' })"
          />
        </q-btn-group>
      </div>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="userData.email"
            label="Введите Ваш email *"
            hint="email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Нужно ввести email']"
          />

          <q-input
            filled
            v-model="userData.password"
            label="Введите Ваш пароль *"
            hint="Логин"
            lazy-rules
            :rules="[ val => val && val.length >= 8 || 'Минимальная длина пароля 8 символов']"
          />

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
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup () {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const userData = reactive({
      email: 'admin@mail.ru',
      password: '12345678910'
    })
    const message = computed(() => route.query.message)
    const isLogin = computed(() => {
      console.log(route.name)
      return route.name === 'Login'
    })

    if (message.value === 'auth') {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Недостаточно прав. Авторизуйтесь'
      })
    }

    return {
      userData,

      isLogin,

      async onSubmit () {
        try {
          await store.dispatch('auth/login', userData)
          if (!store.getters.isError) {
            await router.push('/')
            $q.notify({
              color: 'green-5',
              textColor: 'white',
              icon: 'success',
              message: 'авторизация прошла успешно!'
            })
          } else {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: store.getters.errorMessage
            })
          }
        } catch (e) {
          console.log()
        }
      },

      onReset () {
        userData.login = null
        userData.password = null
      }
    }
  }
}
</script>

<style scoped>

</style>
