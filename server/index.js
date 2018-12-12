const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('app is up on port 4000')
});
