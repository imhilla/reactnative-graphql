const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PokeAPI = require('./datasources/poke');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokeApi: new PokeAPI()
  })
})

server.listen().then(({ url }) => {
  console.log(`Graphql server is running at ${url}`);
})