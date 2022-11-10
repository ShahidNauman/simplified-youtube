const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const { graphqlUploadExpress } = require("graphql-upload");
require("dotenv").config();
const schema = require("./schema");

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "development" ? false : undefined,
  })
);
app.use("/uploads/", express.static(path.join(__dirname, "../uploads/")));
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.listen(port, () => console.log(`Now browse to localhost:${port}/graphql`));
