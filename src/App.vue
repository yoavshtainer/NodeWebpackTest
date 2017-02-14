<template>
  <div id="app">
    <img src="./assets/smartHome.jpg">
    <router-view></router-view>

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
     </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
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
    sub: function () {
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
        this.message = 'there is no data'
        console.log('Error!:', response.data)
        // this.loading = false;
      })
    },
    submit: function () {
      var myMessage = {
        id: this.getid,
        name: this.getname,
        area: this.getarea
      }
      console.log('data: ' + myMessage)

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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
  ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
