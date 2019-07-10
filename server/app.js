const express = require('express'); // 1.
const graphqlHTTP = require('express-graphql'); // 4. création du serveur express qui va executer graphql api

const app = express(); // 2.

app.use('/graphql', graphqlHTTP({ // 5. fonction servant de noeud central/middleware qui va envoyer toutes les requetes graphql en un seul endroit
    // placer schema ici ulterieurement
}));

app.listen(4004, () => { // 3. une fois installé nodemon, va "ecouter les changements" in browser: http://localhost:4000/graphql 
    console.log('now listening for request on port 4004');
})

