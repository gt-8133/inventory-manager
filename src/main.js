import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import router from './router';
import Promise from 'bluebird';
import ApolloClient from 'apollo-client';
import VueApollo from 'vue-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { createMockClient } from './mock';
import * as _ from 'lodash';

const start = () => {
  Promise.try(() => {
    if (process.env.MOCKED) {
      return createMockClient();
    }
    // Paste your endpoint for the Simple API here.
    // Info: https://github.com/graphcool-examples/vue-apollo-instagram-example#2-create-graphql-api-with-graphcool
    return new ApolloClient({
      link: new HttpLink({
        uri: 'http://localhost:60000/simple/v1/cjllndxls00020107o32kr4h3'
      }),
      cache: new InMemoryCache()
    });
  }).then(apolloClient => {
    Vue.use(VueApollo);
    Vue.use(Vuetify, {
      theme: {
        primary: '#052d49',
        secondary: '#fd5c63',
        accent: '#8c9eff',
        error: '#b71c1c'
      }
    });

    const apolloProvider = new VueApollo({
      defaultClient: apolloClient
    });

    new Vue({
      el: '#app',
      router,
      apolloProvider,
      render: h => h(App)
    });
  });
};

// Start the app

start();
