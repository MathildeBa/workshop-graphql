# Strep7 - Ajout de REACT.js

ajouter et connection du front end et en ressortir les donées react/graphQL.

- installer react a la racine (hors du server)   
```   
npm install create-react-app -g
```
- creer react app a la racine (hors du server)    
```     
create -react -app client
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
- on importe ApolloProvider   
- set up apollo client 
- wrapper le contenu de ApolloProvider
