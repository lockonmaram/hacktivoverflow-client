<template>
  <v-flex xs12 md4>
    <div class="text-xs-center">
      <v-avatar size="125px">
        <img
        class="img-circle elevation-7 mb-1"
        :src="user.imageUrl"
        >
      </v-avatar>
      <div class="headline"><span style="font-weight:bold">{{user.name}}</span></div>
      <v-layout justify-space-between>
        <!-- <a href="javascript:;" class="body-2">Home</a>
        <a href="javascript:;" class="body-2">About</a>
        <a href="javascript:;" class="body-2">Github</a>
        <a href="javascript:;" class="body-2">Other</a> -->
      </v-layout>
    </div>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "profile",
  methods: {
    ...mapActions([
      "getUser"
    ])
  },
  computed: {
    ...mapState([
      "user"
    ])
  },
  created(){
    this.getUser()
  }
}
</script>
