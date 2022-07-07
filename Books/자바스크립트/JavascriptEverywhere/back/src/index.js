const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")

let notes = [
  { id: "1", content: "This is a note", author: "Adam Scott" },
  { id: "2", content: "This is another note", author: "Harlow Everly" },
  { id: "3", content: "This is a note", author: "Riley Harrison" },
]

const port = process.env.PORT || 4000
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
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id)
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: "Adam Scott",
      }
      notes.push(noteValue)
      return noteValue
    },
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
