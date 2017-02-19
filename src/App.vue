<template>
  <div id="app">
    <!--<md-toolbar>
    <h1 class="md-title">Welcome to my website!</h1>
  </md-toolbar>-->
    <img src="./assets/smartHome.jpg">
    <router-view></router-view>
     </div>
</template>

<script>
export default {
  name: 'app'
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
/*.md-title {
  position: relative;
  font-weight: normal;
  color: wheat;
  padding: 16px;
}*/
</style>
