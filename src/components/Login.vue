 <!--src/components/Login.vue -->

  <template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Log In</h2>
      <p>Log in to your account to get some great quotes.</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your username"
          v-model="email"
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
      <button class="btn btn-primary" @click="submit()">Access</button>
    </div>
  </template>

  <script>

  export default {
    data () {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
        // credentials: {
        email: '',
        password: '',
        // },
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
    methods: {
      submit () {
        var myMessage = {
          email: this.email,
          password: this.password
        }
        console.log('POST password: ' + myMessage.password + ' username: ' + myMessage.email)
            // GET request
        this.$http.post('/login', {password: myMessage.password, email: myMessage.email}).then(function (response) {
        // debugger;
          console.log('Success!: ', response.body)
          if (response.body.password === myMessage.password && response.body.email === myMessage.email) {
            this.$router.push('/hello')
          }
        }, function (response) {
          console.log('Error!: ', response.data)
        })
        // var credentials = {
        //   username: this.credentials.username,
        //   password: this.credentials.password
        // }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        // auth.login(this, credentials, 'secretquote')
      }
    }

  }
  </script>
