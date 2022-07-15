const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")
require("dotenv").config()
const db = require("./db")
const DB_HOST = process.env.DB_HOST
const models = require("./models")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const jwt = require("jsonwebtoken")

db.connect(DB_HOST)

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      //토큰에 문제가 있으면 에러 던지기
      throw new Error("Session invalid")
    }
  }
}

async function startApolloServer(typeDefs, resolvers) {
  const port = process.env.PORT || 4000
  // Same ApolloServer initialization as before
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      //헤더에서 사용자 토큰 가져오기
      const token = req.headers.authorization
      const user = getUser(token)
      console.log(user)
      return { models, user }
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
