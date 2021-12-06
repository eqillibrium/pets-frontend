import { Notify } from 'quasar'

export class Message {
  static success (text) {
    Notify.create({
      type: 'positive',
      message: text
    })
  }

  static warning (text) {
    Notify.create({
      type: 'warning',
      message: text
    })
  }

  static danger (text) {
    Notify.create({
      type: 'negative',
      message: text
    })
  }
}
