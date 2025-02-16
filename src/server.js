const http = require('http');
const app = require('../app.js');
const db = require('./config/db.js');

//Initialize http server
const server = http.createServer(app)
server.listen(app.get('port'), async (err) => {
  if (err) {
    console.error(`HTTP: Could not start server: ${err}`);
    process.exit(1);
  }
  console.log(`HTTP server is up and running at http://localhost:${app.get('port')}`);
});

//Initialize database sync
db.init();