import { computed } from 'vue'
import { useStore } from 'vuex'

export function useGetUser () {
  const store = useStore()
  const user = computed(() => store.getters['auth/user'])

  return { user }
}
