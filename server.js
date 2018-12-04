const http = require('http');

const server = http.createServer((req, res) => {
  res.end('this is my first response');
});

server.listen(process.env.port || 3000);

