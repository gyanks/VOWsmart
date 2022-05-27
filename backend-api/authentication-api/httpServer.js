const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./key/key.pem'),
  cert: fs.readFileSync('./key/cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("Authentication server connected on 9000 port\n");
}).listen(9000);