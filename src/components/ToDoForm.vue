<template>
  <b-form v-on:submit.prevent="onSubmit">
      <label for="title">Title:</label>
      <b-form-input v-model.trim="title"
                  type="text"
                  placeholder="Enter todo">
      </b-form-input>
    <div v-if='error'>{{error}}</div>
  </b-form>
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
      this.title = '';
      this.$apollo
        .mutate({
          mutation: ADD_TODO,
          variables: {
            title,
          },
          update: (cache, { data: { createTodos } }) => {
            const { allTodos } = cache.readQuery({ query: GET_TODOS });

            cache.writeQuery({
              query: GET_TODOS,
              data: {
                allTodos: allTodos.concat(createTodos),
              },
            });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createNames: {
              id: -1,
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
