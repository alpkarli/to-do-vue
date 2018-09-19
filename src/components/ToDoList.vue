<template>

  <ApolloQuery :query='query' :variables="{ name: 'vue' }">
    <b-container slot-scope='{ result: { loading, error, data } }'>
      <span v-if='loading'>Loading...</span>
      <span v-else-if='error'>An error occured</span>

        <b-row align-h='center' v-if='data'>
          <b-col cols='6' align-self='center' >
            <b-list-group v-if='data.allTodos.length'>
                <b-list-group-item class='justify-content-between align-items-center todo mb-2'
                :key='todo.id' v-for='todo in data.allTodos' >
                  <span v-bind:class="{ 'completed': todo.completed }">
                    {{todo.title}}
                  </span>
                </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
        <b-row align-h='center' v-else>
          <b-col cols='6' align-self='center' >
            No todos, oh no :(
          </b-col>
        </b-row>
    </b-container>
  </ApolloQuery>
</template>

<script>
import { GET_TODOS } from '../queries';

export default {
  name: 'ToDoList',
  data() {
    return {
      query: GET_TODOS,
    };
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.completed{
  text-decoration: line-through;
}

.withPointer{
  cursor: pointer;
}
</style>
