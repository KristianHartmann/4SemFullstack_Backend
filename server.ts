import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import body_parser_pkg from 'body-parser';
import express from 'express';
import { recipes } from './data';
const { json } = body_parser_pkg;
import mongoose from 'mongoose';
import cors from 'cors';
import typeDefs from './src/graphql_models/graphql_schemas';
import Query from './src/resolvers/Query';
import Mutation from './src/resolvers/Mutation';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
// console.log('DB: ... :',process.env)

const app = express();

// Connect to MongoDB database
const DB = process.env.DATABASE_DEV!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!,
);

mongoose.connect(DB, {}).then(() => {
  console.log('DB connection successful!');
});

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
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
