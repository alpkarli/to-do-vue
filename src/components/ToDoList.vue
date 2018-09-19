<template>
  <ApolloQuery :query='query' :variables="{ name: 'vue' }">
    <template slot-scope='{ result: { loading, error, data } }'>
      <span v-if='loading'>Loading...</span>
      <span v-else-if='error'>An error occured</span>

      <section v-if='data'>
        <b-list-group v-if='data.allTodos.length'>
            <b-list-group-item class='d-flex justify-content-between align-items-center'
            :key='todo.id' v-for='todo in data.allTodos' >
              {{todo.title}}
            </b-list-group-item>
        </b-list-group>

        <span v-else>No todos, oh no :(</span>
      </section>
    </template>
  </ApolloQuery>
</template>

<script>
import { GET_TODOS, DELETE_TODO } from '../queries';

export default {
  name: 'ToDoList',
  data() {
    return {
      query: GET_TODOS,
    };
  },
  methods: {
    deleteName(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_TODO,
          variables: {
            id,
          },
          update: (cache, { data: { deleteTodos } }) => {
            const { allTodos } = cache.readQuery({ query: GET_TODOS });
            cache.writeQuery({
              query: GET_TODOS,
              data: {
                allTodos: allTodos.filter(n => n.id !== deleteTodos.id),
              },
            });
          },
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.withPointer{
  cursor: pointer;
}
</style>
