import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Question from './components/Question.vue'
import Questions from './components/Questions.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/',
        name: 'questions',
        component: Questions,
        props: true
      },{
        path: '/:questionId',
        name: 'question',
        component: () => import(/* webpackChunkName: "article" */ './components/Question.vue'),
        props: true
      },{
        path: '/:questionId/edit',
        name: 'questionEdit',
        component: () => import(/* webpackChunkName: "article" */ './views/QuestionEdit.vue'),
        beforeEnter: (to, from, next) => {
          let token = localStorage.getItem('token')
          if (token) {
            next()
          } else {
            next('/')
          }
        },
        props: true
      }]
    },
    {
      path: '/user/form',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token')
        if (!token) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/question/add',
      name: 'ask',
      component: () => import(/* webpackChunkName: "addquestion" */ './views/Ask.vue'),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token')
        if (token) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/answer/:answerId/edit',
      name: 'answerEdit',
      component: () => import(/* webpackChunkName: "article" */ './views/AnswerEdit.vue'),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token')
        if (token) {
          next()
        } else {
          next('/')
        }
      }
    },
  ]
})
