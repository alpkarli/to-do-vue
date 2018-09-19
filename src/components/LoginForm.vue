<template>
  <b-container>
    <b-row align-h='center' >
      <b-col cols='6' align-self='center' >
        <b-form @submit='onSubmit'>
          <b-form-group label='Email address:'>
            <b-form-input
            type='email'
            v-model.trim='form.email'
            required
            placeholder='Enter email' />
          </b-form-group>
          <b-form-group label='Password:'>
            <b-form-input
            type='password'
            v-model.trim='form.password'
            required
            placeholder='Enter password' />
          </b-form-group>
          <b-button  type='submit' class='submit'>Submit</b-button>
          <div v-if='error'>{{error}}</div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { LOGIN } from '../queries';

export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const email = this.form.email;
      const password = this.form.password;
      this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: {
            email,
            password,
          },
          update: (cache, { data: { login } }) => {
            if (login.token) {
              this.$parent.login = true;
              localStorage.token = login.token;
            }
          },
        })
        .catch((error) => {
          console.error(error);
          this.error = 'There has been a problem :(';
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
