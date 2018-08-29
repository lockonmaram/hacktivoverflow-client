<template>
  <v-flex xs12 md5 offset-md2>
    <v-card class="my-3" hover color="secondary">
      <v-container fill-height fluid>
        <v-layout>
          <v-flex xs12>
            <v-flex xs12 align-end d-flex>
              <span class="headline text-xs-left">{{ question.title }}</span>
            </v-flex>
            <v-flex xs12 align-end d-flex>
              <small class="text-xs-left">By: {{ question.writer.name }}</small>
            </v-flex>
            <v-flex xs12 align-end d-flex>
              <small class="headline text-xs-right">point: {{ question.upvote.length - question.downvote.length }}</small>
            </v-flex>
            <v-btn v-if="user._id !== question.writer._id" flat icon color="blue lighten-2" style="float: right;" @click="voteDownQ">
              <v-icon>thumb_down</v-icon>
            </v-btn>
            <v-btn v-if="user._id !== question.writer._id" flat icon color="blue lighten-2" style="float: right;" @click="voteUpQ">
              <v-icon>thumb_up</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <hr>
      <v-card-text>
        <p v-html="question.content"></p>
      </v-card-text>
      <v-card-actions v-if="user._id === question.writer._id">
        <v-btn icon class="light-blue--text" @click="tweet(question)">
          <v-icon medium>fa-twitter</v-icon>
        </v-btn>
        <v-btn icon class="blue--text text--darken-4">
          <v-icon medium>fa-facebook</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat class="blue--text" @click="editQ">edit</v-btn>
        <v-btn flat class="red--text" @click="deleteQ">delete</v-btn>
      </v-card-actions>
    </v-card>
    <h1>Answers:</h1>
    <div v-for="answer in question.answers">
      <v-card class="my-3" hover color="secondary">
        <v-container fill-height fluid>
          <v-layout>
            <v-flex xs12>
              <v-flex xs12 align-end d-flex>
                <small class="text-xs-left">{{ answer.writer.name }}:</small>
              </v-flex>
              <v-flex xs12 align-end d-flex>
                <span class="headline text-xs-left" v-html="answer.content"></span>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions v-if="user._id === answer.writer._id || user._id === question.writer._id">
          <v-spacer></v-spacer>
          <v-btn flat class="blue--text"  @click="editA(answer._id)">edit</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
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
import swal from 'sweetalert2'

export default {
  name: "question",
  data: () => ({
    questionPoint: 0,
    valid: true,
    myHTML: '',
  }),
  methods: {
    ...mapActions([
      "getQuestion",
      "addAnswer",
      "deleteQuestion",
      "upvoteQuestion",
      "downvoteQuestion",
      "tweet"
    ]),
    validate () {
      if (this.$refs.form.validate()) {
        let inputObj = {
          content: this.myHTML,
          questionId: this.question._id
        }
        this.addAnswer(inputObj)
      }
    },
    deleteQ(){
      let inputObj = {
        questionId: this.question._id
      }
      this.deleteQuestion(inputObj)
    },
    editQ(){
      this.$router.push(`/${this.question._id}/edit`)
    },
    editA(answerId){
      this.$router.push(`/answer/${answerId}/edit`)
    },
    point(){
      this.questionPoint = this.question.upvote.length - this.question.downvote.length
    },
    voteUpQ(){
      let inputObj = {
        questionId: this.question._id
      }
      this.upvoteQuestion(inputObj)
    },
    voteDownQ(){
      let inputObj = {
        questionId: this.question._id
      }
      this.downvoteQuestion(inputObj)
    }
  },
  computed: {
    ...mapState([
      "question",
      "user"
    ])
  },
  created(){
    this.getQuestion(this.$route.params.questionId)
    this.point()
  }
}
</script>
