<template>
  <!-- <v-layout row justify-center>
  </v-layout> -->
  <v-flex xs12 md10>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1>Edit a Question!</h1>
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
import { mapActions, mapState } from 'vuex'
import "vue-wysiwyg/dist/vueWysiwyg.css";


export default {
  name: 'EditQuestion',
  data: () => ({
    valid: true,
    title: this.question.title,
    titleRules: [
      v => !!v || 'Title is required'
    ],
    myHTML: this.question.content,
  }),
  methods: {
    ...mapActions([
      'updateQuestion'
    ]),
    validate () {
      if (this.$refs.form.validate()) {
        let inputObj = {
          title: this.title,
          content: this.myHTML,
          questionId: this.question._id
        }
        this.updateQuestion(inputObj)
      }
    },
    populate() {
      this.title = this.question.title,
      this.myHTML = this.question.content
    }
  },
  computed: {
    ...mapState([
      "question"
    ])
  },
  created(){
    this.populate()
  }
}
</script>
