export class User {
  constructor (payload) {
    this.name = payload?.name
    this.email = payload.email
    this.password = payload.password
    this.phone = payload?.phone
    this.password = payload?.password
    this.passport_number = null
  }
}
