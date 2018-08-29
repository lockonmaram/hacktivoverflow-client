<template>
  <v-toolbar fixed color="accent">
    <v-toolbar-title>OverFlow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="secondary">
      <v-btn color="primary" to='/' class="hidden-sm-and-down">Home</v-btn>
      <v-btn v-if="token" color="primary" to='/question/add' class="hidden-sm-and-down">Ask</v-btn>
      <v-btn v-if="!token" color="primary" to='/user/form' class="hidden-sm-and-down">SignUp</v-btn>
      <v-btn v-else color="primary" @click="logout" class="hidden-sm-and-down">Logout</v-btn>
      <v-menu offset-y class="hidden-md-and-up">
        <v-btn
        slot="activator"
        color="primary"
        dark
        >
        Menu
        </v-btn>
        <v-list>
          <v-btn color="primary" to='/'>Home</v-btn>
          <v-btn v-if="token" color="primary" to='/question/add'>Ask</v-btn>
          <v-btn v-if="!token" color="primary" to='/user/form'>Login</v-btn>
          <v-btn v-else color="primary" @click="logout">Logout</v-btn>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState,mapActions } from 'vuex'

export default {
  name: 'NavBar',
  methods: {
    ...mapActions([
      "logout"
    ])
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
}
</script>
