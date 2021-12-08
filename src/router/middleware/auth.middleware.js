export default function auth ({ next, store }) {
  if (!store.getters['auth/isAuthenticated']) {
    return next({
      name: 'Login',
      query: {
        message: 'auth'
      }
    })
  }
  return next()
}
