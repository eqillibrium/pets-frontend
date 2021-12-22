import { computed } from 'vue'

export function usePaginator (data, config) {
  const pageCount = computed(() => {
    const i = data.value.length
    const s = config.size
    return Math.ceil(i / s)
  })
  const paginatedData = computed(() => {
    const start = (config.pageNumber - 1) * config.size
    const end = start + config.size
    return data.value.slice(start, end)
  })
  return { paginatedData, pageCount }
}
