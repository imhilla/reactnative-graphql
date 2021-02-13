import React, { Component } from "react";
import { ActivityIndicator } from "react-native";

import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

import Pokemon from "./src/components/Pokemon";
import getRandomInt from "./src/helpers/getRandomInt";

export const AppContext = React.createContext({ data: { pokemon: null } });

export default class App extends Component {

  state = {
    query: null
  }

  componentDidMount() {
    const query = this.getQuery();
    console.log(query);
    this.setState({
      query
    });
  }

  getQuery = () => {
    const randomID = getRandomInt(1, 807);
    return `
      query GetPokemonById {
        pokemon(id: ${randomID}) {
          id,
          name,
          desc,
          pic,
          types {
            id,
            name
          }
        }
      }
    `
  }

  render() {
    const { query } = this.state;
    if (!query) return null;

    return (
      <ApolloProvider client={client}>
        <Query query={gql`${query}`} >
          {({ loading, error, data }) => {
            if (loading || error) return <ActivityIndicator size="large" color="#0000ff" />
            return (
              <AppContext.Provider value={{ ...data.pokemon, onPress: this.onGetNewPokemon }} style={styles.container}>
                <Pokemon />
              </AppContext.Provider>
            )
          }}
        </Query>
      </ApolloProvider>
    );
  }

  onGetNewPokemon = () => {
    const query = this.getQuery();
    this.setState({
      query
    });
  }

}
//

const styles = {
  mainDetails: {
    padding: 30,
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    marginTop: 20
  },
  types: {
    flexDirection: 'row',
    marginTop: 20
  },
  type: {
    padding: 5,
    width: 100,
    alignItems: 'center'
  },
  typeText: {
    color: '#fff',
  },
  normal: {
    backgroundColor: '#8a8a59'
  },
  fire: {
    backgroundColor: '#f08030'
  },
  water: {
    backgroundColor: '#6890f0'
  },
  electric: {
    backgroundColor: '#f8d030'
  },
  grass: {
    backgroundColor: '#78c850'
  },
  ice: {
    backgroundColor: '#98d8d8'
  },
  fighting: {
    backgroundColor: '#c03028'
  },
  poison: {
    backgroundColor: '#a040a0'
  },
  ground: {
    backgroundColor: '#e0c068'
  },
  flying: {
    backgroundColor: '#a890f0'
  },
  psychic: {
    backgroundColor: '#f85888'
  },
  bug: {
    backgroundColor: '#a8b820'
  },
  rock: {
    backgroundColor: '#b8a038'
  },
  ghost: {
    backgroundColor: '#705898'
  },
  dragon: {
    backgroundColor: '#7038f8'
  },
  dark: {
    backgroundColor: '#705848'
  },
  steel: {
    backgroundColor: '#b8b8d0'
  },
  fairy: {
    backgroundColor: '#e898e8'
  }
}

// export default Pokemon;