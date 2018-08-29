<template>
  <v-flex xs12 md5 offset-md2>
    <div v-for="question in questions" :key="question.title">
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
            </v-flex>
          </v-layout>
        </v-container>
        <hr>
        <v-card-text>
          <p v-html="question.content"></p>
        </v-card-text>
        <v-card-actions>
          <v-btn icon class="light-blue--text" @click="tweet(question)">
            <v-icon medium>fa-twitter</v-icon>
          </v-btn>
          <v-btn icon class="blue--text text--darken-4">
            <v-icon medium>fa-facebook</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat class="blue--text" :to='question._id'>Read More</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "questions",
  methods: {
    ...mapActions([
      "getQuestions",
      "tweet"
    ])
  },
  computed: {
    ...mapState([
      "questions"
    ])
  },
  mounted(){
    this.getQuestions()
  }
}
</script>
<style>
.headline{
  margin-left: 0px !important;
  padding-left: 0px !important;
}
</style>
