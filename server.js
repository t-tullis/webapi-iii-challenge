const express = require('express');
const helmet = require('helmet');

const server = express();

//Routers
const usersRouter = require('./routers/userRouter.js')
const postsRouter = require('./routers/postRouter.js')


// Middleware
server.use(express.json());
server.use('/api/users', usersRouter)
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send(`<h1> Web API III Challenge`)
})


module.exports = server;