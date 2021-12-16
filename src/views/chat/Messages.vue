<template>
  <q-page>
<div class="chat">
  <Conversation :contact="selectedContact" :messages="messages" @new="saveNewMessage"/>
  <ContactsList :contacts="contacts" @selected="startConversationWith"/>
</div>
  </q-page>
</template>

<script>
import axios from 'axios'
import Conversation from './Conversation'
import ContactsList from './ContactsList'
import { useStore } from 'vuex'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
/*  import { useStore } from 'vuex' */
/* const client = require('pusher-js')
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'a3ba51b9f106adeef37b',
  client: client
})
 */
const TOKEN_KEY = 'jwt-token'
window.Pusher = require('pusher-js')
const options = {
  broadcaster: 'pusher',
  cluster: 'eu',
  encrypted: true,
  key: 'a3ba51b9f106adeef37b',
  forceTLS: true,
  authEndpoint: 'http://localhost/api/broadcasting/auth',
  auth: {
    headers: {
      authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    }
    /*
  broadcaster: 'pusher',
  key: 'a3ba51b9f106adeef37b',
  cluster: 'eu',
  forceTLS: true,
  authEndpoint: 'http://localhost/api/broadcasting/auth'
   */
  }
}
const echo = new Echo(options)
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedContact: null,
      messages: [],
      contacts: []
    }
  },
  mounted () {
    /*
      const store = useStore()
      const profile = store.getters['auth/user']
      console.log(profile.name)
    */
    const store = useStore()
    const user = store.getters['auth/user']
    console.log(user)
    echo.private(`messages.${user.id}`)
      .listen('NewMessage', (e) => {
        this.handleIncoming(e.message)
      })
    axios.get('http://localhost/api/contacts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
      }
    })
      .then((response) => {
        this.contacts = response.data
      })
  },
  methods: {
    startConversationWith (contact) {
      this.updateUnreadContact(contact, true)
      axios.get(`http://localhost/api/conversation/${contact.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        }
      })
        .then((response) => {
          this.messages = response.data
          this.selectedContact = contact
        })
    },
    saveNewMessage (message) {
      this.messages.push(message)
    },
    handleIncoming (message) {
      if (this.selectedContact && message.from === this.selectedContact.id) {
        this.saveNewMessage(message)
        return
      }
      // eslint-disable-next-line no-undef
      this.updateUnreadContact(message.from_contact, false)
    },
    updateUnreadContact (contact, reset) {
      this.contacts = this.contacts.map((single) => {
        if (single.id !== contact.id) {
          return single
        }
        if (reset) single.unread = 0
        else single.unread += 1
        return single
      })
    }
  },
  components: { Conversation, ContactsList }
}
</script>

<style lang="scss" scoped>
  .chat {
    display: flex;
  }
</style>
