const { createServer } = require('http');
const { createReadStream } = require('fs');
const { resolve } = require('path');
const serverless = require("serverless-http");

const server = createServer((req, res) => {
  if (req.url === '/') {
    createReadStream(resolve(__dirname, 'dist', 'index.html')).pipe(res);
  } else {
    createReadStream(resolve(__dirname, 'dist', req.url)).pipe(res);
  }
});

module.exports.handler = serverless(server);
