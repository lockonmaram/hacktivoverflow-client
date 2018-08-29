<template>
  <!-- <v-layout row justify-center>
  </v-layout> -->
  <v-flex xs12 md10>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1>Edit an Answer!</h1>
      <wysiwyg v-model="myHTML"/>
      <v-btn
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
  name: 'EditAnswer',
  data: () => ({
    valid: true,
    myHTML: this.answer.content,
  }),
  methods: {
    ...mapActions([
      'getAnswer',
      'updateAnswer'
    ]),
    validate () {
      if (this.$refs.form.validate()) {
        let inputObj = {
          content: this.myHTML,
          answerId: this.$route.params.answerId
        }
        this.updateAnswer(inputObj)
      }
    },
    populate() {
      this.myHTML = this.answer.content
    }
  },
  computed: {
    ...mapState([
      "answer"
    ])
  },
  beforeCreate(){
    this.getAnswer(this.$route.params.answerId)
  },
  created(){
    this.populate()
  }
}
</script>
