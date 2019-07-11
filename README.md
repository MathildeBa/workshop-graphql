# Strep7 - Ajout de REACT.js

ajouter et connection du front end et en ressortir les donées react/graphQL.

- installer react a la racine (hors du server)   
```   
npm install create-react-app -g
```
- creer react app a la racine (hors du server)    
```     
create-react-app client
```   
- nettoyer le folder 'src' on garde: 'App.js', 'index.css' et 'index.js' (virer le service provider )
- creer dans src un folder : 'components'   
- dans le folder creation d'un component (ENFIIIIIN!!!!!) : 'OctocatList.js'
- mise en place du component 'OctocatList.js'   


### dans 'App.js'    

- importer le component     
- installation des paquets npm pour lier react a graphQL   
Apollo (https://www.npmjs.com/package/apollo-client)   
middleware entre React(client) et GraphQL(server)
```
npm install apollo-boost react-apollo graphql --save
```
- on importe ApolloProvider ET ApolloClient   
- set up ApolloClient 
- wrapper le contenu de ApolloProvider  
- Démarer react   
```npm start```

### dans 'octocatList.js'   

- import de {gql} (ATTENTION CA RESSEMBLE A DU JAVASCRIPT MAIS CA N'EN EST PAS!!!!)
![illusion](https://media.giphy.com/media/1lyMSBZZcieVKOaZuW/giphy.gif)   
- import de {graphQL}   
- creer une variable pour nous permettre de faire une query   
- ne pas oublier d'exporter le component avec la fonction grqphql et l'argument qui est le nom de la variable précedemment crééé


## retour dans 'server'
- installer 'cors' qui permet de faire le cross-origin request entre server-client   
```   
npm install cors --save
```   

## dans 'app.js'   
- importer cors

- maintenant configuration du lien entre server(GraphQL) et front(React.js) est finie
- verifier le localhost:3000. Dans la console on peut apercevoir qu'on recoit en effet les data. 

__Passer a la STEP8 pour le rendu des datas dans le component__   

## index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```   
## components/octocatList.js   
```javascript   
import React, { Component } from 'react'
import  { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

// avec les imports gql et graphql, on lie notre requete du component à notre schèma (server)
const getOctocatQuery = gql` 
    {
        octocats {
            id
            nom 
            gitHub
            linkedIn
        }
    }
`

class OctocatList extends Component {
    render() {
        console.log(this.props);
        return(
            <div>
                <ul id="octocat-list">
                    <li>Nom d'octocat</li>
                </ul>
            </div>
        );
    }
}
// faire attention d'exporter le component 
export default graphql(getOctocatQuery)(OctocatList);   
```

## App.js
```javascript
import React from 'react';
import OctocatList from './components/OctocatList';
import { ApolloProvider } from 'react-apollo';

// Depuis Apollo 2.x , il faut importer ces packages supplémentaires 
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4044/graphql/'
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
```   

##
