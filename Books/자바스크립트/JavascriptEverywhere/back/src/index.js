const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")

const port = process.env.PORT || 4000
//스키마 설정
const typeDefs = gql`
  type Query {
    hello: String
    hi: String
  }
`

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    hi: () => "What are you doing??",
  },
}
async function startApolloServer(typeDefs, resolvers) {
  // Same ApolloServer initialization as before
  const server = new ApolloServer({ typeDefs, resolvers })

  // Required logic for integrating with Express
  await server.start()

  const app = express()

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/api",
  })

  // Modified server startup
  await new Promise(resolve => app.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
