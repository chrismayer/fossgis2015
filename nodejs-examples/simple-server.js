// native dep
var http = require('http');
 
http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('Hallo FOSSGIS 2015');
  res.end();
}).listen(8888);
