<template>
  <div>
    <p class='h1 mb-4'><span class='title'>{{msg}}</span></p>
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
      msg: 'ToDo List',
      login: typeof localStorage.token !== 'undefined',
    };
  },
};

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>

.title {
  text-shadow: 0px 0px 32px rgba(0, 0, 0, 0.5),
  0px 0px 1px rgba(0, 0, 0, 1);
}

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
