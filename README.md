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

