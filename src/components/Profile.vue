<template>
  <div class="container">

	<div class="jumbotron text-center">
		<h1><span class="fa fa-lock"></span> Node Authentication</h1>

		<p>Login or Register with:</p>
		<a href="/login" class="btn btn-default"><span class="fa fa-user"></span> Local Login</a>
		<a href="/signup" class="btn btn-default"><span class="fa fa-user"></span> Local Signup</a>
	</div>

</div>
</template>

<script>

export default {
  name: 'container',
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
<style>
		body 		{ padding-top:80px; }
	</style>
