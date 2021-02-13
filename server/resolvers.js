module.exports = {
  Query: {
    pokemon: (_, { id }, { dataSources }) =>
      dataSources.pokeApi.getPokemonById({ id })
  }
}

