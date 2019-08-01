const express = require('express');
const server = express();
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

function logger(req, res, next) {
 console.log(`${new Date().toISOString()}: ${req.method} to ${req.url} ${req.get('Origin')}`)
 next();
}

server.get('/', (req, res) => {
    res.status(200).send(
        '<h1>Hello world from Ali</h1>'
    )
})

server.listen(5000, () => {
    console.log('server listening on port 5000');
})


module.exports = server;
