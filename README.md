# Step2 - preparation du serveur GraphQL (II)

Mise en place du serveur GraphQL  

- installation du package express graphql-express   
(https://www.npmjs.com/package/express-graphql)   
``` npm install --save graphql express-graphql ```   
- importer express graphQL et on creer une fonction qui servira de noeud central/middleware et envera les requetes graphQL dans un seul endroit. 
- lancer l'application pour ecouter les mises a jour du serveur node   
```nodemon app```
- RDV sur localhost:4000/graphql


# GO STEP3

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
