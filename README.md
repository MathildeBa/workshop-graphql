# workshop-loveson-graphql : Connecter une API à une app React.js, via GraphQL (schéma et environnement)

## Workshop 
Jeudi 11 juillet 2019. Présentation d'un workshop qui aura pour sujet :'affichage d'une API en React js via un schéma GraphQL'.    Animateurs : Corneliu GAINA et Mathilde BAQUET. 
   Les animateurs de ce workshop on eut énormément des challenges à relever, mais également beaucoup de plaisir à le réaliser. 
   Durée : 7 h.   
  
- Dans ce repo chaque étape est séparée sur des branches différentes.      
- Présentation et ressources dans ces (20) slides : https://docs.google.com/presentation/d/1UDlUcErCmTfyaajZXjnlxrwdAkIh--js7Cfnlim6JDQ/edit#slide=id.g5d0a49c5d2_0_12 

## Plan de la journée

### introduction   
### GraphQL en 2 mots (cf. [slides](https://docs.google.com/presentation/d/1UDlUcErCmTfyaajZXjnlxrwdAkIh--js7Cfnlim6JDQ/edit#slide=id.g5d0a49c5d2_0_12)
### Step1 - preparation du server GraphQL.
### Step2 - preparation du serveur GraphQL (II)
### Step3 - Mise en place du graphQL schema
### Step4 - mise en place du RootQuery et de la resolve fonction
### Step5 - Nouveau 'Type' et 'TypeRelation'
### Strepsils - Remplacer les dummy datas par une API.
### Strep7 - Ajout de REACT.js

# Step1-preparation du server GraphQL.

Mise en place de l'environement express sur le port 4000.

