<template>
  <div class="home">
    <v-content>
      <v-container>
        <v-layout row wrap align-center>
          <Login v-if="token === null"/>
          <Profile v-else/>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import Profile from '@/components/Profile.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
    Profile,
    Login
  },
  methods: {
    ...mapActions([
      'tokenCheck'
    ])
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  created(){
    this.tokenCheck()
  }
}
</script>
