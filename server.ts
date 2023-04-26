import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import body_parser_pkg from 'body-parser';
import express from 'express';
import { recipes } from './data';
const { json } = body_parser_pkg;

import cors from 'cors';
import typeDefs from './graphql_models/graphql_schemas';
import RecipeResolver from './resolvers/RecipeResolver';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const app = express();

interface MyContext {
  recipes: typeof recipes;
}

const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers: {
    RecipeResolver,
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async () => ({
      recipes,
    }),
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);
console.log(`🚀 GraphQL Server ready at http://localhost:4000/graphql`);

app.get('*', function (req, res) {
  res.send({ status: 404, message: 'Ressource not found' });
});
