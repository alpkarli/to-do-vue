<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
$patina: #699;
$hopbush: #c69;
$iron: #dadbdf;
$dawn-pink: #f2ece4;
$wafer:#e1d7d2;
$waferFill:#cfc3bd;
$nebula:#d2e1dd;

input:-webkit-autofill {
  box-shadow: 0 0 0 1000px $waferFill inset !important;
  -webkit-box-shadow: 0 0 0 1000px $waferFill inset !important;
}

.form-control,
.form-control:active,
.form-control:focus,
.form-control:focus:active {
  background-color: $wafer;
}

body {
  background: $iron;
  color: $nebula
}

.todo {
  background-color: $dawn-pink;
}

.submit {
  background-color: $hopbush;
  border-color: $hopbush;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212e3b;
  margin-top: 60px;
}
</style>
