<template>
  <div class="qEdit">
    <v-content>
      <v-container>
        <v-layout row wrap justify-center>
          <EditQuestion/>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import EditQuestion from '@/components/EditQuestion.vue'

export default {
  name: 'qEdit',
  components: {
    EditQuestion
  },
  computed: {
    ...mapState([
      'token'
    ])
  }
}
</script>
