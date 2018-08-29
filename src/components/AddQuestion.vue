<template>
  <!-- <v-layout row justify-center>
  </v-layout> -->
  <v-flex xs12 md8>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1>Ask a Question!</h1>
      <v-text-field
      v-model="title"
      :rules="titleRules"
      label="Title"
      required
      ></v-text-field>
      <wysiwyg v-model="myHTML"/>
      <v-btn
      :disabled="!valid"
      @click.prevent="validate"
      >
      Submit
    </v-btn>
  </v-form>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'
import "vue-wysiwyg/dist/vueWysiwyg.css";


export default {
  name: 'AddQuestion',
  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Title is required'
    ],
    myHTML: '',
  }),
  methods: {
    ...mapActions([
      'addQuestion'
    ]),
    validate () {
      if (this.$refs.form.validate()) {
        let inputObj = {
          title: this.title,
          content: this.myHTML,
        }
        this.addQuestion(inputObj)
      }
    }
  }
}
</script>
