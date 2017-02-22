 <!--src/components/Login.vue -->

  <template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Log In</h2>
      <p>Log in to your account to get some great quotes.</p>
      <div class="alert alert-danger" v-if="seen">
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
        email: '',
        password: '',
        error: '',
        seen: false
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
        var myMessage = this

        console.log('POST password: ' + myMessage.password + ' username: ' + myMessage.email)
            // GET request
        this.$http.post('/login', {password: myMessage.password, email: myMessage.email}).then(function (response) {
        // debugger;
          console.log('Success!: ', response.body)
          // console.log('my data: ' + myMessage.password + ' ' + myMessage.email + ' server data: ' + response.body.local.password + ' ' + response.body.local.username)
          if (response.body !== 'there is no user with this name') {
            if (response.body.local.password === myMessage.password && response.body.local.email === myMessage.username) {
              // bus.$emit('username', myMessage)
              // this.$router.params.sharedData
              // this.$dispatch(myMessage)
              this.$router.push('/hello')
            } else {
              myMessage.error = 'uncorrect password'
              myMessage.seen = true
            }
          } else {
            myMessage.error = 'there is no user with this name'
            myMessage.seen = true
          }
        }, function (response) {
          console.log('Error!: ', response.data)
          myMessage.error = response.data
          myMessage.seen = true
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
