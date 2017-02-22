<template>
  <div class="hello">
    <md-toolbar>
    <h1 class="md-title">{{ msg }}</h1>
    <!--<h2>hello {{ this.$router.params.error }}</h2>-->
  </md-toolbar>
      <div v-if="seen"><p><h2>sensor name: {{ sensor }} <br/><br/>
                        area: {{ area }}</h2>
      <h3>status: {{ status }}</h3></div>
      <div v-else><h2>there is no data </h2></p>
      <p><strong>id:</strong></p></div><input v-model="id"><br/><br/>
       <button v-on:click="sub">get data</button><br/><br/>

       <p><h2>{{ message }}</h2></p>
       <ul>
        <li><strong>id:</strong></p><input v-model="getid"></li>
        <li><strong>name:</strong></p><input v-model="getname"></li>
        <li><strong>area:</strong></p><input v-model="getarea"></li>
      </ul>
        <button v-on:click="submit">submit</button>
        <app-Login></app-Login>
  </div>
</template>

<script>
import Login from './Login'

export default {
  props: ['error'],
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to my website!',
      seen: false,
      sensor: '',
      area: '',
      status: '',
      id: '',
      message: 'plaese enter id and name:',
      getid: '',
      getname: '',
      getarea: ''
    }
  },
  component: {
    'app-Login': Login
  },
  http: {
    root: '/root',
    headers: {

    },
    emulateJSON: true,
    emulateHTTP: true
  },
  methods: {
    sub () {
      // let user = Login.data()
      var myId = this.id
      var myMessage = `/api/actionName/${myId}`
      var that = this
      console.log('Login.email:' + Object.keys(Login.data()))
      this.$http.get(myMessage).then(function (response) {
        console.log(response.body)
        //  debugger;
        if (response.body === 'there is no data') {
          that.seen = false
        } else {
          that.seen = true
          that.sensor = response.body.name
          that.area = response.body.area
          if (response.body.status === true) {
            that.status = 'on'
          } else {
            that.status = 'off'
          }
        }
      }, function (response) {
        // this.message = 'there is no data'
        console.log('Error!:', response.data)
        // this.loading = false;
      })
    },
    submit () {
      var myMessage = {
        id: this.getid,
        name: this.getname,
        area: this.getarea
      }
      console.log('data: ' + myMessage)
      console.log('POST id: ' + myMessage.id + ' name: ' + myMessage.name + ' area: ' + myMessage.area)
            // GET request
      this.$http.post('/', {message: myMessage}).then(function (response) {
        // debugger;
        console.log('Success!: ', response.body)
      }, function (response) {
        console.log('Error!: ', response.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color: gray;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.md-title {
  position: relative;
  font-weight: normal;
  color: wheat;
  padding: 16px;
}
</style>
