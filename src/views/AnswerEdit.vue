<template>
  <div class="aEdit">
    <v-content>
      <v-container>
        <v-layout row wrap justify-center>
          <EditAnswer/>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EditAnswer from '@/components/EditAnswer.vue'

export default {
  name: 'aEdit',
  components: {
    EditAnswer
  },
  computed: {
    ...mapState([
      'token'
    ])
  }
}
</script>
