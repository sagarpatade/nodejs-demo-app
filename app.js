const http = require('http');

const PORT = process.env.PORT || 3000;

const requestHandler = (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from Node.js CI/CD demo (Sagar)!' }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
