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
