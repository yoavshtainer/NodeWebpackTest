<template>
  <div class="hello">
    <md-toolbar>
    <h1 class="md-title">{{ msg }}</h1>
  </md-toolbar>
      <p><h2 v-if="seen">sensor name: {{ sensor }} <br/><br/>
                        area: {{ area }}</h2>
      <h3 v-if="seen">status: {{ status }}</h3>
      <h2 v-if="seenN">there is no data </h2>
      <strong>id:</strong></p><input v-model="id"><br/><br/>
       <button v-on:click="sub">get data</button><br/><br/>

       <p><h2>{{ message }}</h2></p>
       <ul>
        <li><strong>id:</strong></p><input v-model="getid"></li>
        <li><strong>name:</strong></p><input v-model="getname"></li>
        <li><strong>area:</strong></p><input v-model="getarea"></li>
      </ul>
        <button v-on:click="submit">submit</button>
        <!--<h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>-->
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to my website!',
      seen: false,
      seenN: true,
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
  http: {
    root: '/root',
    headers: {

    },
    emulateJSON: true,
    emulateHTTP: true
  },
  methods: {
    sub () {
      var myId = this.id
      var myMessage = `/api/actionName/${myId}`
      var that = this

      this.$http.get(myMessage).then(function (response) {
        console.log(response.body)
        //  debugger;
        if (response.body === 'there is no data') {
          that.seen = false
          that.seenN = true
        } else {
          that.seen = true
          that.seenN = false
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
