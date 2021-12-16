<template>
  <div class="conversation">
    <h1>{{ contact ? contact.name : 'Select a contact'}}</h1>
    <MessagesFeed :contact="contact" :messages="messages"/>
    <MessageComposer @send="sendMessage"/>
  </div>
</template>

<script>
import MessagesFeed from './MessagesFeed'
import MessageComposer from './MessageComposer'
import axios from 'axios'
import { useStore } from 'vuex'
/* import { useStore } from 'vuex' */

export default {
  props: {
    contact: {
      type: Object,
      default: null
    },
    messages: {
      type: Array,
      default () {
        return []
      }
    },
    profile: {
      type: Object,
      default () {
        return useStore().getters['auth/user']
      }
    }
  },
  methods: {
    sendMessage (text) {
      if (!this.contact) {
        return
      }
      axios.post('http://localhost/api/conversation/send', {
        from: this.profile.id,
        contact_id: this.contact.id,
        text: text
      }).then((response) => {
        this.$emit('new', response.data)
      })
    }
  },
  components: { MessagesFeed, MessageComposer }
}
</script>

<style lang="scss" scoped>
  .conversation {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
      font-size: 20px;
      padding: 10px;
      margin: 0;
      border-bottom: 1px dashed lightgray;
    }
  }
</style>
