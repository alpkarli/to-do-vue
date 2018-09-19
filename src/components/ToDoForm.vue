<template>
  <b-container>
    <b-row align-h='center' class='mb-4' >
      <b-col cols='6' align-self='center' >
        <b-form v-on:submit.prevent='onSubmit'>
            <b-form-input v-model.trim='title'
                        type='text'
                        placeholder='Enter todo'>
            </b-form-input>
          <div v-if='error'>{{error}}</div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { GET_TODOS, ADD_TODO } from '../queries';

export default {
  name: 'ToDoForm',
  data() {
    return {
      title: '',
      error: null,
    };
  },
  methods: {
    onSubmit() {
      const title = this.title;
      const completed = false;
      this.title = '';
      this.$apollo
        .mutate({
          mutation: ADD_TODO,
          variables: {
            title,
            completed,
          },
          update: (cache, { data: { createTodo } }) => {
            const { allTodos } = cache.readQuery({ query: GET_TODOS });

            cache.writeQuery({
              query: GET_TODOS,
              data: {
                allTodos: allTodos.concat(createTodo),
              },
            });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createTodo: {
              id: -1,
              completed,
              __typename: 'Title',
              title,
            },
          },
        })
        .catch((error) => {
          console.error(error);
          this.title = title;
          this.error = `There has been a problem adding ${title} :(`;
        });
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
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
