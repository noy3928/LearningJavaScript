const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")
require("dotenv").config()
const db = require("./db")
const DB_HOST = process.env.DB_HOST
const models = require("./models")

db.connect(DB_HOST)

let notes = [
  { id: "1", content: "This is a note", author: "Adam Scott" },
  { id: "2", content: "This is another note", author: "Harlow Everly" },
  { id: "3", content: "This is a note", author: "Riley Harrison" },
]
//스키마 설정
const typeDefs = gql`
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    notes: async () => {
      return await models.Note.find()
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id)
    },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: "Adam Scott",
      })
    },
  },
}
async function startApolloServer(typeDefs, resolvers) {
  const port = process.env.PORT || 4000
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
  await new Promise(resolve => app.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
