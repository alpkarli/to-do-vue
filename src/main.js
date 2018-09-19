import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Es6Promise from 'es6-promise';
import 'babel-polyfill';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Es6Promise.polyfill();

const client = new ApolloClient({
  uri: 'https://fakerql.com/graphql',
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

Vue.use(BootstrapVue);
Vue.use(VueApollo);

new Vue({
  el: '#app',
  components: { App },
  apolloProvider,
  router,
  render: h => h(App),
});
