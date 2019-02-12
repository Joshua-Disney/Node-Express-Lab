const express = require('express');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.send(`
  <h1>Code me, Disney</h1>
  `);
});

module.exports = server;