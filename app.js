const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");

const authRoutes = require("./src/routes/auth");
const graphqlSchema = require("./src/graphql/schemas");
const resolvers = require("./src/graphql/resolvers");
const auth = require("./src/middlewares/auth");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Auth routes
app.use("/", authRoutes);

// Auth middleware
app.use(auth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: true,
    pretty: true
  })
);

// error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

// Route not found
app.use((req, res) => {
  res.status(404).send("Invalid URL");
});

const port = process.env.PORT || 8888;

console.log(
  `Listening on port ${port}. Go to /login to initiate authentication flow.`
);

app.listen(port);
