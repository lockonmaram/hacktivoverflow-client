<template>
  <div class="user">
    <v-layout row justify-center>
        <v-flex xs6>
          <Register/>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Register from '@/components/Register.vue'

export default {
  name: 'user',
  components: {
    Register
  }
}
</script>
