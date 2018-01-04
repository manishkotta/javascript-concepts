import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import http from 'http';
import express from 'express';
import errorhandler from 'errorhandler';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Demo from './api/rxjsdemo';
import GraphQlDemo from './api/graphqldemo';


const app = express();

dotenv.load();

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
}

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(Demo);
app.use(GraphQlDemo);

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, 'err.message');
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler());
}

if (process.env.NODE_ENV === "production") {
  app.get('*', (req, res) => {
    console.log('test');
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}


var port = process.env.PORT || 3001;

http.createServer(app).listen(3001, function(err) {
  debugger;
  console.log('listening in http://localhost:' + port);
});
