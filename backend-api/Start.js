


console.log(" Starting Authentication service at port 4000")

node  server.js

console.log(" Starting project Server  at port 4002")

node  ./project-api/server.js


console.log(" starting cve scan service at port 4004")

node ./cve-scan-api/server.js