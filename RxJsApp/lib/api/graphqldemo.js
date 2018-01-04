import express from 'express';
import { graphql,buildSchema  } from 'graphql';

const app = express.Router();


var graphqldemo = function(req,res)
{ 
    var schema = buildSchema(`
    type Query {
      hello: String,
      master: String
    }
  `);
  
  var root = { hello: () => 'Hello world!', master:'Master' };
  
  graphql(schema, '{ hello,master }', root).then((response) => {
         res.send(response);
  });
} 


app.get('/api/graphsql',graphqldemo);

export default app;