- creer un forlder : 'mkdir server'
- dans la console : ```npm init -y``` qui va initialiser un package.json  
- installer Express dans 'server' : ```npm install express``` 
  (https://www.npmjs.com/package/express) 
- dans 'server' creer un fichier : app.js
- installer nodemon : ```npm install nodemon -g``` redemarer le server a chaque chamgements
  (https://www.npmjs.com/package/nodemon) 
  
``` javascript
const express = require('express'); // 1.

const app = express(); // 2.


app.listen(4000, () => { // 3. une fois installé nodemon, va "ecouter les changements" in browser: http://localhost:4000/graphql 
    console.log('now listening for request on port 4000');
})
```

# Step2 - preparation du serveur GraphQL (II)

Mise en place du serveur GraphQL  

- installation du package express graphql-express   
(https://www.npmjs.com/package/express-graphql)   
``` npm install --save graphql express-graphql ```   
- importer express graphQL et on creer une fonction qui servira de noeud central/middleware et envera les requetes graphQL dans un seul endroit. 
- lancer l'application pour ecouter les mises a jour du serveur node   
```nodemon app```
- RDV sur localhost:4000/graphql

``` javascript 

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

# Step4 - mise en place du RootQuery et de la resolve fonction 

Le RootQuery représente toutes les entrées possibles dans le GraphQL API et la fonction resolve pour teste la Query    
![Gandalf](https://media.giphy.com/media/Ur0rNmZjAd7lm/giphy.gif)


- installer la librairie 'lodash' : ``` npm install lodash ``` qui permet de modifier la DB dans l'array     
    https://www.npmjs.com/package/lodash    
- importer lodash dans le fichier 'schema.js' 
- creation du nouvel objet GraphQL appelé RootQuery.    
- exporter le schema      
- dans la RootQuery on creer la fonction resolve   
- on return avec la methode 'lodash' la recherche de l'octocat lier a un certain ID
- dans app.js on importe le schema(+ dans app.use) et y autoriser graphQL 
- Essayer dans Localhost/4000/graphql : 
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
        id: {type: GraphQLString},
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



# Step5 - Nouveau 'Type' et 'TypeRelation'   

Connecter deux tableaux de données via la RootQuery.

![Gandalf](https://media.giphy.com/media/KiXl0vfc9XIIM/giphy.gif)   


- more dummy datas(veilles BeCode).   
- creation d'un nouveau Type : 'WatchType'   
- on represente son entrée dans notre RootQuery   
- définir la relation entre nos deux types : 'UserType' et 'WatchType'   
- dans RootQuery fields on creer les listes pour afficher les dummy data (tableau)   
- dans le 'WatchType' on va creer le chemin pour trouver l'ID des Octocats(UserType) sous forme de liste et les infos qui s'en découlent   
- dans le 'UserType' on va cheer le chemin pour trouver l'ID des watches(WatchType) sous forme de liste et les infos qui s'en découlent


## app.js   
```javascript   
const express = require('express'); // 1.
const graphqlHTTP = require('express-graphql'); // 4. création du serveur express qui va executer graphql api
const schema = require('./schema/schema') // 6. une fois notre schema defini (cf. schema.js), on l'importe 

const app = express(); // 2.

app.use('/graphql', graphqlHTTP({ // 5. fonction servant de noeud central/middleware qui va envoyer toutes les requetes graphql en un seul endroit
    // placer schema ici et autoriser graphiql à se lancer
    schema,
    graphiql: true
}));

app.listen(4000, () => { // 3. une fois installé nodemon, va "ecouter les changements" in browser: http://localhost:4000/graphql 
    console.log('now listening for request on port 4000');
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
    {id: "22", prenom: "Cedric",nom: "Van Hove", gitHub: "cevaho",linkedIn: "https://www.linkedin.com/in/c%C3%A9dric-van-hove-99250926/",promo: "johnson"},
    {id: "1", prenom: "Maxime", nom: "Broodcoorens", gitHub: "Broodco", linkedIn: "https://www.linkedin.com/in/maxime-broodcoorens-783472168/", promo: "lovelace" },
    {id: "2", prenom: "Emilie", nom: "Bialais", gitHub: "ebialais",linkedIn:"https://www.linkedin.com/in/emilie-bialais-b4b67658/", promo: "lovelace" },
    {id: "3", prenom: "Pierre-Louis", nom: "Picard", gitHub: "Pierre-Louis242",linkedIn:"https://www.linkedin.com/in/pierre-louis-picard-b30993a8/",promo: "lovelace"},
    {id: "4", prenom: "Mathilde",nom: "Baquet", gitHub: "MathildeBa",linkedIn:"https://www.linkedin.com/in/mathilde-baquet",promo: "lovelace"},
    {id: "19", prenom: "Antoine",nom: "Diambu", gitHub: "AntoineDia",linkedIn: "https://www.linkedin.com/in/antoine-diambu-402776178/",promo: "johnson" }
]

const watches = [
    {id: "1", octocatId: "3", date: 190319, subject: "Power BI", link: "https://powerbi.microsoft.com/fr-fr/"},
    {id: "2", octocatId: "2", date: 150419, subject: "Black Hole", link:  "https://drive.google.com/open?id=1ZWgEnRzZyCS5RX0AoEPfinbIbmfAQo1Y-JT1E-CyRsU"},
    {id: "3", octocatId: "2", date: 250219, subject: "La minute santé", link: "https://docs.google.com/presentation/d/1bVct12Ttw16G7B-"},
    {id: "4", octocatId: "1", date: 180419, subject: "Back-end: choix d'une technologie", link: "https://slides.com/broodco/deck-1#/"},
    {id: "5", octocatId: "2", date: 20519, subject: "Performance", link: "https://docs.google.com/presentation/d/1g3YF0yUndVZ0n2wGrFxL_85ChPPFjcn0sTLiux2T6aI/edit?usp=sharing"},
    {id: "6", octocatId: "3", date: 40219, subject: "Photo Wake-up 3D, donner vie aux images", link:  "https://github.com/Pierre-louis242/The-Watch-"},
    {id: "7", octocatId: "1", date: 210219, subject: "Raspberry Pi", link: "https://www.raspberrypi.org/"}
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
        promo: {type: GraphQLString},
        watches: {
            type: new GraphQLList(WatchType),
            resolve(parent, args){
                return _.filter(watches, { octocatId: parent.id});
            }}
    })
}); //!\ 

// 4.bis : type Watch
const WatchType = new GraphQLObjectType ({
    name: 'watch',
    fields: () => ({
        id: {type: GraphQLID},
        octocatId: { // 10. on va définir le type et matcher via le resolver avec l'octocat correspondant
            type: UserType,
            resolve(parent, args){ // on va chercher l'octocat associé
                // console.log(parent);
                return _.find(octocats, {id: parent.octocatId});
            }
        },
        date: {type: GraphQLInt},
        subject: {type: GraphQLString},
        link: {type: GraphQLString}

    })
}); 

// ROOTQUERY
const RootQuery = new GraphQLObjectType({ // 5. represents all of the possible entry points into the GraphQL API
    name: 'RootQueryType', // on specifie le type 
    fields: { 
        octocat: {
            type: UserType,
            args: {id: {type: GraphQLID}}, //!\ si notre ID est un string, il mettre un integer (GraphQLInt) et parser
            resolve(parent, args){ // 8. lorsqu'on fera une query (dans GraphiQL), c'est la fonction resolve qui se lance
                return _.find(octocats, {id: args.id});
            }
        },
        watch: {
            type: WatchType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(watches, {id: args.id});
            }
        },
        // 9. on crée les listes de nos dummy datas (tableaux)
        octocats: { 
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return octocats
            }
        },
        watches: {
            type: new GraphQLList(WatchType),
            resolve(parent, args) {
                return watches
            }
        }
    }
})

