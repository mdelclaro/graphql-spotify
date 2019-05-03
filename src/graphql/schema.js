const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type TestData {
    text: String!,
    view: Int!
  }

  type RootQuery {
    login(): 
  }

  schema {
    query: RootQuery
  }
`);
