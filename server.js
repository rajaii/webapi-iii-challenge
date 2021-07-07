const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.status(200).send(
      '<h1>Hello world from Ali</h1>'
  )
})

//custom middleware

function logger(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.method} to ${req.url} ${req.get('Origin')}`)
  next();
 }

module.exports = server;