module.exports = new GraphQLSchema({ // 6. ici on va exporter notre schèma 
    query: RootQuery,    
})   
   
```


# Strepsils - Remplacer les dummy datas par une API.

- installation et import de 'axios' : 
``` 
$ npm install axios   
```   
- mettre en commentaire les dummy datas et dans 'UserType' dans le fields watches   
- faire l'appel d'API dans le 'RootQuery'    
    -> 'octocats' pour la liste entière    
    -> 'octocat' pour extraire l'item du tableau
   

### Documentation

- Google Sheet Becodiens BXL : https://docs.google.com/spreadsheets/d/1Sw4tskVtwWO-qaXtbGVY96gQm79AHq3U4VYCiUMBcx0/edit?usp=sharing
- Sheety.co pour transformer un Google Sheet en API JSON : https://sheety.co/
- Le JSON (qui peut changer) : https://api.sheety.co/97ac06ad-6ce3-4719-ad8d-8ea8711b328b   
 
 
 ## Schema.js
 ``` javascript
const graphql = require('graphql'); // 1. on va attribuer à une variable le paquet npm graphql précédemment installé
const _ = require('lodash'); // 7. apres avoir installé lodash 
const axios = require('axios'); // 11. install et import axios

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLInt, // cf. date 
        GraphQLID,
        GraphQLList } = graphql; // 2. ici on va extraire les objets dont on a besoin du package graphql 

// 3. dummy data 
/* const octocats = [
    {id: "22", prenom: "Cedric",nom: "Van Hove", gitHub: "cevaho",linkedIn: "https://www.linkedin.com/in/c%C3%A9dric-van-hove-99250926/",promo: "johnson"},
    {id: "1", prenom: "Maxime", nom: "Broodcoorens", gitHub: "Broodco", linkedIn: "https://www.linkedin.com/in/maxime-broodcoorens-783472168/", promo: "lovelace" },
    {id: "2", prenom: "Emilie", nom: "Bialais", gitHub: "ebialais",linkedIn:"https://www.linkedin.com/in/emilie-bialais-b4b67658/", promo: "lovelace" },
    {id: "3", prenom: "Pierre-Louis", nom: "Picard", gitHub: "Pierre-Louis242",linkedIn:"https://www.linkedin.com/in/pierre-louis-picard-b30993a8/",promo: "lovelace"},
    {id: "4", prenom: "Mathilde",nom: "Baquet", gitHub: "MathildeBa",linkedIn:"https://www.linkedin.com/in/mathilde-baquet",promo: "lovelace"},
    {id: "19", prenom: "Antoine",nom: "Diambu", gitHub: "AntoineDia",linkedIn: "https://www.linkedin.com/in/antoine-diambu-402776178/",promo: "johnson" }
]
 */
/* const watches = [
    {id: "1", octocatId: "3", date: 190319, subject: "Power BI", link: "https://powerbi.microsoft.com/fr-fr/"},
    {id: "2", octocatId: "2", date: 150419, subject: "Black Hole", link:  "https://drive.google.com/open?id=1ZWgEnRzZyCS5RX0AoEPfinbIbmfAQo1Y-JT1E-CyRsU"},
    {id: "3", octocatId: "2", date: 250219, subject: "La minute santé", link: "https://docs.google.com/presentation/d/1bVct12Ttw16G7B-"},
    {id: "4", octocatId: "1", date: 180419, subject: "Back-end: choix d'une technologie", link: "https://slides.com/broodco/deck-1#/"},
    {id: "5", octocatId: "2", date: 20519, subject: "Performance", link: "https://docs.google.com/presentation/d/1g3YF0yUndVZ0n2wGrFxL_85ChPPFjcn0sTLiux2T6aI/edit?usp=sharing"},
    {id: "6", octocatId: "3", date: 40219, subject: "Photo Wake-up 3D, donner vie aux images", link:  "https://github.com/Pierre-louis242/The-Watch-"},
    {id: "7", octocatId: "1", date: 210219, subject: "Raspberry Pi", link: "https://www.raspberrypi.org/"}
] */

