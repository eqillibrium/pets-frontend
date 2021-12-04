<template>
  <q-page
    class="flex justify-center items-center"
  >
    <div
      class="q-pa-md"
      style="max-width: 400px"
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
          v-model="userData.name"
          label="Введите Ваш логин *"
          hint="Логин"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Нужно ввести логин']"
        />
        <q-input
          filled
          v-model="userData.email"
          label="Введите Ваш email *"
          hint="email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Нужно ввести email',  val => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(val) || 'Некорректный email адрес']"
        />

        <q-input
          filled
          v-model="userData.phone"
          label="Введите Ваш телефон *"
          mask="+#(###)###-####"
          hint="Например, 77777777777"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Нужно ввести номер телефона',  val => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(val) || 'Введите номер полностью']"
        />

        <q-input
          filled
          type="password"
          v-model="userData.password"
          label="Введите пароль*"
          hint="Минимальная длина 8 символов"
          lazy-rules
          :rules="[ val => val && val.length >= 8 || 'Введите пароль длиной не менее 8 символов']"
        />

        <q-toggle
          v-model="userData.accept"
          label="Принимаю условия пользовательского соглашения"
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
      name: 'admin',
      email: 'admin@mail.ru',
      password: '12345678910',
      phone: '+79996665577',
      accept: false
    })

    // const name = ref(null)
    // const email = ref(null)
    // const password = ref(null)
    // const accept = ref(false)
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
      router,

      async onSubmit () {
        if (userData.accept !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Сначала Вам нужно принять условия пользовательского соглашения'
          })
        } else {
          try {
            await store.dispatch('auth/register', userData)
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
        }
      },

      onReset () {
        userData.name = null
        userData.email = null
        userData.password = null
        userData.phone = null
        userData.accept = false
      }
    }
  }
}
</script>

<style scoped>

</style>
