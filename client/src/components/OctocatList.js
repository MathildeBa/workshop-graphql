import React, { Component } from 'react'
import  { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

// avec les imports gql et graphql, on lie notre requete du component à notre schèma (server)
const getOctocatQuery = gql
    ` 
    {
        octocats {
            id
            nom 
            prenom
            gitHub
        }
    }
    `

class OctocatList extends Component {
    displayOctocats(){ // methode de rendu 
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading octocats...</div>);
        } else {
            return data.octocats.map(octocat => {
                return(
                    <h1> key={octocat.id}>{octocat.nom} {octocat.prenom}</h1>,
                    <p key={octocat.id}>{octocat.linkedIn}</p>
                );
            })
        }
    }
    render() {
        console.log(this.props);
        return(
            <div>
                <ul id="octocat-list">
                    <li>{this.displayOctocats}</li>
                </ul>
            </div>
        );
    }
}

// faire attention d'exporter le component 
export default graphql(getOctocatQuery)(OctocatList);

