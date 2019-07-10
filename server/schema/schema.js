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
    {id: "1", octocatId: 3, date: 190319, subject: "Power BI", link: "https://powerbi.microsoft.com/fr-fr/"},
    {id: "2", octocatId: 2, date: 150419, subject: "Black Hole", link:  "https://drive.google.com/open?id=1ZWgEnRzZyCS5RX0AoEPfinbIbmfAQo1Y-JT1E-CyRsU"},
    {id: "3", octocatId: 2, date: 250219, subject: "La minute santé", link: "https://docs.google.com/presentation/d/1bVct12Ttw16G7B-"},
    {id: "4", octocatId: 1, date: 180419, subject: "Back-end: choix d'une technologie", link: "https://slides.com/broodco/deck-1#/"},
    {id: "5", octocatId: 2, date: 20519, subject: "Performance", link: "https://docs.google.com/presentation/d/1g3YF0yUndVZ0n2wGrFxL_85ChPPFjcn0sTLiux2T6aI/edit?usp=sharing"},
    {id: "6", octocatId: 3, date: 40219, subject: "Photo Wake-up 3D, donner vie aux images", link:  "https://github.com/Pierre-louis242/The-Watch-"},
    {id: "7", octocatId: 1, date: 210219, subject: "Raspberry Pi", link: "https://www.raspberrypi.org/"}
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