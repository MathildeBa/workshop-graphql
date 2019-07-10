# Step3 - Mise en place du graphQL schema

affin de lancer quelque chose dans le serveur, il faudra quelque chose a executer. 

- dans le 'server' :    
  ```mkdir schema ```   
- dans le 'schema' :    
  ```touch schema.js```
- dans 'schema' on y importe graphQL    
- extraire/destructurer les objects de graphQL dont on aura besoin plus tard   
- importer les dummy datas   
```
[
{id: 22,prenom: "Cedric",nom: "Van Hove",gitHub: "cevaho",linkedIn: "https://www.linkedin.com/in/c%C3%A9dric-van-hove-99250926/",promo: "johnson"},
{id: 1, prenom: "Maxime", nom: "Broodcoorens",gitHub: "Broodco", linkedIn: "https://www.linkedin.com/in/maxime-broodcoorens-783472168/", promo: "lovelace" },
{id: 2, prenom: "Emilie", nom: "Bialais",gitHub: "ebialais",linkedIn:"https://www.linkedin.com/in/emilie-bialais-b4b67658/", promo: "lovelace" },
{id: 3,prenom: "Pierre-Louis ",nom: "Picard",gitHub: "Pierre-Louis242",linkedIn:"https://www.linkedin.com/in/pierre-louis-picard-b30993a8/",promo: "lovelace"},
{id: 4,prenom: "Mathilde",nom: "Baquet",gitHub: "MathildeBa",linkedIn:"https://www.linkedin.com/in/mathilde-baquet",promo: "lovelace"},
{id: 19,prenom: "Antoine",nom: "Diambu",gitHub: "AntoineDia",linkedIn: "https://www.linkedin.com/in/antoine-diambu-402776178/",promo: "johnson" }
]
```
- construction de notre premier type   
```javascript

const graphql = require('graphql'); // 1. on va attribuer à une variable le paquet npm graphql précédemment installé

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLList } = graphql; // 2. ici on va extraire les objets dont on a besoin du package graphql 


// 3. dummy data 
const octocats = [
    {id: 22,prenom: "Cedric",nom: "Van Hove",gitHub: "cevaho",linkedIn: "https://www.linkedin.com/in/c%C3%A9dric-van-hove-99250926/",promo: "johnson"},
    {id: 1, prenom: "Maxime", nom: "Broodcoorens",gitHub: "Broodco", linkedIn: "https://www.linkedin.com/in/maxime-broodcoorens-783472168/", promo: "lovelace" },
    {id: 2, prenom: "Emilie", nom: "Bialais",gitHub: "ebialais",linkedIn:"https://www.linkedin.com/in/emilie-bialais-b4b67658/", promo: "lovelace" },
    {id: 3,prenom: "Pierre-Louis ",nom: "Picard",gitHub: "Pierre-Louis242",linkedIn:"https://www.linkedin.com/in/pierre-louis-picard-b30993a8/",promo: "lovelace"},
    {id: 4,prenom: "Mathilde",nom: "Baquet",gitHub: "MathildeBa",linkedIn:"https://www.linkedin.com/in/mathilde-baquet",promo: "lovelace"},
    {id: 19,prenom: "Antoine",nom: "Diambu",gitHub: "AntoineDia",linkedIn: "https://www.linkedin.com/in/antoine-diambu-402776178/",promo: "johnson" }
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

```

