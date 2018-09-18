<template>
  <ApolloQuery :query='query' :variables="{ name: 'vue' }">
    <template slot-scope='{ result: { loading, error, data } }'>
      <span v-if='loading'>Loading...</span>
      <span v-else-if='error'>An error occured</span>

      <section v-if='data'>
        <b-list-group v-if='data.allNameses.length'>
            <b-list-group-item class='d-flex justify-content-between align-items-center'
            :key='name.id' v-for='name in data.allNameses' >
              {{name.name}}
              <b-badge variant='primary' class='withPointer'
               pill v-on:click='deleteName(name.id)'>x</b-badge>
            </b-list-group-item>
        </b-list-group>

        <span v-else>No names, oh no :(</span>
      </section>
    </template>
  </ApolloQuery>
</template>

<script>
import { GET_NAMES, DELETE_NAME } from '../queries';

export default {
  name: 'ToDoList',
  data() {
    return {
      query: GET_NAMES,
    };
  },
  methods: {
    deleteName(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_NAME,
          variables: {
            id,
          },
          update: (cache, { data: { deleteNames } }) => {
            const { allNameses } = cache.readQuery({ query: GET_NAMES });
            cache.writeQuery({
              query: GET_NAMES,
              data: {
                allNameses: allNameses.filter(n => n.id !== deleteNames.id),
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
