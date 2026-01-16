import { ApolloServer } from "apollo-server-express"
import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolvers"

export const startGraphQL = async (app: any) => {
    const server = new ApolloServer({ typeDefs, resolvers })
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' })
}