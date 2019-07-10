import React, { Component } from 'react'
import  { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

// avec les imports gql et graphql, on lie notre requete du component à notre schèma (server)
const getOctocatQuery = gql` 
    {
        octocats {
            id
            name 
            gitHub
            linkedIn
        }
    }
`

class OctocatList extends Component {
    render() {
        console.log(this.props);
        return(
            <div>
                <ul id="octocat-list">
                    <li>Nom d'octocat</li>
                </ul>
            </div>
        );
    }
}

// faire attention d'exporter le component 
export default graphql(getOctocatQuery)(OctocatList);