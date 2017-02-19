import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Home from 'components/Home.vue'
import SecretQuote from 'components/SecretQuote.vue'
import Signup from 'components/Signup.vue'
import Login from 'components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: 'secretquote',
      name: 'SecretQuote',
      component: SecretQuote
    }
  ]
})

// router.map({
//   '/home': {
//     component: Home
//   },
//   'secretquote': {
//     component: SecretQuote
//   },
//   '/login': {
//     component: Login
//   },
//   '/signup': {
//     component: Signup
//   }
// })

// // Redirect to the home route if any routes are unmatched
// router.redirect({
//   '*': '/home'
// })
