 <!--src/components/Signup.vue -->

  <template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Signup</h2>
      <p>Sign up to your account to get some great quotes.</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your username"
          v-model="username"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="password"
        >
      </div>
      <button class="btn btn-primary" @click="submit">Access</button>
    </div>
  </template>

  <script>
  // import Login from 'components/Login'
  export default {
    data () {
      return {
        // We need to initialize the component with any
        // properties that will be used in it

        username: '',
        password: '',
        error: ''
      }
    },
    http: {
      root: '/root',
      headers: {

      },
      emulateJSON: true,
      emulateHTTP: true
    },
    // props: [error],
    methods: {
      submit () {
        var myMessage = {
          email: this.username,
          password: this.password
        }
        console.log('POST password: ' + myMessage.password + ' username: ' + myMessage.email)
            // GET request
        this.$http.post('/signup', {password: myMessage.password, email: myMessage.email}).then(function (response) {
        // debugger;
          console.log('Success!: ', response.body)
          if (response.body === 'you are alreay in the system!' || (response.body.password === myMessage.password && response.body.email === myMessage.email)) {
            console.log('go to login!')
            // this.$router.$dispatch('event_name', data);
            // Login.error = 'you are alreay in the system!'
            this.$router.push('/login')
          }
        }, function (response) {
          console.log('Error!: ', response.data)
        })
        // We need to pass the component's this context
        // to properly make use of http in the auth service

        // auth.signup(this, credentials, 'secretquote')
      }
    }

  }
  </script>
