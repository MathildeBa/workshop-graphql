# Step4 - mise en place du RootQuery et de la resolve fonction 

Le RootQuery représente toutes les entrées possibles dans le GraphQL API et la fonction resolve pour teste la Query    
![Gandalf](https://media.giphy.com/media/Ur0rNmZjAd7lm/giphy.gif)


- creation du nouvel objet GraphQL appelé RootQuery.    
- exporter le schema    
- dans app.js on importe le schema(+ dans app.use) et y autoriser graphQL   
- installer la librairie 'lodash' : ``` npm install lodash ``` qui permet de modifier la DB dans l'array     
    https://www.npmjs.com/package/lodash    
- importer lodash dans le fichier 'schema.js' 
- dans la RootQuery on creer la fonction resolve   
- on return avec la methode 'lodash' la recherche de l'octocat lier a un certain ID



Essayer dans Localhost/4000/graphql : 
```   
{
  octocat(id: 2) {
    nom
    prenom
  }
}   
```



## app.js   
```javascript   
const express = require('express'); // 1.
const graphqlHTTP = require('express-graphql'); // 4. création du serveur express qui va executer graphql api

const app = express(); // 2.

app.use('/graphql', graphqlHTTP({ // 5. fonction servant de noeud central/middleware qui va envoyer toutes les requetes graphql en un seul endroit
    // placer schema ici ulterieurement
}));

app.listen(4004, () => { // 3. une fois installé nodemon, va "ecouter les changements" in browser: http://localhost:4000/graphql 
    console.log('now listening for request on port 4004');
})


```   

## schema.js   
```javascript   

const graphql = require('graphql'); // 1. on va attribuer à une variable le paquet npm graphql précédemment installé
const _ = require('lodash'); // 7. apres avoir installé lodash 


const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLInt, // cf. date 
        GraphQLID,
        GraphQLList } = graphql; // 2. ici on va extraire les objets dont on a besoin du package graphql 

// 3. dummy data 
const octocats = [
    {id: "22", prenom: "Cedric",nom: "Van Hove",gitHub: "cevaho",linkedIn: "https://www.linkedin.com/in/c%C3%A9dric-van-hove-99250926/",promo: "johnson"},
    {id: "1", prenom: "Maxime", nom: "Broodcoorens",gitHub: "Broodco", linkedIn: "https://www.linkedin.com/in/maxime-broodcoorens-783472168/", promo: "lovelace" },
    {id: "2", prenom: "Emilie", nom: "Bialais",gitHub: "ebialais",linkedIn:"https://www.linkedin.com/in/emilie-bialais-b4b67658/", promo: "lovelace" },
    {id: "3", prenom: "Pierre-Louis", nom: "Picard",gitHub: "Pierre-Louis242",linkedIn:"https://www.linkedin.com/in/pierre-louis-picard-b30993a8/",promo: "lovelace"},
    {id: "4", prenom: "Mathilde",nom: "Baquet",gitHub: "MathildeBa",linkedIn:"https://www.linkedin.com/in/mathilde-baquet",promo: "lovelace"},
    {id: "19", prenom: "Antoine",nom: "Diambu",gitHub: "AntoineDia",linkedIn: "https://www.linkedin.com/in/antoine-diambu-402776178/",promo: "johnson" }
]


// 4. on va créer deja notre 1er type dans le schema (UserType), on donne un nom à notre objet (octocat) + fields avec le type correspondant
const UserType = new GraphQLObjectType ({ 
    name: 'octocat',
    fields: () => ({
        id: {type: GraphQLID},
        prenom: {type: GraphQLString},
        nom: {type: GraphQLString},
        gitHub: {type: GraphQLString},
        linkedIn: {type: GraphQLString},
        promo: {type: GraphQLString}
    })
}); //!\ 


const RootQuery = new GraphQLObjectType({ // 5. represents all of the possible entry points into the GraphQL API
    name: 'RootQueryType', // on specifie le type 
    fields: { 
        octocat: {
            type: UserType,
            args: {id: {type: GraphQLID}}, //!\ si notre ID est un string, il mettre un integer (GraphQLInt) et parser
            resolve(parent, args){ // 8. lorsqu'on fera une query (dans GraphiQL), c'est la fonction resolve qui se lance
                return _.find(octocats, {id: args.id});
            }
        }
    }
})


module.exports = new GraphQLSchema({ // 6. ici on va exporter notre schèma 
    query: RootQuery,    
})

```







