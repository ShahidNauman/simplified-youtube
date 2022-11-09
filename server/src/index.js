const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const schema = require("./schemata/schema");

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.listen(port, () => console.log(`Now browse to localhost:${port}/graphql`));
