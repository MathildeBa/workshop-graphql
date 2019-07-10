# Step3 - Mise en place du graphQL schema

affin de lancer quelque chose dans le serveur, il faudra quelque chose a executer. 

- dans le 'server' :    
  ```mkdir schema ```   
- dans le 'schema' :    
  ```touch schema.js```
- dans 'schema' on y importe graphQL    
- extraire/destructurer les objects de graphQL dont on aura besoin plus tard   
- importer les dummy datas   
```[
{id: 0, prenom: "Corneliu", nom: "Gaina", gitHub: "corneliushka", linkedIn: "https://www.linkedin.com/in/corneliugaina/", promo: "lovelace"},
{id: 1, prenom: "Maxime", nom: "Broodcoorens",gitHub: "Broodco", linkedIn: "https://www.linkedin.com/in/maxime-broodcoorens-783472168/", promo: "lovelace" },
{ id: 2, prenom: "Emilie", nom: "Bialais",gitHub: "ebialais",linkedIn:"https://www.linkedin.com/in/emilie-bialais-b4b67658/", promo: "lovelace" },
{id: 3,prenom: "Pierre-Louis ",nom: "Picard",gitHub: "Pierre-Louis242",linkedIn:"https://www.linkedin.com/in/pierre-louis-picard-b30993a8/",promo: "lovelace"},
{id: 4,prenom: "Mathilde",nom: "Baquet",gitHub: "MathildeBa",linkedIn:"https://www.linkedin.com/in/mathilde-baquet",promo: "lovelace"
},{id: 5,prenom: "Andres",nom: "Goldestein",gitHub: "AndresGol",linkedIn:"https://www.linkedin.com/in/andr%C3%A9s-goldestein-21a8a4156/",promo: "lovelace"},]
```
- construction de notre premier type   
      

