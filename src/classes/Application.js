export default class {
  constructor (payload) {
    this.user_id = payload.userID || 1
    this.address = payload.address
    this.description = payload.description
    this.animal_type_id = 1
    this.price = payload.price
  }
}
