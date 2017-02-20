import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Home from 'components/Home.vue'
import SecretQuote from 'components/SecretQuote.vue'
import Signup from 'components/Signup.vue'
import Login from 'components/Login.vue'
import Root from 'components/root.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
    {
      path: '/Hello',
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
      path: '/secretquote',
      name: 'SecretQuote',
      component: SecretQuote
    }
  ]
})
