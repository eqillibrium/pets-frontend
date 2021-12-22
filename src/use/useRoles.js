import { computed } from 'vue'
import { useStore } from 'vuex'

export function useIsCreator (app) {
  const store = useStore()
  const user = computed(() => store.getters['auth/user'])
  const isCreator = computed(() => user.value && user.value.id === app.user_id)

  return { isCreator }
}

export function useIsExecutor (app) {
  const store = useStore()
  const user = computed(() => store.getters['auth/user'])
  const isExecutor = computed(() => user.value && user.value.id === app.executor_user_id)

  return { isExecutor }
}
