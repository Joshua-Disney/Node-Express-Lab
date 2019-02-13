const express = require('express');

const postsRouter = require('./posts/postsRouter.js')

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
  res.send('<h1>Code me, Disney</h1>');
});

module.exports = server;