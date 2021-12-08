export default function admin ({ next, store }) {
  if (!store.getters['auth/isAdmin']) {
    return next({
      name: 'Login',
      query: {
        message: 'auth'
      }
    })
  }
  return next()
}
