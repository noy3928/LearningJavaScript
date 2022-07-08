const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")
require("dotenv").config()
const db = require("./db")
const DB_HOST = process.env.DB_HOST
const models = require("./models")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

db.connect(DB_HOST)

async function startApolloServer(typeDefs, resolvers) {
  const port = process.env.PORT || 4000
  // Same ApolloServer initialization as before
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { models }
    },
  })

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
  await new Promise(resolve => app.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
