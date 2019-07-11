import React, { Component } from 'react'
import  { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

// avec les imports gql et graphql, on lie notre requete du component à notre schèma (server)
const getOctocatQuery = gql`{
        octocats {
            id
            nom 
            prenom
            gitHub
        }
    }
    `

class OctocatList extends Component {
/*     displayOctocats(){ // methode de rendu 
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
    } */
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
export default OctocatList

