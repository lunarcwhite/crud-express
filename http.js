const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const reqUrl = req.url;
    const method = req.method;
    const {pathname, query} = url.parse(reqUrl, true);
    res.writeHead(200, {'content-Type': 'application/json'});
    res.end(            
        JSON.stringify({
          message: 'Hello World',
          url: pathname,
          method,
          query,  
        })
    );
});

const PORT = 3000;

server.listen(PORT);

console.log(`Server started on localhost:${PORT}`);