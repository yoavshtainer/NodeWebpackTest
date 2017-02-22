import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Home from 'components/Home'
import SecretQuote from 'components/SecretQuote'
import Signup from 'components/Signup'
import Login from 'components/Login'
import Root from 'components/root'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root,
      children: []
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
      // path: '/login/:email',
      path: '/login',
      name: 'Login',
      component: Login
      // props: true
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
  // mode: 'history' // for disapire the # in the browser
})