// 4. on va créer deja notre 1er type dans le schema (UserType), on donne un nom à notre objet (octocat) + fields avec le type correspondant
const UserType = new GraphQLObjectType ({ 
    name: 'octocat',
    fields: () => ({
        id: {type: GraphQLID},
        prenom: {type: GraphQLString},
        nom: {type: GraphQLString},
        gitHub: {type: GraphQLString},
        linkedIn: {type: GraphQLString},
        promo: {type: GraphQLString},
        /* watches: {
            type: new GraphQLList(WatchType),
            resolve(parent, args){
                return _.filter(watches, { octocatId: parent.id});
            }
        } */

    })
}); //!\ 

// 4.bis : type Watch
const WatchType = new GraphQLObjectType ({
    name: 'watch',
    fields: () => ({
        id: {type: GraphQLID},
        octocatId: { // 10. on va définir le type et matcher via le resolver avec l'octocat correspondant
            type: UserType,
            resolve(parent, args){ // on va chercher l'octocat associé
                // console.log(parent);
                return _.find(octocats, {id: parent.octocatId});
            }
        },
        date: {type: GraphQLInt},
        subject: {type: GraphQLString},
        link: {type: GraphQLString},

    })
}); 



// ROOTQUERY
const RootQuery = new GraphQLObjectType({ // 5. represents all of the possible entry points into the GraphQL API
    name: 'RootQueryType', // on specifie le type 
    fields: { 
        octocat: {
            type: UserType,
            args: {id: {type: GraphQLID}}, //!\ si notre ID est un string, il mettre un integer (GraphQLInt) et parser
            resolve(parent, args){ // 8. lorsqu'on fera une query (dans GraphiQL), c'est la fonction resolve qui se lance
                // #2 - request API & return item
                return axios.get('https://api.sheety.co/97ac06ad-6ce3-4719-ad8d-8ea8711b328b')
                    .then(function (response) {
                        // handle success - on renvoie les datas
                        const resultat = response.data;
                        //let a = resultat.find((item) => item.id === id)
                        return resultat.find((item) => item.id == args.id)
                    })
                    .catch(function (error) {
                        // handle error
                        throw new Error(error.message)
                    })            
            }
        },
        watch: {
            type: WatchType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(watches, {id: args.id});
            }
        },
        // 9. on crée les listes de nos dummy datas (tableaux)
        octocats: { 
            type: new GraphQLList(UserType),
            resolve(parent, args) { // 12. on retourne la liste JSON de notre API octocats dorenavant
                // #1 - request API & return liste 
                return axios.get('https://api.sheety.co/97ac06ad-6ce3-4719-ad8d-8ea8711b328b')
                    .then(function (response) {
                        // handle success - on renvoie les datas
                        return response.data
                    })
                    .catch(function (error) {
                        // handle error
                        throw new Error(error.message)
                    })
            }
        },
        watches: {
            type: new GraphQLList(WatchType),
            resolve(parent, args) {
                return watches
            }
        }
    }
})

module.exports = new GraphQLSchema({ // 6. ici on va exporter notre schèma 
    query: RootQuery,    
})
```


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
import { Query } from 'react-apollo'

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
        return(
            <Query query={getOctocatQuery}>
                {({ data, loading, error}) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error</p>
                    return (                
                    <div>
                        <ul id="octocat-list">
                            {data.octocats && data.octocats.map(octocat => (
                                //assignation dune clef pour chaque octocat
                                <li key={`octocat${octocat.id}`}>
                                    {octocat.id} : {octocat.prenom} {octocat.nom}, GitHub: {octocat.gitHub}
                                </li>
                            ))}
                        </ul>
                    </div>
                    )
                }}
            </Query>
        );
    }
}

// faire attention d'exporter le component 
export default OctocatList;   
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




