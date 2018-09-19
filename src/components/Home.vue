<template>
  <div>
    <h1 class='todoMessage'>{{msg}}</h1>
    <div v-if='!login'>
      <LoginForm />
    </div>
    <div v-if='login'>
      <to-do-form />
      <ToDoList />
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';

export default {
  name: 'Home',
  components: {
    ToDoList,
    ToDoForm,
    LoginForm,
  },
  data() {
    return {
      msg: 'To Do Manager',
      login: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

h1, h2 {
  font-weight: normal;
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
</style>
