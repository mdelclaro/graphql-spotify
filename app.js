const express = require("express");
const graphqlHttp = require("express-graphql");

const app = express();

const graphqlSchema = require("./src/graphql/schema");
const graphqlResolver = require("./src/graphql/resolvers");

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

app.listen(8080);
console.log("Listening...");
