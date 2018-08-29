import Vue from 'vue'
import Vuex from 'vuex'
import { provider, firebase } from '@/firebase.js'
import axios from 'axios'
import swal from 'sweetalert2'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    question: {},
    questions: [],
    answer: {}
  },
  mutations: {
    TOKEN_CHECK (state){
      state.token = localStorage.getItem('token')
    },
    GET_QUESTIONS (state, payload){
      state.questions= payload
    },
    GET_QUESTION (state, payload){
      state.question = payload
    },
    GET_ANSWER (state, payload){
      state.answer = payload
    },
    GET_USER (state, payload){
      state.user = payload
    }
  },
  actions: {
    registerUser(context, payload){
      axios.post('https://overflowserver.lockonmaram.com/signup', {
        name: payload.name,
        email: payload.email,
        password: payload.password
      })
      .then(result=>{
        swal(
          'You have been registered!',
          'Please login!',
          'success'
        )
        .then(ok=>{
          router.push('/')
        })
      })
      .catch(err=>{
        console.log(err);
        swal(
          'Something went wrong!',
          `error message: ${err.message}`,
          'error'
        )
      })
    },
    fbLogin(context){
      firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        axios.post('https://overflowserver.lockonmaram.com/fbLogin',{},{
          headers: {
            token: token
          }
        })
        .then(res=>{
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('id', res.data.data.id)
          context.commit('TOKEN_CHECK')
          swal(
            'Yeay!',
            'You have logged in!',
            'success'
          )
          .then(ok=>{
            router.push('/')
          })
        })
        .catch(err=>{
          // console.log(err);
          swal(
          'Good job!',
          `${err}`,
          'error'
          )
        })
        // console.log('fb token', token);
        var user = result.user;
        // console.log('fb user', user);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
    login (context, payload) {
      // console.log('ini context',context);
      // console.log('ini peyload',payload);
      axios.post('https://overflowserver.lockonmaram.com/login', {
        email: payload.email,
        password: payload.password
      })
      .then(result=>{
        localStorage.setItem('token', result.data.data.token)
        localStorage.setItem('id', result.data.data.id)
        context.commit('TOKEN_CHECK')
        swal(
          'Yeay!',
          'You have logged in!',
          'success'
        )
        .then(ok=>{
          router.push('/')
        })
      })
      .catch(err=>{
        swal(
          'Something went wrong!',
          `error message: ${err.message}`,
          'error'
        )
      })
    },
    logout(context) {
      localStorage.clear()
      context.commit('TOKEN_CHECK')
      swal("You have logged out", "See you later!")
      .then(ok=>{
        router.push('/')
      })
    },
    tokenCheck(context){
      context.commit('TOKEN_CHECK')
    },
    addQuestion(context, payload){
      axios.post('https://overflowserver.lockonmaram.com/questions', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result=>{
        swal(
          'Yeay!',
          'Your question has been posted!',
          'success'
        )
        .then(ok=>{
          router.push('/')
        })
      })
      .catch(err=>{
        swal(
          'Something went wrong!',
          `error message: ${err.message}`,
          'error'
        )
      })
    },
    upvoteQuestion(context, payload){
      axios.put(`https://overflowserver.lockonmaram.com/questions/${payload.questionId}/upvote`,{},{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result=>{
        router.go()
      })
      .catch(err=>{
        // console.log(err);
        swal(
          'Uh-Oh!',
          `You already voted up!`,
          'warning'
        )
        router.push(`/${payload.questionId}`)
      })
    },
    downvoteQuestion(context, payload){
      axios.put(`https://overflowserver.lockonmaram.com/questions/${payload.questionId}/downvote`,{},{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result=>{
        router.go()
      })
      .catch(err=>{
        swal(
          'Uh-Oh!',
          `You already voted down!`,
          'warning'
        )
        router.push(`/${payload.questionId}`)
      })
    },
    updateQuestion(context, payload){
      axios.put(`https://overflowserver.lockonmaram.com/questions/${payload.questionId}`, {
        title: payload.title,
        content: payload.content
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result=>{
        swal(
          'Yeay!',
          'Your question has been updated!',
          'success'
        )
        .then(ok=>{
          router.push(`/${payload.questionId}`)
        })
      })
      .catch(err=>{
        swal(
          'Something went wrong!',
          `error message: ${err.message}`,
          'error'
        )
      })
    },
    deleteQuestion(context, payload){
      axios.delete(`https://overflowserver.lockonmaram.com/questions/${payload.questionId}`,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result=>{
        swal(
          'Yeay!',
          'Your question has been deleted!',
          'success'
        )
        .then(ok=>{
          router.push('/')
        })
      })
      .catch(err=>{
        swal(
          'Something went wrong!',
          `error message: ${err.message}`,
          'error'
        )
      })
    },
    addAnswer(context, payload){
      axios.post(`https://overflowserver.lockonmaram.com/answers/${payload.questionId}`, {content: payload.content}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result=>{
        swal(
          'Yeay!',
          'Your answer has been posted!',
          'success'
        )
        .then(ok=>{
          router.go()
        })
      })
      .catch(err=>{
        swal(
          'Something went wrong!',
          `error message: ${err.message}`,
          'error'
        )
      })
    },
    updateAnswer(context, payload){
      axios.put(`https://overflowserver.lockonmaram.com/answers/${payload.answerId}`, {content: payload.content}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(result=>{
        swal(
          'Yeay!',
          'Your answer has been updated!',
          'success'
        )
        .then(ok=>{
          router.push('/')
        })
      })
      .catch(err=>{
        swal(
          'Something went wrong!',
          `error message: ${err.message}`,
          'error'
        )
      })
    },
    getAnswer(context, answerId){
      axios.get(`https://overflowserver.lockonmaram.com/answers/${answerId}`,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(answer=>{
        // console.log(answer);
        context.commit('GET_ANSWER', answer.data.data)
      })
    },
    getQuestions(context){
      axios.get('https://overflowserver.lockonmaram.com/questions')
      .then(questions=>{
        // console.log(questions);
        context.commit('GET_QUESTIONS', questions.data.data)
      })
    },
    getQuestion(context, questionId){
      axios.get(`https://overflowserver.lockonmaram.com/questions/${questionId}`)
      .then(question=>{
        // console.log(question);
        context.commit('GET_QUESTION', question.data.data)
      })
    },
    getUser(context){
      let userId = localStorage.getItem('id')
      axios.get(`https://overflowserver.lockonmaram.com/users/${userId}`)
      .then(user=>{
        // console.log(user);
        context.commit('GET_USER', user.data.data)
      })
    },
    tweet(context, question){
      let message = `I%20have%20a%20question:%20${question.title}`
      window.open(`https://twitter.com/intent/tweet?text=${message}&hashtags=OverFLow`)
    }
  }
})
