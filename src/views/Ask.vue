<template>
  <div class="ask">
    <v-content>
      <v-container>
        <v-layout row wrap justify-center>
          <AddQuestion/>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import AddQuestion from '@/components/AddQuestion.vue'

export default {
  name: 'ask',
  components: {
    AddQuestion
  },
  computed: {
    ...mapState([
      'token'
    ])
  }
}
</script>
