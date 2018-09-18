<template>
  <b-form v-on:submit.prevent="onSubmit">
      <label for="name">Name:</label>
      <b-form-input v-model.trim="person"
                  type="text"
                  placeholder="Enter todo">
      </b-form-input>
    <div v-if='error'>{{error}}</div>
  </b-form>
</template>

<script>
import { GET_NAMES, ADD_NAME } from '../queries';

export default {
  name: 'ToDoForm',
  data() {
    return {
      person: '',
      error: null,
    };
  },
  methods: {
    onSubmit() {
      const name = this.person;
      this.person = '';
      this.$apollo
        .mutate({
          mutation: ADD_NAME,
          variables: {
            name,
          },
          update: (cache, { data: { createNames } }) => {
            const { allNameses } = cache.readQuery({ query: GET_NAMES });

            cache.writeQuery({
              query: GET_NAMES,
              data: {
                allNameses: allNameses.concat(createNames),
              },
            });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createNames: {
              id: -1,
              __typename: 'Name',
              name,
            },
          },
        })
        .catch((error) => {
          console.error(error);
          this.person = name;
          this.error = `There has been a problem adding ${name} :(`;
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
