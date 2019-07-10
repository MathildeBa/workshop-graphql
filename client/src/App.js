import React from 'react';
import OctocatList from './components/OctocatList';
import { ApolloProvider } from 'react-apollo';

// Depuis Apollo 2.x , il faut importer ces packages supplémentaires 
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql/'
})


// 1. apollo client setup
const client = new ApolloClient ({
  cache, 
  link,
})

function App() {
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Liste d'Octocats</h1>
        <OctocatList/>
      </div>
    </ApolloProvider>

  );
}



export default App;
